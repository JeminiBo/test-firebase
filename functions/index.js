const {onCall} = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addRole = onCall(({data}) => {
  return admin
    .auth()
    .getUser(data.uid)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {[data.role]: true});
    })
    .then(() => {
      return {message: 'Success'};
    })
    .catch(err => err);
});