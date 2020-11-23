const express = require('express');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const MessagesService = require('./services.js');
// const UsersService = require('../Users/services.js');
const { sendRequest } = require("../http-client");

const {
    Users
} = require('../data');
const {
    validateFields
} = require('../utils');

const router = express.Router();

const SECRET = 'uweyrvbigefwefi37461374571354jskdhfhgfvjhwgf'
const SECRET_2 = 'aoiuyetcbguayisehfiAHsdsflkajsbcfhaf238762;;Q;;owr'
const EMAIL_SECRET = 'qwertyuioasdfghjklzxcvbnm,.2345sdfghwertyuio3456789xdcfg'
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'diana.brodoceanu.97@gmail.com',
    pass: 'PreludeNo.1CMaj'
  }
})

//post new message
// router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
router.post('/', async (req, res, next) => {
    const {
        authorId,
        message,
        resolved,
        faq
    } = req.body;

    // validare de campuri
    try {
      // authentication
      console.info(`Forwarding request to auth-service ...`);
      console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
      const getAuthRequest = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
        method: "POST",
        data: {ceva: 'ceva'},
        headers: req.headers
      };
      const confirmation = await sendRequest(getAuthRequest);

      const fieldsToBeValidated = {
          authorId: {
              value: authorId,
              type:  'ascii'
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
      // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
      next(err);
  }
});

//get all messages
router.get('/', async (req, res, next) => {
    try {
        const messages = await MessagesService.getAll();
        res.json(messages);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
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
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
        next(err);
    }
});

// modify message by message_id
// router.put('/answer/:id', authorizeAndExtractToken, authorizeRoles('admin','suport'), async (req, res, next) => {
//     const {
//         id
//     } = req.params;
//     const {
//         authorId,
//         message,
//         resolved,
//         faq,
//     } = req.body;
//     try {
//       const fieldsToBeValidated = {
//           authorId: {
//               value: authorId,
//               type: 'ascii'
//           },
//           message: {
//               value: message,
//               type: 'ascii'
//           },
//           newResolved: {
//               value: resolved,
//               type: 'ascii'
//           },
//           faq: {
//                 value: faq,
//                 type: 'ascii'
//             }
//       };
//
//       validateFields(fieldsToBeValidated);
//
//       const user = await UsersService.getById(authorId)
//       console.log(`user is: ${user}`)
//       const {
//           username,
//           password: hashedPassword,
//           role,
//           email,
//           address,
//           phoneNumber,
//           firstName,
//           lastName,
//           confirmed
//       } = user
//
//       // console.log(`#################### user email is: ${user.email}`)
//       console.log(`#################### authorId is: ${authorId}`)
//       jwt.sign(
//         {
//           user: authorId
//         },
//         EMAIL_SECRET,
//         {
//           expiresIn: '1d'
//         },
//         (err, emailToken) => {
//           // const url = `http://192.168.99.100:3000/api/v1/users/confirmation/${emailToken}`
//
//           transporter.sendMail({
//             to: user.email,
//             subject: 'Smart Shampoo answered to your message',
//             html: `<p> ${resolved}</p>`
//           });
//         },
//       );
//
//       await MessagesService.updateById(id, authorId, message, resolved, faq);
//       res.status(204).end();
//   } catch (err) {
//       // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
//       next(err);
//   }
// });

//router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin','suport'), async (req, res, next) => {
router.put('/:id', async (req, res, next) => {
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
      // authentication
      console.info(`Forwarding request to auth-service ...`);
      console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
      const getAuthRequest = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
        method: "PUT",
        data: {ceva: 'ceva'},
        headers: req.headers
      };
      const confirmation = await sendRequest(getAuthRequest);

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
      res.status(204).end();
  } catch (err) {
      // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
      next(err);
  }
});

// delete message by message_id
//router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
router.delete('/:id',  async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
      // get authorisation
      console.info(`Forwarding request for auth-service ...`);
      console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
      const getAuthRequest = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
        headers: req.headers
      };

      const confirmation = await sendRequest(getAuthRequest);
      validateFields({
          id: {
              value: id,
              type: 'ascii'
          }
      });
      // se poate modifica
      await MessagesService.deleteById(id);
      res.status(204).end();
  } catch (err) {
      // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
      next(err);
  }
});

// // delete all messages from db
//router.delete('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
router.delete('/', async (req, res, next) => {
  try {
    // get authorisation
    console.info(`Forwarding request for auth-service ...`);
    console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
    const getAuthRequest = {
      url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
      headers: req.headers
    };

    const confirmation = await sendRequest(getAuthRequest);
    // do logic
    await MessagesService.deleteAll();
    return res.status(200).end();
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    next(err);
  }
});

module.exports = router;
