/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React from 'react';
import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // PushNotification.presentLocalNotification(remoteMessage)
  // LocalNotificatonSrvice.showNotification(0, remoteMessage.notification.title, remoteMessage.notification.body, {})
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
// AppRegistry.registerComponent(appName, () => App);
