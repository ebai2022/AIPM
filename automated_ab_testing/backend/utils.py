import json
import re
import os

from litellm import completion

with open('/home/agatha/Desktop/MA3/sem proj/api_key_nlp_lab.txt', 'r') as file:
    OPENAI_API_KEY = file.read().strip()
os.environ['OPENAI_API_KEY'] = OPENAI_API_KEY

def generate_prompt(html_content, instruction_path = "instructions.txt"):
    with open(instruction_path, 'r', encoding='utf-8') as file:
        instructions = file.read()
    prompt = f""
    
    prompt = f"{instructions}\n\nWebsite source code:\n{html_content}\n\nImproved source code:\n"
    return prompt

def get_improved_html(html_content, instruction_path = "instructions.txt", model="o1-mini", **kwargs):
    prompt = generate_prompt(html_content, instruction_path)
    messages = [{"role": "user", "content": prompt}]
    
    response = completion(
        messages=messages,
        model=model,
        **kwargs
    )

    new_html_content = response.choices[0].message.content
    
    return new_html_content