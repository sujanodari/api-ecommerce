const controller = require('../controllers/userController')();

const typeDef = `
type User{
  _id:String
  name:String
  role:String
  email:String
  disable:Boolean
  message:String
}



input EditUserInput {
  _id:String!
  name:String
  email: String
  password: String
  role: String
  disable:Boolean
}




extend type Query{
  Users: [User]
  User(input:GetByIdInput): User
}

extend type Mutation{
  EditUser(input:EditUserInput!): User
  DisableUser(input:EditUserInput!):User
  EnableUser(input:EditUserInput!):User
 }
`;

const resolvers = {
  Query: {
    Users: controller.Users,
    User: controller.getUserById,
  },
  Mutation: {
    EditUser: controller.editUser,
    DisableUser: controller.disableUser,
    EnableUser: controller.enableUser,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
