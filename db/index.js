import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

async function connectDB(uri){
    return mongoose.connect(uri);
}

export default connectDB;