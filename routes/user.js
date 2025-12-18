const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/userController');

router.get('/all', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;