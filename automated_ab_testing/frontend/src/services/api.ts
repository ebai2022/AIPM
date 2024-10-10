import axios from 'axios';

export const scrapeWebsite = async (url: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/scrape', { url });
    return response.data.text;
  } catch (error) {
    console.error('Error scraping the website:', error);
    throw error;
  }
};
