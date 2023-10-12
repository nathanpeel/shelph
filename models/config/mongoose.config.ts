import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, { dbName: 'shelph' })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log(err));