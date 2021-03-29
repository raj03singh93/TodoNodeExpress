let mongoose = require("mongoose")

let TodoSchema = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("Todo", TodoSchema)