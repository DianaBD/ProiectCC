const express = require('express');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const MessagesService = require('./services.js');
const UsersService = require('../Users/services.js');
const {
  Users
} = require('../data');
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

const EMAIL_SECRET = 'qwertyuioasdfghjklzxcvbnm,.2345sdfghwertyuio3456789xdcfg'
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'diana.brodoceanu.97@gmail.com',
    pass: 'PreludeNo.1CMaj'
  }
})

//post new message
router.post('/', authorizeAndExtractToken, authorizeRoles('admin', 'suport','user'),
  async (req, res, next) => {
    const {
      authorId,
      message,
      resolved,
      faq
    } = req.body;

    // validare de campuri
    try {

      const fieldsToBeValidated = {
        authorId: {
          value: authorId,
          type: 'ascii'
        },
        message: {
          value: message,
          type: 'ascii'
        },
        resolved: {
          value: resolved,
          type: 'ascii'
        },
        faq: {
          value: faq,
          type: 'ascii'
        },
      };

      validateFields(fieldsToBeValidated);

      await MessagesService.add(authorId, message, resolved, faq);

      res.status(201).end();
    } catch (err) {
      next(err);
    }
  });

//get all messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await MessagesService.getAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

//get message by id
router.get('/:id', async (req, res, next) => {
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
    const message = await MessagesService.getById(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

// modify message by message_id
router.put('/answer/:id', authorizeAndExtractToken,
  authorizeRoles('admin', 'suport'), async (req, res, next) => {
    const {
      id
    } = req.params;
    const {
      authorId,
      message,
      resolved,
      faq,
    } = req.body;
    try {
      const fieldsToBeValidated = {
        authorId: {
          value: authorId,
          type: 'ascii'
        },
        message: {
          value: message,
          type: 'ascii'
        },
        newResolved: {
          value: resolved,
          type: 'ascii'
        },
        faq: {
          value: faq,
          type: 'ascii'
        }
      };

      validateFields(fieldsToBeValidated);

      const user = await UsersService.getById(authorId)
      const {
        username,
        password: hashedPassword,
        role,
        email,
        address,
        phoneNumber,
        firstName,
        lastName,
        confirmed
      } = user

      jwt.sign({
          user: authorId
        },
        EMAIL_SECRET, {
          expiresIn: '1d'
        },
        (err, emailToken) => {

          transporter.sendMail({
            to: user.email,
            subject: 'Smart Shampoo answered to your message',
            html: `<p> ${resolved}</p>`
          });
        },
      );

      await MessagesService.updateById(id, authorId, message, resolved, faq);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

// modify
router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'suport'),
  async (req, res, next) => {
    const {
      id
    } = req.params;
    const {
      authorId,
      message,
      resolved,
      faq,
    } = req.body;
    try {
      const fieldsToBeValidated = {
        authorId: {
          value: authorId,
          type: 'ascii'
        },
        message: {
          value: message,
          type: 'ascii'
        },
        newResolved: {
          value: resolved,
          type: 'ascii'
        },
        faq: {
          value: faq,
          type: 'ascii'
        }
      };
      validateFields(fieldsToBeValidated);
      await MessagesService.updateById(id, authorId, message, resolved, faq);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

// delete message by message_id
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

      await MessagesService.deleteById(id);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

// delete all recipes from db
router.delete('/', authorizeAndExtractToken, authorizeRoles('admin'),
  async (req, res, next) => {
    try {
      await MessagesService.deleteAll();
      return res.status(200).end();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
