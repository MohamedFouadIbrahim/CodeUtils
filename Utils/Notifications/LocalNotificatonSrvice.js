import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

class LocalNotificatonSrvices {

    configure = (onOpenNotification) => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log(" [LocalNotififcationServes] onRegister:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("[LocalNotififcationServes] onNotification :", notification);
                if (notification?.data) {
                    return
                }

                // process the notification
                notification.userInteraction = true
                onOpenNotification(Platform.OS == 'ios' ? notification.data.item : notification.data)
                // (required) Called when a remote is received or opened, or local notification is opened
                if (Platform.OS == 'ios') {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    unRegiter = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        // console.log('Hereee')
        PushNotification.localNotification({
            ...this.handelAndroidNotification(id, title, message, data, options),
            ...this.handelIOSNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            actions: ['no'],
            // playSound: options.playSound || false,
            // soundName: options.soundName || 'default'
        })
    }

    handelAndroidNotification = (id, title, message, data, options) => {
        return {
            id,
            channelId: 'ChanId',
            data: data
        }
    }

    handelIOSNotification = (id, title, message, data, options) => {
        return {
            userInfo: {
                id,
                item: data
            }
        }
    }

    cancelAllLocalNotificaton = () => {

        if (Platform.OS == 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications()
        } else {
            PushNotification.cancelAllLocalNotifications()
        }
    }

    removeAllDeliveredNotificationBuId = (notificationId) => {
        PushNotification.cancelLocalNotifications({ id: notificationId })
    }
}

export const LocalNotificatonSrvice = new LocalNotificatonSrvices()