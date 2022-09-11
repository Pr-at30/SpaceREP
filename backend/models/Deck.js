const mongoose = require('mongoose');
const deckSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

module.exports = mongoose.model("Deck", deckSchema);