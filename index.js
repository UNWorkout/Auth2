import express from 'express';
import router from './routers/index.js';
import connectDB from './db/index.js';
import {} from 'dotenv/config';
import cors from 'cors';

const app = express();

// Cors Configuration
const corsOptions = { origin : ['http://127.0.0.1:5173'] }
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 4444;

app.use('/api', router);
app.use('/', express.static('public'));

try{
	await connectDB("mongodb+srv://jnedsmmn:YiWonQkZzK@cluster0.enizadg.mongodb.net/auth?retryWrites=true&w=majority");

	const server = await app.listen(port, ()=>{
		console.log(`🚀 Server Started! Listening on Port ${port}`);
    });
}catch (err){
	console.error('❌ Could not connect to database!', err);
}
