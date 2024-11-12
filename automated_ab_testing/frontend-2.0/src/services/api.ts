import axios from 'axios';

export const scrapeWebsite = async (url: string, customRequirements: string): Promise<string> => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/scrape', { url, customRequirements});

    // Assuming the API now returns suggestions directly
    // If it doesn't, you may need to process response.data here
    // return response.data.suggestions;
    return response.data.text;
  } catch (error) {
    console.error('Error scraping the website:', error);
    throw error;
  }
};