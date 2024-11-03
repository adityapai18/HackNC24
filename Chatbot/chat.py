import openai
from flask import Flask, request, jsonify
import time
import os
# from dotenv import load_dotenv

# Load environment variables
# load_dotenv()
openai.api_key = "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"

# Initialize Flask app
app = Flask(__name__)

# Helper function to create a transaction string for context
def create_transaction_string(user_data):
    transaction_string = f"User: {user_data['name']} (User ID: {user_data['user_id']})\n"
    transaction_string += f"Monthly Goal: ${user_data['goals']['monthly_goal']}\n"
    transaction_string += f"Long-Term Goal: ${user_data['goals']['long_term_goal']['goal_value']} (Target Date: {user_data['goals']['long_term_goal']['target_date']})\n"
    transaction_string += "Transactions:\n"
    
    for month, transactions in user_data['transactions'].items():
        transaction_string += f"  {month}:\n"
        for transaction in transactions:
            transaction_string += (
                f"    Transaction ID: {transaction['transaction_id']}, "
                f"Amount: ${transaction['amount']:.2f}, Date: {transaction['date']}, "
                f"Purpose: {transaction['purpose']}, Type: {transaction['type']}\n"
            )
    return transaction_string

# Chatbot endpoint
@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json  # Get user data from request payload
    user_data = data.get("user_data")
    user_input = data.get("input")
    
    print(user_data,user_input)
    # Validate the input
    if not user_data or not user_input:
        return jsonify({"error": "User data and input are required."}), 400

    print(create_transaction_string(user_data))
    # Create initial messages with the user context
    messages = [
        {"role": "system", "content": "You are a helpful and kind AI Assistant."},
        {"role": "system", "content": create_transaction_string(user_data)},
        {"role": "system", "content": "Reply in such a way that you are talking to the end user, keep it short, precise and sweet."},
        {"role": "user", "content": user_input}
    ]
    
    # Attempt the OpenAI API call
    while True:
        try:
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            reply = chat.choices[0].message.content
            messages.append({"role": "assistant", "content": reply})
            return jsonify({"reply": reply})
        except openai.error.RateLimitError:
            print("Rate limit exceeded. Retrying in 5 seconds...")
            time.sleep(5)  # Wait before retrying

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
