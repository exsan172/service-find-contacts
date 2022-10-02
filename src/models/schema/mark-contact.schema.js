import mongoose from "mongoose"

const markContact = mongoose.Schema({
    number : {
        type: String,
        require: true
    },
    marked : {
        type: Array,
        require: true
    },
    createdAt : {
        type: Date,
        require: true
    }
})

export default mongoose.model("marked_contact", markContact)