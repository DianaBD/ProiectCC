const {
    Recipes
} = require('../data');

const add = async (name, clientId, goals, hairType, hairStructure, scalpMoisture, siliconFree, fragrance, shampooColor, conditionerColor, size, frequency, subscription) => {
    const recipe = new Recipes({
        name,
        client: clientId,
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
    });
    await recipe.save();
};

const getAll = async () => {
    const recipes = await Recipes.find().populate('author');
    return recipes.map(recipe => {
        const {
            id,
            name,
            goals,
            client,
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
        } = recipe;
        return {
            id,
            name,
            goals,
            client,
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
        }
    })
};

const getById = async (id) => {
    const recipe = await Recipes.findById(id).populate('author');
    const {
        name,
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
    } = recipe;
    return {
        id,
        name,
        goals,
        client: `${recipe.client.username}`,
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
    }
};

const getByUserId = async (id) => {
  const recipes = await Recipes.find({client: id});
    return recipes.map(book => {
        const {
          id,
          name,
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
        } = book;
        return {
          id,
          name,
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
        }
    })
}

const updateById = async (id, name, clientId, goals, hairType, hairStructure, scalpMoisture, siliconFree, fragrance, shampooColor, conditionerColor, size, frequency, subscription) => {
    await Recipes.findByIdAndUpdate(id, {
        name,
        goals,
        client: clientId,
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
    });
};

const deleteById = async (id) => {
    await Recipes.findByIdAndDelete(id);
};

const deleteRecipesByUserId = async (id) => {
  console.log(`%%%%%%%%%%%%%%%%%% deleting recipes of id: ${id}`)
  try{
    const res = await Recipes.deleteMany({client: id});
    console.log(`res.deletedCount: ${res.deletedCount}`)
    res.deletedCount;

  } catch(err) {
      throw new ServerError(`Nu am sters retetele userului`, 404);
  }
};

const deleteAll = async () => {
    // delete by id
    try{
        await Recipes.remove();
    } catch(err) {
        throw new ServerError(`Nu am sters retetele`, 404);
    }

};

module.exports = {
    add,
    getAll,
    getById,
    getByUserId,
    updateById,
    deleteById,
    deleteAll,
    deleteRecipesByUserId
}
