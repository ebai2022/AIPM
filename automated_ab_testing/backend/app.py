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
    custom_requirements = data.get(
        "customRequirements",
        "Appeal to possible customers that are knowledgable about this field.",
    )
    try:
        html = generate_new_html(url, html_elements, custom_requirements)
        return jsonify({"html": html}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def generate_new_html(url, html_elements, context) -> str:
    html = urlopen(url).read()
    soup = BeautifulSoup(html, features="html.parser")

    for s in soup.find_all(html_elements):
        if s.string and s.string.strip() and len(s.string) > 15:
            new_string = get_new_string(s.string, context, url)
            s.string.replace_with(new_string)
    return str(soup)


def get_new_string(
    original_text, context, url, model="gpt-4", temperature=0.6, **kwargs
):
    prompt = generate_prompt(original_text, context, url)
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
    )  # Remove asterisks, bullet points, quotations, or HTML-like tags
    new_string = new_string.strip()
    if new_string[0] == '"' and new_string[-1] == '"':
        new_string = new_string[1:-1]
    return new_string


def generate_prompt(original_text, context, url):
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
    You are a highly skilled and professional text generator for websites.

    Your task is to rewrite the following text when needed to make it more engaging and tailored to the following user context: {context}.
    Original text: "{original_text}"
    Please reference the website url for additional context: "{url}"

    Instructions and requirements:
    You should try to optimize the website for SEO as defined in 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide#:~:text=SEO%E2%80%94short%20for%20search%20engine,site%20through%20a%20search%20engine.'
    You must not misrepresent any information and must keep essential information in tact.
    If the information is not changeable, like an address or a date, don't change anything and return the original text.
    If you do not have enough information to make any changes for any part, return exactly the same output as the original text.
    Please return the output as clean text and keep the output approximately the same length as the original text.
    Do not include additional quotation marks that are unnecessary for the text and remove quotations that are unnecessary.
    Always directly respond with the text you suggest. Never return any text such as "reimagined input".
    Please sound as natural and as human as possible. Keep headers short and concise. Take a deep breath and think carefully.
    """
    # Reßwrite the text in a way that is personalized and keeps its original intent.
    return prompt


if __name__ == "__main__":
    app.run(debug=True)
