const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const path = require('path');

const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serving frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		)
	);
} else {
	app.get('/', (req, res) => res.send('Please set server to production'));
}

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`The server just started on port:${PORT}`);
});
