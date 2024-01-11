import axios from 'axios';
import cheerio from'cheerio';
import CrawledData from '../database/models/crawledData.js';

const crawl = async (url, keyword) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const content = $('body').text();

    if (content.includes(keyword)) {
      const crawledData = new CrawledData({
        url,
        content,
      });
      await crawledData.save();
    }
  } catch (error) {
    console.error('Error crawling:', error);
  }
};

export default crawl;
