
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    goals: [{
        type: String,
        enum: ['fix split ends', 'hidrate', 'replenish', 'strenghten', 'color protection', 'lengthen', 'volumize','anti-frizz','curl definition','nourish roots','shine','soothe scalp','straighten','oil control'],
        default: 'fiction'
    }],
    hairType: {
      type: String,
      required: true
    },
    hairStructure: {
      type: String,
      required: true
    },
    scalpMoisture: {
      type: String,
      required: true
    },
    siliconFree: {
      type: String,
      required: true
    },
    fragrance: {
      type: String,
      required: true
    },
    shampooColor: {
      type: String,
      required: true
    },
    conditionerColor: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    },
    subscription:{
      type: String,
      required: true
    }

}, { timestamps: true });

const RecipeModel = mongoose.model('Recipes', RecipeSchema);
module.exports = RecipeModel;
