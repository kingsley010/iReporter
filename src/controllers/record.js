import incident from '../../incident.json';
import users from '../../user.json';

const createRecord = (req, res) => {
  const redflag = incident.records.redflags;
  const newId = redflag.length + 1;
  const day = new Date();
  
  const record = {
    id: newId,
    createdOn: day,
    createdBy: req.body.createdBy,
    type: req.body.type,
    location: req.body.location,
    status: req.body.status,
    Images: [],
    Videos: [],
    comment: req.body.comment
  }

  redflag.push(record);
  return res.status(201).send({
    data: [{
      id: newId,
      message: "Created red-flag record"
    }]
  });
};

const fetchAllRecords = (req, res) => {
  const redflag = incident.records.redflags;
  if (incident.records.redflags) {
    res.status(200).json({
        data : [{
          redflag
        }]
   });
  }
};

const fetchOneRecord = (req, res) => {
  const id = req.params.id * 1;
  const redflag = incident.records.redflags.find(o => o.id === id);
    if (redflag) {
      return res.status(200).json({
        records: redflag
      });
    } else {
      return res.status(404).send({
          error: 'Record not found'
     });
   }
};

const editOneLocation = (req, res) => {
  const id = req.params.id * 1;
  const redflag = incident.records.redflags.find(o => o.id === id);
    if (!redflag) {
      return res.status(404).json({
        error: 'Record not found'
      });
    }
    if (!req.body.location) {
      return res.status(404).json({
        error: 'Title is required'
      });
   }

    const day = new Date();
    const updateRcd = {
      id: redflag.id,
      title: req.body.title,
        createdOn: day,
        createdBy: req.body.createdBy,
        type: req.body.type,
        location: req.body.location,
        status: req.body.status,
        Images: [],
        Videos: [],
        comment: req.body.comment
    }
    incident.records.redflags.splice(redflag.location, 1, updateRcd);
    return res.status(200).json({
      data: [{
        id: id,
        message: 'Updated red-flag record\'s location'
      }]
    });
};

const editOneComment = (req, res) => {
  const id = req.params.id * 1;
  const redflag = incident.records.redflags.find(o => o.id === id);
    if (!redflag) {
      return res.status(404).json({
        error: 'Record not found'
      });
    }
    if (!req.body.comment) {
      return res.status(404).json({
        error: 'Title is required'
      });
   }

    const day = new Date();
    const updateRcd = {
      id: redflag.id,
      title: req.body.title,
        createdOn: day,
        createdBy: req.body.createdBy,
        type: req.body.type,
        location: req.body.location,
        status: req.body.status,
        Images: [],
        Videos: [],
        comment: req.body.comment
    }
    incident.records.redflags.splice(redflag.location, 1, updateRcd);
    return res.status(200).json({
      data: [{
        id: id,
        message: 'Updated red-flag record\'s comment'
      }]
    });
};

const removeOneRecord = (req, res) => {
  const id = req.params.id;
  const database = incident.records.redflags;
  const record = (id, database) => (
    !!(database[id - 1])
  );
  if (!record(req.params.id, database)) {
    res.status(404).json({
      error: 'Record not found'
    });
  } else {
    delete database [req.params.id - 1];
    res.status(200).json({
      id: id,
      message: 'red-flag record has been deleted' 
    });
  }
};


// Exporting controller
module.exports = {
  createRecord,
  fetchAllRecords,
  fetchOneRecord,
  editOneLocation,
  editOneComment,
  removeOneRecord
};
