const express = require("express")
const router = express.Router()
const contact = require("../controller/contact.controller");

// /api/contact: GET, POST, DELETE
// /api/contact/:id: GET, PUT, DELETE
// /api/contact/targets: GET

// Create a new contact
router.post("/", contact.create);

// Retrieve all contacts
router.get("/", contact.findAll);

// Retrieve all target contacts
router.get("/targets", contact.findAllTargets);

// Retrieve a single contact by id
router.get("/:id", contact.findOne);

// Update a contact by id
router.put("/:id", contact.update);

// Delete a contact by id
router.delete("/:id", contact.delete);

// Delete all contacts
router.delete("/", contact.deleteAll);

module.exports = router