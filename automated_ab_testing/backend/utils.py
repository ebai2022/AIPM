import json
import re
import os
import requests

from bs4 import BeautifulSoup
from litellm import completion

with open('/home/agatha/Desktop/MA3/sem proj/api_key_nlp_lab.txt', 'r') as file:
    OPENAI_API_KEY = file.read().strip()
os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

def generate_prompt_html(html_content, instruction_path = "instructions.txt", user_input = ""):
    with open(instruction_path, 'r', encoding='utf-8') as file:
        instructions = file.read()

    extra_context = "General improvement of the website content" if not user_input else user_input

    prompt = f"Please provide the source code of a website in HTML format. Given a source code in html, analyze the text components and propose an improved version. The output will be only the modified HTML code with altered text.\n\n"
    
    prompt += f"Mission/Context: {extra_context}\n\n{instructions}\n\nWebsite source code:\n{html_content}\n\nImproved source code:\n"
    return prompt

def get_improved_html(html_content, instruction_path = "instructions_html.txt", model="o1-mini", user_input = "", **kwargs):
    prompt = generate_prompt_html(html_content, instruction_path, user_input= user_input)
    messages = [{"role": "user", "content": prompt}]
    
    response = completion(
        messages=messages,
        model=model,
        **kwargs
    )

    new_html_content = response.choices[0].message.content
    
    return new_html_content

def fetch_and_parse_url(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    return soup

def extract_text_elements(soup):
    # Only relevant text elements for modification
    text_elements = {}
    for tag in soup.find_all(['h1', 'h2', 'h3', 'button', 'a', 'p']):
        if tag.string:
            text_elements[tag] = tag.string.strip()
    return text_elements

def generate_prompt_bs(text_elements, instruction_path="instructions_bs.txt", user_input=""):
    with open(instruction_path, 'r', encoding='utf-8') as file:
        instructions = file.read()

    extra_context = "General improvement of the website content" if not user_input else user_input

    # Create prompt with only the extracted text elements
    prompt = f"Below are selected text components from a website's HTML structure. Analyze each text component and propose improved versions based on best practices for clarity, engagement, and conciseness. Do not alter the HTML structure or tags, only improve the textual content.\n\n"
    prompt += f"Mission/Context: {extra_context}\n\n{instructions}\n\n"
    
    # Add extracted text elements in a structured format
    prompt += "Text components to improve:\n"
    for tag, text in text_elements.items():
        prompt += f"<{tag.name}> {text}\n"

    prompt += "\nImproved text components:\n"
    for tag in text_elements.keys():
        prompt += f"<{tag.name}> "  # Placeholder for model output

    return prompt
