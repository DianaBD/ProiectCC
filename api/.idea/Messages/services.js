const {
    Messages,
} = require('../data');

const add = async (authorId, message, resolved, faq) => {
    const author = new Messages({
        author: authorId,
        message,
        resolved,
        faq
    });
    await author.save();
};

const getAll = async () => {
    return await Messages.find();
};

const getById = async (id) => {
    return await Messages.findById(id);
};

const updateById = async (id, authorId, message, newResolved, faq) => {
    await Messages.findByIdAndUpdate(id, {author: authorId, message, resolved: newResolved, faq });
};

const deleteById = async (id) => {
    await Messages.findByIdAndDelete(id);
};

const deleteAll = async () => {
    // delete by id
    try{
        await Messages.remove();
    } catch(err) {
        throw new ServerError(`Nu am strers mesajele`, 404);
    }

};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
    deleteAll
}
