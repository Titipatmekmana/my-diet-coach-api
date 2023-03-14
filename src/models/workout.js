module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define(
    "Workout",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      calories: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Workout.associate = (db) => {
    Workout.hasMany(db.UserWorkout, {
      foreignKey: {
        name: "workoutId",
        // allowNull: false,
      },
    });
  };

  return Workout;
};
