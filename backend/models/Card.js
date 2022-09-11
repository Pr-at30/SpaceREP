const mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    questionImage: {
        public_id: String,
        url: String
    },
    solutionText: {
        type: String
    },
    solutionImage: {
        public_id: String,
        url: String
    },
    deck:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deck", 
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

module.exports = mongoose.model("Card", cardSchema);