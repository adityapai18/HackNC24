import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const API_URL = 'https://api.verbwire.com/v1/nft/mint/quickMintFromFile';
const API_KEY = 'sk_live_49695551-7ad6-48f9-a37c-8300170a649f';

interface FormValues {
    name: string;
    description: string;
    recipientAddress: string;
    allowPlatformToOperateToken: string;
    chain: string;
}

const MintNFTPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        description: '',
        recipientAddress: '',
        allowPlatformToOperateToken: '',
        chain: ''
    });
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('recipientAddress', formValues.recipientAddress);
        formData.append('allowPlatformToOperateToken', formValues.allowPlatformToOperateToken);
        formData.append('chain', formValues.chain);
        if (file) formData.append('filePath', file);

        try {
            setSnackbarOpen(true);
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-API-Key': API_KEY
                }
            });

            setResponse(response.data);
            setSuccess(true);
            setError(null);
            setSnackbarOpen(false);
        } catch (error: any) {
            setResponse(null);
            setSuccess(false);
            setError(error.response?.data?.message || 'Something went wrong');
            setSnackbarOpen(false);
        }
    };

    return (
        <div style={{ padding: 16 }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Mint NFT</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="NFT Name"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="NFT Description"
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Recipient Wallet Address"
                                    name="recipientAddress"
                                    value={formValues.recipientAddress}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Allow Platform To Operate Token"
                                    name="allowPlatformToOperateToken"
                                    value={formValues.allowPlatformToOperateToken}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Type of Blockchain"
                                    name="chain"
                                    value={formValues.chain}
                                    onChange={handleFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained" color="primary" type="submit" size="large" style={{ backgroundColor: '#1a1a1a' }}
                                >
                                    Mint NFT
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            {response && (
                <Card style={{ marginTop: 16 }}>
                    <CardContent>
                        <Typography variant="h6">Response</Typography>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </CardContent>
                </Card>
            )}
            {error && (
                <Card style={{ marginTop: 16 }}>
                    <CardContent>
                        <Typography variant="h6">Error</Typography>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </CardContent>
                </Card>
            )}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity="info">
                    Minting NFT...
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert severity="success">
                    NFT Minted Successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default MintNFTPage;
