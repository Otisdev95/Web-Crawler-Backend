import express from 'express';
import cron from 'node-cron';
import crawl from '../crawler/crawler.js';
import connectDB from '../database/connection.js';

const app = express();

connectDB();

// Schedule crawling every hour
cron.schedule('0 * * * *', async () => {
  // Specify your list of sites and keywords
  const sites = [
    { url: 'https://example.com', keyword: 'example' },
    // Add more sites as needed
  ];

  for (const site of sites) {
    await crawl(site.url, site.keyword);
  }

  console.log('Crawling completed at:', new Date());
});

const port = process.env.PORT || 7000;

const listener = app.listen(port, () => {
  console.log(`⚡️Your app is listening on port ${port}`);
});
