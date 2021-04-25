const userData = [
  {
    userId: 1,
    name: 'Rahul',
  },
  {
    userId: 2,
    name: 'Ramesh',
  },
  {
    userId: 3,
    name: 'Ankita',
  },
];

const userOrderData = [
  {
    orderId: 1,
    userId: 1,
    subtotal: 500,
    date: '2019-01-23',
  },
  {
    orderId: 2,
    userId: 2,
    subtotal: 400,
    date: '2019-04-16',
  },
  {
    orderId: 3,
    userId: 1,
    subtotal: 150,
    date: '2019-03-20',
  },

  {
    orderId: 4,
    userId: 1,
    subtotal: 700,
    date: '2019-03-25',
  },
  {
    orderId: 5,
    userId: 3,
    subtotal: 200,
    date: '2019-02-21',
  },
  {
    orderId: 6,
    userId: 3,
    subtotal: 1500,
    date: '2019-02-22',
  },
  {
    orderId: 7,
    userId: 1,
    subtotal: 1200,
    date: '2019-04-16',
  },
  {
    orderId: 8,
    userId: 2,
    subtotal: 1600,
    date: '2019-05-1',
  },
  {
    orderId: 9,
    userId: 2,
    subtotal: 900,
    date: '2019-05-23',
  },
  {
    orderId: 10,
    userId: 1,
    subtotal: 700,
    date: '2019-04-13',
  },
];

module.exports = { userData, userOrderData };
