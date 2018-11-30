'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _record = require('../controllers/record');

var _record2 = _interopRequireDefault(_record);

var _incident = require('../../incident.json');

var _incident2 = _interopRequireDefault(_incident);

var _user = require('../../user.json');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/red-flags', _record2.default.createRecord);
router.get('/red-flags', _record2.default.fetchAllRecords);
router.get('/red-flags/:id', _record2.default.fetchOneRecord);
router.patch('/red-flags/:id', _record2.default.editOneRecord);
router.patch('/red-flags/:id/location', _record2.default.editOneLocation);
router.patch('/red-flags/:id/comment', _record2.default.editOneComment);
router.delete('/red-flags/:id', _record2.default.removeOneRecord);

exports.default = router;