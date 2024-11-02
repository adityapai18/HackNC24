import openai
import gradio as gr
import time
import os
import requests  # Import requests to make API calls
load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Load user data from Flask REST API
def fetch_user_data():
    response = requests.get("http://your-flask-api-url/user_data")  # Replace with your actual API endpoint
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()

# Fetch user data from the API
user_data = fetch_user_data()

# Create a string representation of the user, goals, and transaction data for chatbot context
def create_transaction_string():
    user = user_data  # Since there is only one user
    transaction_string = f"User: {user['name']} (User ID: {user['user_id']})\n"
    transaction_string += f"Monthly Goal: ${user['goals']['monthly_goal']}\n"
    transaction_string += f"Long-Term Goal: ${user['goals']['long_term_goal']['goal_value']} (Target Date: {user['goals']['long_term_goal']['target_date']})\n"
    transaction_string += "Transactions:\n"
    
    for month, transactions in user['transactions'].items():
        transaction_string += f"  {month}:\n"
        for transaction in transactions:
            transaction_string += (
                f"    Transaction ID: {transaction['transaction_id']}, "
                f"Amount: ${transaction['amount']:.2f}, Date: {transaction['date']}, "
                f"Purpose: {transaction['purpose']}, Type: {transaction['type']}\n"
            )
    return transaction_string

# Initialize messages for the chatbot with transaction context
messages = [
    {"role": "system", "content": "You are a helpful and kind AI Assistant."},
    {"role": "system", "content": create_transaction_string()},
]

def chatbot(input):
    if input:
        messages.append({"role": "user", "content": input})
        while True:
            try:
                chat = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo", messages=messages
                )
                reply = chat.choices[0].message.content
                messages.append({"role": "assistant", "content": reply})
                return reply
            except openai.error.RateLimitError:
                print("Rate limit exceeded. Retrying in 5 seconds...")
                time.sleep(5)  # Wait before retrying

# Update the inputs and outputs according to the new Gradio API
inputs = gr.Textbox(lines=7, label="Chat with AI")
outputs = gr.Textbox(label="Reply")

gr.Interface(fn=chatbot, inputs=inputs, outputs=outputs, title="AI Chatbot",
             description="Ask anything you want. The chatbot has context about user transactions and can provide financial help.").launch(share=True)
