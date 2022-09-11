const User = require('../models/User');
const Card = require('../models/Card');
const Deck = require('../models/Deck');

exports.createDeck = async (req, res) => {

    try {

        let deck = new Deck({
            name: req.body.name,
            createdBy: req.user._id,

        });

        deck = await deck.save();

        res.status(200).json({
            success: true,
            message: "Deck created successfully",
            deck

        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteDeck = async (req, res) => {

    try {
        const deck = await Deck.findById({_id: req.params.id});

        if (!deck) {
            return res.status(404).json({
                success: false,
                message: "Deck not found"
            })
        }

        const user = await User.findById(req.user._id);

        if (deck.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            })
        }
        for(let i=0; i<deck.cards.length; i++){
            const card = await Card.findById(deck.cards[i]);
            await card.remove();
        }
        await deck.remove();

        return res.status(200).json({
            success: true,
            message: "Deck deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

exports.updateDeck = async (req, res) => {

    try {
        const deck = await Deck.findById({_id: req.params.id});

        if (!deck) {
            return res.status(404).json({ success: false, message: "Deck not found" })
        }

        if (deck.createdBy.toString() !== req.user._id.toString()) {

            return res.status(401).json({ success: false, message: "Unauthorized user" })
        }

        if (req.body.name) {
            deck.name = req.body.name;
        }

        await deck.save();

        res.status(200).json({ success: true, message: "Deck updated successfully" })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.getDeck = async (req, res)=>{

    try {
        const deck = await Deck.find({_id: req.params.id}).populate('cards');
        if (!deck) {
            return res.status(404).json({ success: false, message: "Deck not found" })
        }
        res.status(200).json({
            success: true,
            deck, 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.getAllDecks = async (req, res)=>{

    try {
        const decks = await Deck.find({});
        if (!decks) {
            return res.status(404).json({ success: false, message: "No Decks are there" })
        }
        res.status(200).json({
            success: true,
            decks, 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}
