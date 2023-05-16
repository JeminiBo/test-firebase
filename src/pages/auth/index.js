import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {getAllDataFromDb} from '../../firebase/helpers';
import auth from '@react-native-firebase/auth';

export const Auth = () => {
  const authUser = () => {
    console.log('START AUTH');
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(data => {
        console.log('User account created & signed in!', data);
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
