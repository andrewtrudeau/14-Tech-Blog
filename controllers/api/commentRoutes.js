const router = require('express').Router();
const { Comment } = require('../../models');

// Single comment
router.post('/:id', (req, res) => {
    try {

    } catch (err) {
        res.status(400).json({ status: err })
    }
});

// Delete comment
router.delete('/:id', (req, res) => {
    try {


    } catch (err) {
        res.status(400).json({ status: err })
    }
});

module.exports = router;
