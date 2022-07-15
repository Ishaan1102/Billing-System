const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    text: {
        type : String,
        required : true
    },
    name : {
        type : String
    },
    avatar : {
        type : String
    },
    dueDate : {
        type : Date,
        required : true
    }, 
    amount : {
        type : String,
        required : true
    },
    datePosted : {
        type : Date,
        default : Date.now
    }
});

module.exports = Bill = mongoose.model('bill', BillSchema)