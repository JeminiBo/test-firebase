const {onCall} = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = onCall(({data}) => {
  console.log('EMAIL', data);
  return (
    admin
      .auth()
      .getUserByEmail(data.email)
      .then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {admin: true});
      })
      .then(() => {
        return {message: 'Success'};
      })
      .catch(err => err)
  );
});

exports.listProducts = onCall(() => {
  return [
    /* ... */
    // Return some data
  ];
});
