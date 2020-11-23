const express = require('express');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');

const RecipesService = require('../Recipes/services.js');
const UsersService = require('./services.js');
const {
  validateFields
} = require('../utils');

const {
  authorizeAndExtractToken
} = require('../security/Jwt');

const {
  authorizeRoles
} = require('../security/Roles');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'diana.brodoceanu.97@gmail.com',
    pass: 'PreludeNo.1CMaj'
  }
})

const EMAIL_SECRET = 'qwertyuioasdfghjklzxcvbnm,.2345sdfghwertyuio3456789xdcfg'

router.post('/register', async (req, res, next) => {
  const {
    username,
    password,
    email,
    address,
    phoneNumber,
    firstName,
    lastName,
  } = req.body;

  // validare de campuri
  try {
    const minimumFields = {
      username: {
        value: username,
        type: 'ascii'
      },
      password: {
        value: password,
        type: 'ascii'
      }
    };

    const moreFields = {
      email: {
        value: email,
        type: 'ascii'
      },
      address: {
        value: address,
        type: 'ascii'
      },
      phoneNumber: {
        value: phoneNumber,
        type: 'ascii'
      },
      firstName: {
        value: firstName,
        type: 'ascii'
      },
      lastName: {
        value: lastName,
        type: 'ascii'
      }
    }

    var fieldsToBeValidated = {}
    if (username != 'admin' && username != 'suport') {
      fieldsToBeValidated = Object.assign(minimumFields, moreFields);
    }
    validateFields(fieldsToBeValidated);
    await UsersService.add(username, password, email, address, phoneNumber,
      firstName, lastName);
    const id = await UsersService.getIdByUserName(username)

    jwt.sign({
        user: id
      },
      EMAIL_SECRET, {
        expiresIn: '1d'
      },
      (err, emailToken) => {
        const url = `http://192.168.99.100:3000/api/v1/users/confirmation/${emailToken}`

        transporter.sendMail({
          to: email,
          subject: 'Confirm Email',
          html: `Please click this link to confirm your email: <a href="${url}"> ${url}</a>`
        });
      },
    );

    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  try {
    const fieldsToBeValidated = {
      username: {
        value: username,
        type: 'ascii'
      },
      password: {
        value: password,
        type: 'ascii'
      }
    };

    validateFields(fieldsToBeValidated);

    const token = await UsersService.authenticate(username, password);

    res.status(200).json(token);
  } catch (err) {
    next(err);
  }
});

router.get('/confirmation/:token', async (req, res, next) => {
  try {
    const jwtOutput = jwt.verify(req.params.token, EMAIL_SECRET)
    const {
      user: {
        id
      }
    } = jwtOutput
    const confirmed = 'true'
    await UsersService.updateByUserId(jwtOutput.user, confirmed)
    res.status(200)
  } catch (err) {
    next(err);
  }
  return res.redirect('http://localhost:3000/#/home/login')
});

// get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await UsersService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// get user by id
router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin'),
  async (req, res, next) => {
    const {
      id
    } = req.params;
    try {

      validateFields({
        id: {
          value: id,
          type: 'ascii'
        }
      });
      const user = await UsersService.getById(id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'),
  async (req, res, next) => {
    const {
      id
    } = req.params;
    const {
      username,
      password,
      email,
      address,
      phoneNumber,
      firstName,
      lastName,
    } = req.body;

    // validare de campuri
    try {
      const minimumFields = {
        username: {
          value: username,
          type: 'ascii'
        },
        password: {
          value: password,
          type: 'ascii'
        }
      };

      const moreFields = {
        email: {
          value: email,
          type: 'ascii'
        },
        address: {
          value: address,
          type: 'ascii'
        },
        phoneNumber: {
          value: phoneNumber,
          type: 'ascii'
        },
        firstName: {
          value: firstName,
          type: 'ascii'
        },
        lastName: {
          value: lastName,
          type: 'ascii'
        }
      }
      var fieldsToBeValidated = {}
      if (username != 'admin' && username != 'suport') {
        fieldsToBeValidated = Object.assign(minimumFields, moreFields);
      }
      validateFields(fieldsToBeValidated);

      await UsersService.updateById(id, username, password, email, address,
        phoneNumber, firstName, lastName);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

// delete user by id
router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'),
  async (req, res, next) => {
    const {
      id
    } = req.params;

    try {
      validateFields({
        id: {
          value: id,
          type: 'ascii'
        }
      });

      await UsersService.deleteById(id);
      await RecipesService.deleteRecipesByUserId(id)
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

// delete all users
router.delete('/', authorizeAndExtractToken, authorizeRoles('admin'),
  async (req, res, next) => {
    try {
      await UsersService.deleteAll();
      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
