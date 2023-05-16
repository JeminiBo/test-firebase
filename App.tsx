import React from 'react';
import {SafeAreaView} from 'react-native';
import {withIAPContext} from 'react-native-iap';
import {Auth} from './src/pages/auth';
import './src/firebase/config';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Auth />
    </SafeAreaView>
  );
}

export default withIAPContext(App);
