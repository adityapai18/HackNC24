import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';
import { useRouter } from 'src/routes/hooks';
import { useLocalStorage } from 'src/hooks/use-local-storage';

// Define types for user and token
interface User {
    id: string;
    name: string;
    email: string;
    // Add other properties relevant to your user object
}

type Token = string | null;

// Define the context type
interface AuthContextType {
    user: User | null;
    token: Token;
    login: (adminEmail: string, adminPassword: string) => Promise<void>;
    logout: () => void;
}

// Default context value
const defaultAuthContext: AuthContextType = {
    user: null,
    token: null,
    login: async () => { }, // No-op async function
    logout: () => { },      // No-op function
};

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// AuthProvider Props
interface AuthProviderProps {
    children: ReactNode;
}

// Provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();

    // Using useLocalStorage for token and user, with initial values of null
    const [user, setUser] = useLocalStorage<User | null>('user', null);
    const [token, setToken] = useLocalStorage<Token>('token', null);

    // Function to handle login, with API call
    const login = useCallback(async (adminEmail: string, adminPassword: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_EXPRESS_BASE_AUTH_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminEmail, adminPassword }),
            });

            if (response.ok) {
                const data = await response.json();
                const { user, token } = data;
                setUser(user);
                setToken(token);
                router.push('/');  // Redirect after successful login
            } else {
                console.error('Login failed: Invalid credentials');
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Unable to login:', error);
            throw error;
        }
    }, [router, setUser, setToken]);

    // Function to handle logout, clears user and token from local storage
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        router.push('/signin');
    }, [router, setUser, setToken]);

    // Memoize the context value to prevent re-creation on every render
    const contextValue = useMemo<AuthContextType>(() => ({
        user,
        token,
        login,
        logout,
    }), [user, token, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
