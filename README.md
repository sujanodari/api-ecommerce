# E-Commerce API

> NodeJS, ExpressJS, MongoDB, GraphQL

## Installation Guide

```
# clone repository
$ git clone

# install dependencies
$ npm i

# copy and modify the .env.example to .env

$ cd ecommerce


# Seed User and Order model
$ npm run seed


# start
$ npm run start:dev

```

## Linter and Prettier

```
# Lint
$ npm run lint

# Lint Fix
$ npm run lint:fix

# Prettify
$ npm run prettier:fix
```

## GraphlQL Routes

- api : http://localhost:8080/v1/graphql
- method : post
- query to fecth orders

  ```
  query{
      Orders{
      userId
      name
      noOfOrders
      averageBillValue
  }
  }
  ```

- mutation to update users orders

  ```
    mutation{
        UpdateUserOrders{
        message
    }
    }
  ```

## Rest Routes

- fetch orders, method get : http://localhost:8080/v1/orders
- update user order, method put : http://localhost:8080/v1/users
