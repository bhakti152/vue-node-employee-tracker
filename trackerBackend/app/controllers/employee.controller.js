const db = require("../models");
const Emp = db.employee;
const Task = db.task;
var ObjectId = require('mongodb').ObjectId
// Create and Save a new Emp
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Emp
  const team = new Emp({
    name: req.body.name,
          joinDate: req.body.joinDate,
          teamCode: new ObjectId( req.body.teamCode)  
    });
  // Save Emp in the database
  team
    .save(team)
    .then(data => {
        const createTaskObj = new Task({
          code : "dummy task",
        name:"taskname",
        description:"desc",
project:"taskproject",
logs:[{
    employee_code:data._id,
    loggedTime:"00:00",
    loggedStartDate:req.body.joinDate
}]

        })
        createTaskObj.save(createTaskObj).then(taskData=>{
            console.log('taskdata:',taskData);
            res.send(data);

        }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Emp."
      });
    });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Emp."
      });
    });
};
// Retrieve all Emps from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Emp.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving teams."
        });
      });
  };
// Find a single Emp with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Emp.find({teamCode:new ObjectId(id)})
      .then(data => {
          console.log('emp:',data)
          
        if (!data)
          res.status(404).send({ message: "Not found Emp with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Emp with id=" + id });
      });
  };
  exports.findEmpTask = (req, res) => {
    const id = req.params.id;
    Task.find({"logs.employee_code":new ObjectId(id)}).then(dataTask=>{
        console.log("dataTask:",dataTask);
        if(!dataTask || dataTask.length == 0)
        {
            res.status(404).send({ message: "Not found Emp with id " + id });
        }else{
          res.send(dataTask)
        }
    }).catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Emp with id=" + id });
      });
  };
// Update a Emp by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Emp.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Emp with id=${id}. Maybe Emp was not found!`
          });
        } else res.send({ message: "Emp was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Emp with id=" + id
        });
      });
  };
// Delete a Emp with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Emp.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Emp with id=${id}. Maybe Emp was not found!`
          });
        } else {
          res.send({
            message: "Emp was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Emp with id=" + id
        });
      });
  };
// Delete all Emps from the database.
exports.deleteAll = (req, res) => {
    Emp.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Emps were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all teams."
        });
      });
  };
// Find all published Emps
exports.findAllPublished = (req, res) => {
    Emp.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving teams."
        });
      });
  };