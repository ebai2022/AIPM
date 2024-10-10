from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/scrape', methods=['POST'])
def scrape_website():
    data = request.get_json()
    url = data.get('url')
    # Scrape the website using requests and BeautifulSoup
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    text = soup.get_text()

    return jsonify({"text": text})

if __name__ == '__main__':
    app.run(debug=True)
