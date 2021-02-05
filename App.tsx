import FirebaseMessaging from '@react-native-firebase/messaging';
import FireBase from '@react-native-firebase/app';
import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LocalNotificatonSrvice } from './Utils/Notifications/LocalNotificatonSrvice';
import { fcmService } from './Utils/Notifications/FCMServices';
declare const global: { HermesInternal: null | {} };


const App = () => {

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
      Alert.alert(notify.body)


    }

    return ()=>{
      console.log('[App] unRegit')

      fcmService.unRegister()
      LocalNotificatonSrvice.unRegiter()
    }
  }, [])
  //   FirebaseMessaging().onMessage(async (msg) => {

  //     console.log('onmessage', msg)
  //     // msg.notification?.android?.clickAction
  //   })

  //   FirebaseMessaging().setBackgroundMessageHandler(async (msg) => {

  //     console.log('msg', msg)
  //   })
  //   FirebaseMessaging
  //   // FirebaseMessaging().app.utils().app
  //   // FirebaseMessaging()
  //   // firebase.utils()
  // //  const d = new FireBaseFireBase.utils().
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <Button title="Write"
        onPress={() => {
          // PushLoacally()
        }}
      />

      <Button title="read"
        onPress={() => { }}
      />

    </SafeAreaView>
  );
};

export default App;
