import firebaseAuth from '@react-native-firebase/auth';
import functions, {firebase} from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

firebase.functions().useEmulator('localhost', 5001);

class Firebase {
  checkAppCheck = async () => {
    try {
      const {token} = await firebase.appCheck().getToken(true);

      if (token.length > 0) {
        console.log('AppCheck verification passed');
      }
    } catch (error) {
      console.log('AppCheck verification failed');
    }
  };

  auth = () => {
    return firebaseAuth()
      .signInAnonymously()
      .then(data => {
        console.log('AUTH SUCCESS', data.user.uid);
        return data.user.uid;
      })
      .catch(error => {
        console.error(error);
      });
  };

  signOut = () => {
    firebaseAuth()
      .signOut()
      .then(() => {
        console.log('SIGN OUT');
      })
      .catch(error => {
        console.error(error);
      });
  };

  addRoleToUser = async (uid, role) => {
    await functions().httpsCallable('addRole')({
      uid,
      role,
    });
  };

  isUserHaveRole = async roleName => {
    const idTokenResult = await firebase
      .auth()
      .currentUser.getIdTokenResult(true);
    return idTokenResult.claims[roleName];
  };

  getAllDataFromDb = async collectionName => {
    return await firestore()
      .collection(collectionName)
      .get()
      .then(snapshot => {
        const newData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        return newData;
      });
  };

  getImageUrl = async (
    imageName = 'Screenshot from 2023-05-07 12-28-30.png',
  ) => {
    const url = await storage().ref(imageName).getDownloadURL();
    return url;
  };
}

export const FirebaseService = new Firebase();
