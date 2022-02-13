module.exports = mongoose => {
    const Team = mongoose.model(
      "team",
      mongoose.Schema(
        {
          name: String,
          startDate: String,
          endDate: String
        },
        { timestamps: true }
      )
    );
    return Team;
  };