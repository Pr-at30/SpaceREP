const express = require('express');
const router = express.Router();
const extractCard = require('../middlewares/file');

const { createCard, deleteCard, updateCard, getCard } = require('../controllers/card');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/upload/:id').post(isAuthenticated, extractCard.single('questionImage'), createCard);
router.route('/:deckId/:id').get(isAuthenticated, getCard).put(isAuthenticated, extractCard.single('solutionImage'), updateCard).delete(isAuthenticated, extractCard.single('solutionImage'), deleteCard);

module.exports = router;