const db = require('../models');
const tutorial = db.tutorials;
const op = db.Sequelize.Op;

// Create and Save a new tutorial
exports.create = (req, res) => {

// Validate request
if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });

    return;
}

  // Create a tutorial
  const newTutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save tutorial in the database
  tutorial.create(newTutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the tutorial.'
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [op.like]: `%${title}%` } } : null;
  
    tutorial.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving tutorials.'
        });
      });
};

// Find a single tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    tutorial.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error retrieving tutorial with id=' + id
        });
      });
};

// Update a tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    tutorial.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: 'tutorial was updated successfully.'
          });
        } else {
          res.send({
            message: `Cannot update tutorial with id=${id}. Maybe tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Error updating tutorial with id=' + id
        });
      });
};

// Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    tutorial.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: 'tutorial was deleted successfully!'
          });
        } else {
          res.send({
            message: `Cannot delete tutorial with id=${id}. Maybe tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: 'Could not delete tutorial with id=' + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while removing all tutorials.'
        });
      });
};  

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    tutorial.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving tutorials.'
        });
      });
};