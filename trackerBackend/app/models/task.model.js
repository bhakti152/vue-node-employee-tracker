module.exports = mongoose => {
    const Task = mongoose.model(
      "task",
      mongoose.Schema(
        {
            code: String,
          name: String,
          description: String,
          project: String,
          logs:[{employee_code:String,loggedTime:Date,loggedStartDate:Date}]
        },
        { timestamps: true }
      )
    );
    return Task;
  };