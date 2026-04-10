import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Attach event listeners BEFORE connecting so they are in place
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    // MONGODB_URI already contains the cluster address; append the DB name here
    await mongoose.connect(`${process.env.MONGODB_URI}/kiyo`);
  } catch (err) {
    // Re-throw so server.js can catch it and exit cleanly
    throw err;
  }
};

export default connectDB;