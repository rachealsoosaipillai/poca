const db = require("../models");
const Contact = db.contact;

// Create and Save a new contact
exports.create = (req, res) => {
    // Validate request
  if (!req.body.firstName) {
    res.status(400).send({ message: "First name cannot be empty!" });
    return;
  } else if (!req.body.lastName) {
    res.status(400).send({ message: "Last name cannot be empty!" });
    return;
  }

  // Create a contact
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    isTarget: req.body.isTarget ? req.body.isTarget : false
  }

  // Save contact in the database
  Contact
    .create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the contact."
      });
    });

};

// Retrieve all contacts from the database
exports.findAll = (req, res) => {
    Contact.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts."
        });
      });

};

// Find a single contact with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contact.findByPk(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found contact with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving contact with id=" + id });
      });

};

// Update a contact by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

      Contact.update(req.body, {
        where: { id: id }
      }).then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
            });
          } else res.send({ message: "Contact was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Contact with id=" + id
          });
        });
};

// Delete a contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.destroy({
  where: { id: id }
})
    .then(data => {
      if (data === 1) {
        res.send({
          message: "Contact was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });

};

// Delete all contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.destroy({
  where: {},
  truncate: false
})
  .then(data => {
    res.send({
      message: `${data} Contacts were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all contacts."
    });
  });
};

// Find all target contacts
exports.findAllTargets = (req, res) => {
Contact.findAll({ where: { isTarget: true }})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving target contacts."
    });
  });
};