module.exports = mongoose => {
    const Employee = mongoose.model(
      "employee",
      mongoose.Schema(
        {
          name: String,
          joinDate: String,
          teamCode: String,
          skills:[String]
        },
        { timestamps: true }
      )
    );
    return Employee;
  };