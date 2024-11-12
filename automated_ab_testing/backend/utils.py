import json
import re
import os

from litellm import completion

with open('/home/agatha/Desktop/MA3/sem proj/api_key_nlp_lab.txt', 'r') as file:
    OPENAI_API_KEY = file.read().strip()
os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

def generate_prompt(html_content, instruction_path = "instructions.txt", user_input = ""):
    with open(instruction_path, 'r', encoding='utf-8') as file:
        instructions = file.read()

    extra_context = "General improvement of the website content" if not user_input else user_input

    prompt = f"Please provide the source code of a website in HTML format. Given a source code in html, analyze the text components and propose an improved version. The output will be only the modified HTML code with altered text.\n\n"
    
    prompt += f"Mission/Context: {extra_context}\n\n{instructions}\n\nWebsite source code:\n{html_content}\n\nImproved source code:\n"
    return prompt

def get_improved_html(html_content, instruction_path = "instructions.txt", model="o1-mini", user_input = "", **kwargs):
    prompt = generate_prompt(html_content, instruction_path, user_input= user_input)
    messages = [{"role": "user", "content": prompt}]
    
    response = completion(
        messages=messages,
        model=model,
        **kwargs
    )

    new_html_content = response.choices[0].message.content
    
    return new_html_content