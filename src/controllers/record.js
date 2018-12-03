import incident from '../../incident.json';
import users from '../../user.json';

const createRecord = (req, res) => {
	const rcd = {
		title: req.body.title,
		comment: req.body.comment
	};
	if (rcd) {
		res.status(201).json({	
		data: [{
			id: 1,
			message: 'created red-flag record',
			createdOn: '26/11/18',
			createdBy: 2,
			type: 'red-flag',
			location: 'lat: -34.397, lng: 150.644',
			status: 'under investigation',
			images: [],
			videos: [],
			title: req.body.title,
			comment: req.body.comment
		}]
	});
	} else {
		res.status(404).json({
			message: 'No post submitted'
		})
	}
};

// Exporting controller
module.exports = {
	createRecord
}