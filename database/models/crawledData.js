import mongoose from 'mongoose';

const crawledDataSchema = new mongoose.Schema({
  url: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('CrawledData', crawledDataSchema);
