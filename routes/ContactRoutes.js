const express = require('express');
const router = express.Router();
const {SubmitForm} = require("../controllers/ContactControllers");

router.post('/', SubmitForm);

module.exports = router;

