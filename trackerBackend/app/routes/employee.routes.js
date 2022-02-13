module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    var router = require("express").Router();
    // Create a new Team
    router.post("/", employees.create);
    // Retrieve all Teams
    router.get("/", employees.findAll);
    // Retrieve all published Teams
    router.get("/published", employees.findAllPublished);
    // Retrieve a single Team with id
    router.get("/:id", employees.findOne);
    router.get("/task/:id", employees.findEmpTask);

    // Update a Team with id
    router.put("/:id", employees.update);
    // Delete a Team with id
    router.delete("/:id", employees.delete);
    // Create a new Team
    router.delete("/", employees.deleteAll);
    app.use('/api/employees', router);
  };