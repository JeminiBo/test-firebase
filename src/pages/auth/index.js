import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {getAllDataFromDb} from '../../firebase/helpers';
import auth from '@react-native-firebase/auth';
import functions, {firebase} from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

firebase.functions().useEmulator('localhost', 5001);

export const Auth = () => {
  useEffect(() => {
    checkAppCheck();
    getImageUrl();
  }, []);
  const checkAppCheck = async () => {
    try {
      const {token} = await firebase.appCheck().getToken(true);

      if (token.length > 0) {
        console.log('AppCheck verification passed');
      }
    } catch (error) {
      console.log('AppCheck verification failed');
    }
  };
  const authUser = () => {
    auth()
      .signInWithEmailAndPassword('joikervik@gmail.com', 'SuperSecretPassword!')
      .then(async data => {
        console.log('User account created & signed in!', data);
        addAdminRoleToUser();
        getAllDataFromDb('projects').then(data => console.log('DATA', data));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const addAdminRoleToUser = async (email = 'joikervik@gmail.com') => {
    await functions().httpsCallable('addAdminRole')({
      email,
    });
    const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();

    const isAdminUser = idTokenResult.claims?.admin;
    console.log('IS ADMIN', isAdminUser);
  };

  const getImageUrl = async () => {
    const url = await storage()
      .ref('Screenshot from 2023-05-07 12-28-30.png')
      .getDownloadURL();
    console.log('URL', url);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        height: '100%',
        width: '100%',
      }}>
      <Button title="Auth" onPress={() => authUser()}></Button>
    </View>
  );
};
