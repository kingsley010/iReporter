import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

require('dotenv').config();

// Initialize app variable with express
const app = express();

const port = process.env.PORT || 3000;

// Handling CORS errors
app.use(cors());

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Initializing Morgan
app.use(morgan('dev')); 

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home Route
app.get('/', (req, res) => {
	const mssg = "<p> Welcome to iReporter. iReporter is a platform for reporting corrupt practices and what situation requires government intervention. </p>";
	res.status(200).send(mssg);
}); 

// Route Files
import records from './src/routes/record';
app.use('/api/v1', records);
import interventions from './src/routes/interventionRoutes';
app.use('/api/v1', interventions);
import signs from './src/routes/signRoutes';
app.use('/api/v1', signs);

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

// Server
app.listen(port, () => {
	console.log(`Server started on port ${port}`)
});

export default app;
