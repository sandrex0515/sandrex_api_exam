const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    case_name: {
        type: String,
    },
    area:{
        type:String,
    },
    isPUI:{
        type: Boolean,
        default: false
    },
    isPUM:{
        type:Boolean,
        default: false,
    },
    isConfirmed:{
        type:Boolean,
        default:false
    },
    isDead:{
        type:Boolean,
        default:false
    },
    user_id:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);