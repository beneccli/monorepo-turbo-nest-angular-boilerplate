module.exports = [
  {
    method: 'get',
    path: '/me/scheduled-meals',
    json: require('./json/scheduled-meals.json')
  },
  {
    method: 'get',
    path: '/suppliers/isAccessGranted',
    json: require('./json/is-access-granted.json')
  },
  {
    method: 'get',
    path: '/groceries/timeslots',
    json: require('./json/groceries/timeslots.json')
  },
  {
    method: 'get',
    path: '/groceries/addresses',
    json: require('./json/groceries/addresses.json')
  }
];
