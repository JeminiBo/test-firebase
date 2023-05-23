import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import {FirebaseService} from '../../firebase/service';

export const Auth = () => {
  useEffect(() => {
    FirebaseService.checkAppCheck();
  }, []);

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
      <Button
        title="Auth"
        onPress={async () => {
          const uid = await FirebaseService.auth();
          await FirebaseService.addRoleToUser(uid, 'subscriber');
          await FirebaseService.isUserHaveRole('subscriber');
        }}
      />
      <Button
        title="Sign Out"
        onPress={async () => {
          await FirebaseService.signOut();
        }}
      />
      <Button
        title="Get Data"
        onPress={async () => {
          FirebaseService.getAllDataFromDb('projects').then(data =>
            console.log('DATA', data),
          );
        }}
      />
    </View>
  );
};
