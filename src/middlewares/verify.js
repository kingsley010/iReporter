const jwt = require('jsonwebtoken');

class Verify {
  static generateToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });
  }

  static verifyAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (decoded.isadmin === true) {
          req.decoded = decoded;
          next();
        }

        if (err) {
          res.status(401).send(err);
        }
      });
    } else {
      const err = { status: 403, message: 'Admin verification failed' };
      res.status(403).send(err);
    }
  }

  static verifyUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-auth'];
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send(err);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(400).send({
        status: res.sendStatus,
        message: 'No token provided'
      });
    }
  }
}

export default Verify;