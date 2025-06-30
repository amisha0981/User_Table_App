const express = require('express');
const router = express.Router();
const { postUsers, getUsers } = require('../Controller/user');


router.post('/post_users', postUsers);
router.get('/get_users', getUsers);

module.exports = router;