import React, { useEffect } from 'react';
import { fcmService } from './FCMServices';
import { LocalNotificatonSrvice } from './LocalNotificatonSrvice';


// install 
//@react-native-firebase/messaging
//@react-native-firebase/app
// react-native push notification if we want custom notification

// usage 
// 'react-native-push-notification'; if we want custom Notitfcations
// '@react-native-community/push-notification-ios'; this for IOSNotification 

// dont forgt to add setBackgroundMessageHandler for android 

// like that 
/**
 * 
 * 
import messaging from '@react-native-firebase/messaging';
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
 * 
 * 
 */
// dont forget Channale




useEffect(() => {

    fcmService.registerAppWithFCM()
    fcmService.register(onRegiter, onNotification,onNotificationOpen)
    LocalNotificatonSrvice.configure(onNotificationOpen)

    function onRegiter(token: any) {
      console.log('[App] token', token)
    }

    function onNotification(notify: any) {
      console.log('[App] onNotification', notify)

      const options = {

      }
      LocalNotificatonSrvice.showNotification(0, notify.title, notify.body, options)
    }
    
    function onNotificationOpen(notify: any) {

      console.log('[App] onNotificationOpen', notify)

    }

    return ()=>{
      console.log('[App] unRegit')

      fcmService.unRegister()
      LocalNotificatonSrvice.unRegiter()
    }
  }, [])