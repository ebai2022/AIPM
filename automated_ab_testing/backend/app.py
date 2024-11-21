from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import os
import re
from openai import OpenAI


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

with open("./api_key_aipm.txt", "r") as file:
    OPENAI_API_KEY = file.read().strip()
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
html_elements = ["h1", "h2", "p", "h4", "h3"]


@app.route("/api/scrape", methods=["POST"])
def scrape_website():
    data = request.get_json()
    url = data.get("url")
    # add custom requirements
    custom_requirements = data.get("customRequirements", "Appeal to a younger audience")
    try:
        html = generate_new_html(url, html_elements, custom_requirements)
        return jsonify({"html": html}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def generate_new_html(url, html_elements, context) -> str:
    html = urlopen(url).read()
    soup = BeautifulSoup(html, features="html.parser")

    for s in soup.find_all(html_elements):
        if s.string and s.string.strip():
            new_string = get_new_string(s.string, context)
            s.string.replace_with(new_string)

    return str(soup)


def get_new_string(original_text, context, model="gpt-4", temperature=1.2, **kwargs):
    prompt = generate_prompt(original_text, context)
    messages = [{"role": "user", "content": prompt}]

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        **kwargs,
    )

    new_string = response.choices[0].message.content
    new_string = re.sub(
        r"[*•<>]", "", new_string
    )  # Remove asterisks, bullet points, or HTML-like tags
    new_string = new_string.strip()

    return new_string


def generate_prompt(original_text, context):
    """
    Generate personalized text using an LLM model.

    Args:
        original_text (str): The original text from the HTML element.
        context (dict): A dictionary containing user-specific information or preferences.

    Returns:
        str: The generated text.
    """
    # Example prompt for the model
    prompt = f"""
    You are a highly creative and professional text generator for websites. 
    Your task is to rewrite the following text to make it more engaging and tailored 
    to the following user context: {context}.
    
    Original text: "{original_text}"
    
    If the information is not changeable, like an adress or a date, don't change anything and return the original text.

    Please return the output as clean text and keep the output approximately the same length as the original text.
    """
    # Reßwrite the text in a way that is personalized and keeps its original intent.

    return prompt


if __name__ == "__main__":
    app.run(debug=True)
