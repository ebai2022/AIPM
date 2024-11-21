import axios from 'axios';

export const scrapeWebsite = async (url: string, customRequirements: string): Promise<string> => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/scrape', { url, customRequirements});

    return response.data.html;
  } catch (error) {
    console.error('Error scraping the website:', error);
    throw error;
  }
};