import mongoose from 'mongoose';
import express from 'express';
import cron from 'node-cron';
import crawl from '../crawler/crawler.js';
import connectDB from '../database/connection.js';

const app = express();

const PORT = process.env.PORT || 7000;

// MongoDB connection
(async () => {
  try {
    await connectDB();

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

    const listener = app.listen(PORT, () => {
      console.log(`⚡️Your app is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

// Close MongoDB connection when the app is stopped
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

