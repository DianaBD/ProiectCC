const express = require('express');

const { sendRequest } = require("../http-client");

const RecipesService = require('./services.js');
const {
  validateFields
} = require('../utils');
// const {
//   authorizeAndExtractToken
// } = require('../security/Jwt');
const {
  ServerError
} = require('../errors');
// const {
//   authorizeRoles
// } = require('../security/Roles');

const router = express.Router();

//router.post('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
router.post('/', async (req, res, next) => {

  //validare de campuri
  const {
    name,
    clientId,
    goals,
    hairType,
    hairStructure,
    scalpMoisture,
    siliconFree,
    fragrance,
    shampooColor,
    conditionerColor,
    size,
    frequency,
    subscription
  } = req.body;


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

    // validare de campuri
    const fieldsToBeValidated = {
      name: {
        value: name,
        type: 'ascii'
      },
      clientId: {
        value: clientId,
        type: 'ascii'
      },
      name: {
        value: name,
        type: 'ascii'
      },
      hairType: {
        value: hairType,
        type: 'ascii'
      },
      hairStructure: {
        value: hairStructure,
        type: 'ascii'
      },
      scalpMoisture: {
        value: scalpMoisture,
        type: 'ascii'
      },
      siliconFree: {
        value: siliconFree,
        type: 'ascii'
      },
      fragrance: {
        value: fragrance,
        type: 'ascii'
      },
      shampooColor: {
        value: shampooColor,
        type: 'ascii'
      },
      conditionerColor: {
        value: conditionerColor,
        type: 'ascii'
      },
      size: {
        value: size,
        type: 'ascii'
      },
      frequency: {
        value: frequency,
        type: 'ascii'
      },
      subscription: {
        value: subscription,
        type: 'ascii'
      }
    };

    validateFields(fieldsToBeValidated);

    if (goals.length === 0) {
      throw new ServerError("No goal defined!", 400);
    }

    for (let goal of goals) {
      if (typeof goal !== 'string') {
        throw new ServerError("Genres should be an array of strings!", 400);
      }
    }
    await RecipesService.add(name, clientId, goals, hairType, hairStructure, scalpMoisture, siliconFree, fragrance, shampooColor, conditionerColor, size, frequency, subscription);

    res.status(201).end();
  } catch (err) {
    if (err.message.includes('is not a valid enum value')) {
      next(new ServerError(`Wrong goal selection!`, 400));
    }
    if (err.message.includes('403')) {
      next(new ServerError(`Authorisation failed!`, 403));
    }
    next(err);
  }
});

// get all recipes
// router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
router.get('/', async (req, res, next) => {
  try {
    console.info(`Forwarding request for auth-service ...`);
    console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
    const getAuthRequest = {
      url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
      headers: req.headers
    };

    const confirmation = await sendRequest(getAuthRequest);

    const recipes = await RecipesService.getAll();
    res.json(recipes);
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    //console.log(`Recipes controllers.js: ${err}`)
    next(err);
  }
});
//
// // get recipe by recipe_id
// router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
router.get('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  try {

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
    const recipe = await RecipesService.getById(id);
    res.json(recipe);
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    next(err);
  }
});

// // get all recipes of user by user_id
// router.get('/users/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
router.get('/users/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    console.info(`Forwarding request for auth-service ...`);
    console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
    const getAuthRequest = {
      url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
      method: 'GET',
      headers: req.headers
    };

    const confirmation = await sendRequest(getAuthRequest);

    validateFields({
      id: {
        value: id,
        type: 'ascii'
      }
    });
    const recipes = await RecipesService.getByUserId(id);
    res.json(recipes);
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    next(err);
  }
});

// // modify recipe by recipe_id
// router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
router.put('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  const {
    name,
    clientId,
    goals,
    hairType,
    hairStructure,
    scalpMoisture,
    siliconFree,
    fragrance,
    shampooColor,
    conditionerColor,
    size,
    frequency,
    subscription
  } = req.body;
  try {

    console.info(`Forwarding request for auth-service ...`);
    console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
    const getAuthRequest = {
      url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
      method: 'PUT',
      data: {ceva: 'ceva'},
      headers: req.headers
    };

    const confirmation = await sendRequest(getAuthRequest);

    const fieldsToBeValidated = {
      name: {
        value: name,
        type: 'ascii'
      },
      clientId: {
        value: clientId,
        type: 'ascii'
      },
      name: {
        value: name,
        type: 'ascii'
      },
      hairType: {
        value: hairType,
        type: 'ascii'
      },
      hairStructure: {
        value: hairStructure,
        type: 'ascii'
      },
      scalpMoisture: {
        value: scalpMoisture,
        type: 'ascii'
      },
      siliconFree: {
        value: siliconFree,
        type: 'ascii'
      },
      fragrance: {
        value: fragrance,
        type: 'ascii'
      },
      shampooColor: {
        value: shampooColor,
        type: 'ascii'
      },
      conditionerColor: {
        value: conditionerColor,
        type: 'ascii'
      },
      size: {
        value: size,
        type: 'ascii'
      },
      frequency: {
        value: frequency,
        type: 'ascii'
      },
      subscription: {
        value: frequency,
        type: 'ascii'
      }
    };

    validateFields(fieldsToBeValidated);

    if (goals.length === 0) {
      throw new ServerError("No goal defined!", 400);
    }

    for (let goal of goals) {
      if (typeof goal !== 'string') {
        throw new ServerError("Genres should be an array of strings!", 400);
      }
    }

    await RecipesService.updateById(id, name, clientId, goals, hairType, hairStructure, scalpMoisture, siliconFree, fragrance, shampooColor, conditionerColor, size, frequency, subscription);
    res.status(204).end();
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    next(err);
  }
});

// // delete recipe by recipe_id
//router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
router.delete('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;

  try {
    console.info(`Forwarding request for auth-service ...`);
    console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
    const getAuthRequest = {
      url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
      method: 'GET',
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
    await RecipesService.deleteById(id);
    res.status(204).end();
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    next(err);
  }
});

// // delete all recipes from db
//router.delete('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
router.delete('/', async (req, res, next) => {
  try {
    console.info(`Forwarding request for auth-service ...`);
    console.log(`.. to ${process.env.AUTH_SERVICE_API_ROUTE}/authorize`)
    const getAuthRequest = {
      url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/authorize`,
      method: 'GET',
      headers: req.headers
    };

    const confirmation = await sendRequest(getAuthRequest);
    // do logic
    await RecipesService.deleteAll();
    return res.status(200).end();
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js
    next(err);
  }
});

module.exports = router;
