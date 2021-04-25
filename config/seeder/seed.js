const seeder = require("mongoose-seed");
const config = require("../");
const { userData, userOrderData } = require("./seedData");
const db = config.mongo.url;

// Connect to MongoDB via Mongoose
seeder.connect(db, { useUnifiedTopology: true }, () => {
  // Load Mongoose models
  seeder.loadModels(["models/user", "models/order"]);

  // Clear specified collections
  seeder.clearModels([config.models.User, config.models.Order], () => {
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
  {
    model: config.models.Order,
    documents: userOrderData,
  },
];
