const User = require('./User');
const Dog = require("./Dog");
const Appointment = require('./Appointment');
const Trainer = require('./Trainer')

// create associations
User.hasMany(Dog, {
  foreignKey: 'user_id'
}),

Dog.belongsTo(User, {
  foreignKey: 'user_id'
})

User.belongsToMany(Dog, {
  through: Appointment,
  as: "appointment_time",
  foreignKey: "user_id",
});

Dog.belongsToMany(User, {
  through: Appointment,
  as: "appointment_time",
  foreignKey: "dog_id",
});

Appointment.belongsTo(User, {
  foreignKey: 'user_id'
});

Appointment.belongsTo(Dog, {
  foreignKey: 'dog_id'
})

User.hasMany(Appointment, {
  foreignKey: 'user_id'
})

Dog.hasMany(Appointment, {
  foreignKey: 'dog_id'
})

Trainer.belongsTo(User, {
  foreignKey: 'user_id'
});

Trainer.belongsTo(Dog, {
  foreignKey: 'dog_id'
});

User.hasMany(Trainer, {
  foreignKey: 'user_js'
});

Dog.hasMany(Trainer, {
  foreignKey: 'dog_id'
});


module.exports = { User, Dog, Appointment, Trainer };