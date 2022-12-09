import mongoose from 'mongoose';

const connectDB = (handler: (arg0: any, arg1: any) => any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }

  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI as string);
  return handler(req, res);
};

export default connectDB;
