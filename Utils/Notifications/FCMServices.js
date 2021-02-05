import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
class FcmServices {

    register(onRegister, onNotification, onOpenNotification) {

        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async () => {

        if (Platform.OS == 'ios') {
            await messaging().registerDeviceForRemoteMessages()
            await messaging().setAutoInitEnabled(true)
        }
    }

    checkPermission = (onRegister) => {

        messaging().hasPermission()
            .then(enabled => {

                if (enabled) {
                    this.getToken(onRegister)
                } else {
                    // user doesnt have permisiion
                    this.requestPermission(onRegister)
                }
            })
            .catch(error => {
                console.log('[FCMServises] Permission rejected', error)
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {

                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.log('[FCMServises]  user does not have a device token')
                }

            })
            .catch(erorr => {
                console.log('[FCMServises] getToken rejected', erorr)
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(error => {
                console.log('[FCMServises] Permission rejected', error)
            })
    }

    deleteToken = () => {
        console.log('[FCMServises] Deleted Tokn')
        messaging().deleteToken()
            .catch(error => {
                console.log('[FCMServises] Deleted Tokn erorr', error)
            })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        PushNotification.createChannel({ channelId: 'ChanId', channelName: 'ChanName' })

        // when the app is running , but in the background 
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('[FCMServises] onNotificationOpenedApp Notification caused app to open')
            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                // this.removeDliveredNotification(notification.notificationId)
            }
        })

        // when the app is opned from a quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log('[FCMServises] getInitialNotification Notification caused app to open', remoteMessage)

                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                    // this.removeDliveredNotification(notification.notificationId)
                }
            })

        this.messageListenner = messaging().onMessage(async remoteMessage => {
            console.log('[FCMServises] a new FCM Message arrived', remoteMessage)

            if (remoteMessage) {
                let notification = null
                if (Platform.OS == 'ios') {
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        })

        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCMServises] a new token refresh', fcmToken)
            onRegister(fcmToken)
        })
    }

    unRegister = () => {
        this.messageListenner()
    }

}

export const fcmService = new FcmServices()