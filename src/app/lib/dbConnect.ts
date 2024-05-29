/**
 * Handles the connection process for MongoDB
 */

import mongoose from "mongoose";

declare global {
  var mongoose: any
};

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects the database when invoked. 
 * 
 * @async 
 * @function dbConnect
 * @returns Mongoose connection object
 */
export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'shelph',
      bufferCommands: false
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    })
     .then(() => console.log('Connected to MongoDB...'))
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}