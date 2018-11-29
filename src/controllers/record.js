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
        message: 'created red-flag record',
        createdOn: '26/11/18',
        createdBy: '2',
        type: 'red-flag',
        location: 'lat: -34.397, lng: 150.644',
        status: 'under investigation',
        images: '[image, image]',
        videos: '[image, image]',
        record: rcd
      }]
    });
  } else {
    res.status(404).json({
      message: 'No post submitted'
    });
  }
};

const fetchAllRecords = (req, res) => {
  res.status(200).json({
    data: incident.records
  });
};

const fetchOneRecord = (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < incident.records.length; i++) {
    if (id === incident.records[i].id) {
      return res.status(200).json({
        records: incident.records[i]
      });
    }
  }
};

const editOneRecord = (req, res) => {
  const id = req.params.id;
  let edit = {
  	title: req.body.title
  };
  for (let i = 0; i < incident.records.length; i++) {
    if (id === incident.records[i].id) {
    	if (edit) {
          return res.status(200).json({
          id: incident.records[i].id,
          message: 'updated red-flag record',
          title: edit,
          createdOn: '26/11/18',
          createdBy: '2',
          type: 'red-flag',
          location: 'lat: -34.397, lng: 150.644',
          status: 'under investigation',
          images: '[image, image]',
          videos: '[image, image]'
      });
     }
    }
  }
};

const editOneLocation = (req, res) => {
  const id = req.params.id;
  let edit = {
  	location: req.body.location
  };
  for (let i = 0; i < incident.records.length; i++) {
    if (id === incident.records[i].id) {
    	if (edit) {
          return res.status(200).json({
          id: incident.records[i].id,
          message: 'updated red-flag\'s record location',
          createdOn: '26/11/18',
          createdBy: '2',
          type: 'red-flag',
          location: edit,
          status: 'under investigation',
          images: '[image, image]',
          videos: '[image, image]'
      });
     }
    }
  }
};

const editOneComment = (req, res) => {
  const id = req.params.id;
  let edit = {
  	comment: req.body.comment
  };
  for (let i = 0; i < incident.records.length; i++) {
    if (id === incident.records[i].id) {
    	if (edit) {
          return res.status(200).json({
          id: incident.records[i].id,
          message: 'updated red-flag\'s record comment',
          createdOn: '26/11/18',
          createdBy: '2',
          type: 'red-flag',
          location: 'lat: -34.397, lng: 150.644',
          status: 'under investigation',
          images: '[image, image]',
          videos: '[image, image]',
          comment: edit
      });
     }
    }
  }
};

// Exporting controller
module.exports = {
  createRecord,
  fetchAllRecords,
  fetchOneRecord,
  editOneRecord,
  editOneLocation,
  editOneComment
};
