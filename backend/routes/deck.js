const express = require('express');
const router = express.Router();

const { createDeck, deleteDeck, updateDeck, getDeck, getAllDecks } = require('../controllers/deck');


const { isAuthenticated } = require('../middlewares/auth');

router.route('/upload').post(isAuthenticated, createDeck);
router.route('/:id').get(isAuthenticated, getDeck).put(isAuthenticated, updateDeck).delete(isAuthenticated, deleteDeck);
router.route('/').get(isAuthenticated, getAllDecks);

module.exports = router;