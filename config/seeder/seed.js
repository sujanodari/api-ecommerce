const seeder = require('mongoose-seed');
const config = require('../');
const { userData } = require('./seedData');
const db = config.mongo.url;

// Connect to MongoDB via Mongoose
seeder.connect(db, { useUnifiedTopology: true }, () => {
  // Load Mongoose models
  seeder.loadModels(['models/user']);

  // Clear specified collections
  seeder.clearModels([config.models.User], () => {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: config.models.User,
    documents: userData,
  },
];
