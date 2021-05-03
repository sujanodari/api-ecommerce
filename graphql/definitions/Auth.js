const controller = require('../controllers/authController')();

const typeDef = `
  type LoginResponse {
    accessToken: String!
    role: String!
    _id: String!
    refreshToken:String!
    message: String
  }

  type ForgotPasswordResponse {
    token: String!
    message: String 
  }

  input LoginInput {
    email: String!
    password: String!
  }

 

  input ChangePasswordInput {
    _id:String!
    oldPassword: String!
    newPassword: String!
  }

  input ResendVerificationInput {
    email: String!
  }

  input VerifyEmailInput {
    token: String
  }

  input ForgotPasswordInput {
    email: String!
  }

  input ResetPasswordInput {
    newPassword:String!
    token:String!
  }
  
  type LoggedInUserResponse {
    name: String
    email: String
    role: String!
    _id: String!
  }

  input RemoveUserRefreshTokenInput {
    userId: String!
  }

  input LogoutInput {
    refreshToken: String
  }

  extend type Query {
    LoggedInUser:LoggedInUserResponse
  }
  
  extend type Mutation {
    Login(input: LoginInput!): LoginResponse
    CreateUser(input:CreateInput!): CreateResponse
    ChangePassword(input: ChangePasswordInput!): MessageResponse
    ResendVerification(input: ResendVerificationInput!): MessageResponse
    VerifyEmail(input: VerifyEmailInput): MessageResponse
    ForgotPassword(input:ForgotPasswordInput!): ForgotPasswordResponse
    ResetPassword(input:ResetPasswordInput!): MessageResponse
    RemoveUserRefreshToken(input: RemoveUserRefreshTokenInput!): Boolean 
    Logout(input: LogoutInput): Boolean 
  }
`;

const resolvers = {
  Query: {
    LoggedInUser: controller.getLoggedInUser,
  },
  Mutation: {
    Login: controller.login,
    CreateUser: controller.createUser,
    ChangePassword: controller.changePassword,
    ResetPassword: controller.resetPassword,
    ResendVerification: controller.resendVerification,
    ForgotPassword: controller.forgotPassword,
    VerifyEmail: controller.verifyEmail,
    RemoveUserRefreshToken: controller.removeUserRefreshToken,
    Logout: controller.logout,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
