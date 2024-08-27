const express = require('express');
const router = express.Router();
const {getContact,createContact,personContact,updateContact,delectContact} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get(personContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(delectContact);

module.exports = router;
