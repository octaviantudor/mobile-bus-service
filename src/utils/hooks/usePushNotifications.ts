import useAsync from 'react-use/lib/useAsync';
import { useRef, useState } from 'react';
import {
    addNotificationReceivedListener,
    addNotificationResponseReceivedListener,
    AndroidImportance,
    removeNotificationSubscription,
    setNotificationChannelAsync,
    setNotificationHandler
} from 'expo-notifications';
import type { Subscription } from 'expo-modules-core';
import type { Notification, NotificationResponse } from 'expo-notifications';
import { Platform } from 'react-native';
import * as Linking from "expo-linking";

setNotificationHandler({
    // eslint-disable-next-line @typescript-eslint/require-await
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const usePushNotifications = (
    onTapNotification?: (response: NotificationResponse) => void



): {
    notification: Notification | null;
} => {
    console.log("oare")
    const [notification, setNotification] = useState<Notification | null>(null);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useAsync(async () => {
        notificationListener.current =
            addNotificationReceivedListener(setNotification);

        responseListener.current = addNotificationResponseReceivedListener(
            (response) => {
                const url=response.notification.request.content.body;
                console.log( url)
                if(response.actionIdentifier==="expo.modules.notifications.actions.DEFAULT"){
                    console.log("a apasat")
                    if(url){
                        Linking.openURL(url);
                    }
                }
            }
        );

        if (Platform.OS === 'android') {
            await setNotificationChannelAsync('default', {
                name: 'default',
                importance: AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return () => {
            if (notificationListener.current) {
                removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                removeNotificationSubscription(responseListener.current);
            }
        };
    });

    return { notification };
};

export default usePushNotifications;