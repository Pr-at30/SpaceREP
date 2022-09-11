const User = require('../models/User');
const Card = require('../models/Card');
const Deck = require('../models/Deck');
const cloudinary = require('../middlewares/cloudinary');

exports.createCard = async (req, res) => {

    try {
        const questionImage = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'hackOdisha'
        });
        const solutionImage = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'hackOdisha'
        });

        const deck = await Deck.findById(req.params.id);
        if (!deck) {
            res.status(400).json({ success: false, message: "Make a Deck first" });
        }

        let card = new Card({
            heading: req.body.heading,
            desc: req.body.desc,
            questionImage: {
                public_id: questionImage.public_id,
                url: questionImage.secure_url
            },
            solutionText: req.body.solutionText,
            solutionImage: {
                public_id: solutionImage.public_id,
                url: solutionImage.secure_url
            },
            deck: deck._id,
            createdBy: req.user._id,
        });
        // card = await card.save();

        // deck.cards.push(card);
        // deck.save();

        res.status(200).json({
            success: true,
            message: "Card created successfully",
            card

        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteCard = async (req, res) => {

    try {
        const card = await Card.findById(req.params.id);
        const deck = await Deck.findById(card.deck._id);

        if (!card) {
            return res.status(404).json({
                success: false,
                message: "Card not found"
            })
        }

        const user = await User.findById(req.user._id);

        if (card.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            })
        }
        const index = deck.cards.indexOf(card._id);
        deck.cards.splice(index, 1);

        await card.remove();
        await deck.save();

        return res.status(200).json({
            success: true,
            message: "Card deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

exports.updateCard = async (req, res) => {

    try {
        const card = await Card.findById(req.params.id);
        const deck = await Deck.findById(req.params.deckId);
        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" })
        }

        if (card.createdBy.toString() !== req.user._id.toString()) {

            return res.status(401).json({ success: false, message: "Unauthorized user" })
        }

        if (req.body.heading) {
            card.heading = req.body.heading;
        }
        if (req.body.desc) {
            card.desc = req.body.desc;
        }
        if (req.body.solutionText) {

            card.solutionText = req.body.solutionText;
        }

        card.deck = deck._id,

            await cloudinary.uploader.destroy(card.solutionImage.public_id);


        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'hackOdisha'
        });
        card.solutionImage = { public_id: result.public_id || card.solutionImage.public_id, url: result.secure_url || card.solutionImage.url }

        const index = deck.cards.indexOf(card._id);
        deck.cards.splice(index, 1);

        deck.cards.push(card);
        await deck.save();

        await card.save();

        res.status(200).json({ success: true, message: "Card updated successfully" })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.getCard = async (req, res) => {

    try {
        const deck = await Deck.findById(req.params.deckId);
        const card = await Card.findById(req.params.id);
        if (!deck) {
            return res.status(404).json({ success: false, message: "Deck not found" })
        }
        if (!card) {
            return res.status(404).json({ success: false, message: "Card not found" })
        }
        if (card.createdBy.toString() !== req.user._id.toString()) {

            return res.status(401).json({ success: false, message: "Unauthorized user" })
        }
        res.status(200).json({
            success: true,
            card,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}
