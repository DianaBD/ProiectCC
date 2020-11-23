const {
    Users
} = require('../data');

const {
    generateToken,
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const add = async (username, password, email, address, phoneNumber, firstName, lastName) => {
    const hashedPassword = await hash(password);
    const role = username === 'admin' ? 'admin' : (username ==='suport' ? 'suport' : 'user');
    const confirmed = 'false'
    const user = new Users({
        username,
        password: hashedPassword,
        role,
        email,
        address,
        phoneNumber,
        firstName,
        lastName,
        confirmed
    });
    await user.save();


};

const getIdByUserName = async (username) => {
  const userWithIdList = await Users.find({username: username})

  const [{
    _id,
    password,
    role,
    email,
    address,
    phoneNumber,
    firstName,
    lastName,
    confirmed
  }] = userWithIdList;
  const userWithId = userWithIdList[0]
  return userWithId._id
}

const getById = async (id) => {
  console.log("in getById function in services")
  const user = await Users.findById(id)

  const {
    username,
    password,
    role,
    email,
    address,
    phoneNumber,
    firstName,
    lastName,
    confirmed
  } = user;
  return user
}

const authenticate = async (username, password) => {

    const userName = await Users.findOne({ username: username });
    const userEmail = await Users.findOne({ email: username })
    const user = userName == null ? userEmail : userName
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }

    if (user.confirmed == 'false'){
        throw new ServerError(`Please confirm your account to login!`, 401);
    }

    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role,
            userName: user.username,
        });
    }
    throw new ServerError("Combinatia de username si parola nu este buna!", 400);
};

const getAll = async () => {
    return await Users.find();
};

// confirmarea contului dupa register
const updateByUserId = async (id, newConfirmed) => {
    await Users.findByIdAndUpdate(id, {
        confirmed : newConfirmed
    });
};

// update user by id
const updateById = async (id, username, password, email, address, phoneNumber,
  firstName, lastName) => {
    await Users.findByIdAndUpdate(id, {
        username,
        password,
        email,
        address,
        phoneNumber,
        firstName,
        lastName
    });
};

const deleteById = async (id) => {
  try {
    await Users.findByIdAndDelete(id);
  }catch(err) {
    throw new ServerError(`Nu am strers userul`, 404);
  }
};

const deleteAll = async () => {
    // delete by id
    try{
        await Users.remove();
    } catch(err) {
        throw new ServerError(`Nu am strers userii`, 404);
    }

};

module.exports = {
    add,
    authenticate,
    getAll,
    deleteById,
    deleteAll,
    getIdByUserName,
    updateById,
    updateByUserId,
    getById

}
