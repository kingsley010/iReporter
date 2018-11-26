import incident from '../../incident.json';
import users from '../../user.json';

const createRecord = (req, res) => {
	const rcd = {
		username: req.body.username,
		title: req.body.title
	};
	if (rcd) {
		res.status(201).json({
		data: [{
			id: 1,
			createdOn: '26/11/18',
			createdBy: '2',
			type: 'red-flag',
			location: 'lat: -34.397, lng: 150.644',
			status: 'under investigation',
			images: '[image, image]',
			images: '[image, image]',
			record: rcd
		}]
	});
	} else {
		res.status(404).json({
			message: 'No post submitted'
		})
	}
};

const getAllRecords = (req, res) => {
	res.status(200).json({
		data: incident.records
	});
}

// Exporting controller
module.exports = {
	createRecord,
	getAllRecords
}