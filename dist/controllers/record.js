'use strict';

var _incident = require('../../incident.json');

var _incident2 = _interopRequireDefault(_incident);

var _user = require('../../user.json');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRecord = function createRecord(req, res) {
  var rcd = {
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

var fetchAllRecords = function fetchAllRecords(req, res) {
  res.status(200).json({
    data: _incident2.default.records
  });
};

var fetchOneRecord = function fetchOneRecord(req, res) {
  var id = req.params.id;
  for (var i = 0; i < _incident2.default.records.length; i++) {
    if (id === _incident2.default.records[i].id) {
      return res.status(200).json({
        records: _incident2.default.records[i]
      });
    }
  }
};

var editOneRecord = function editOneRecord(req, res) {
  var id = req.params.id;
  var edit = {
    title: req.body.title
  };
  for (var i = 0; i < _incident2.default.records.length; i++) {
    if (id === _incident2.default.records[i].id) {
      if (edit) {
        return res.status(200).json({
          id: _incident2.default.records[i].id,
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

var editOneLocation = function editOneLocation(req, res) {
  var id = req.params.id;
  var edit = {
    location: req.body.location
  };
  for (var i = 0; i < _incident2.default.records.length; i++) {
    if (id === _incident2.default.records[i].id) {
      if (edit) {
        return res.status(200).json({
          id: _incident2.default.records[i].id,
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

var editOneComment = function editOneComment(req, res) {
  var id = req.params.id;
  var edit = {
    comment: req.body.comment
  };
  for (var i = 0; i < _incident2.default.records.length; i++) {
    if (id === _incident2.default.records[i].id) {
      if (edit) {
        return res.status(200).json({
          id: _incident2.default.records[i].id,
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

var removeOneRecord = function removeOneRecord(req, res) {
  var id = req.params.id;
  for (var i = 0; i < _incident2.default.records.length; i++) {
    if (id === _incident2.default.records[i].id) {
      return res.status(200).json({
        data: [{
          id: id,
          message: 'red-flag record has been deleted'
        }]
      });
    }
  }
};

// Exporting controller
module.exports = {
  createRecord: createRecord,
  fetchAllRecords: fetchAllRecords,
  fetchOneRecord: fetchOneRecord,
  editOneRecord: editOneRecord,
  editOneLocation: editOneLocation,
  editOneComment: editOneComment,
  removeOneRecord: removeOneRecord
};