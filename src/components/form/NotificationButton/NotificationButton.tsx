import { useState, useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { getMessaging, getToken, deleteToken } from "firebase/messaging";
import { axiosCustom } from '@/api/mutator/axiosCustom.ts';

const NOTIFICATIONS_KEY = 'notifications-enabled';
const NOTIFICATION_TOKEN = 'notifications-token';

const NotificationButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(() => {
    return localStorage.getItem(NOTIFICATIONS_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, enabled ? 'true' : 'false');
  }, [enabled]);

  const sendTokenToBackend = async (token: string|null, notifiable: boolean) => {
    try {
      await axiosCustom({
        url: '/app-tokens/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          push_token: token,
          push_provider: 'fcm',
          notifiable,
        },
      });
    } catch (e) {
      console.error('Błąd podczas wysyłania tokenu do backendu:', e);
    }
  };

  const requestPermission = async () => {
    setIsLoading(true);
    try {
      console.log('Requesting notification permission...');
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const messaging = getMessaging();
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string;
        let currentToken = localStorage.getItem(NOTIFICATION_TOKEN);

        if (!currentToken) {
          currentToken = await getToken(messaging, { vapidKey });
          if (currentToken) {
            localStorage.setItem(NOTIFICATION_TOKEN, currentToken);
          }
        }

        if (currentToken) {
          setEnabled(true);
          await sendTokenToBackend(currentToken, true);
          console.log('Token FCM:', currentToken);
        } else {
          setEnabled(false);
          localStorage.removeItem(NOTIFICATION_TOKEN);
          console.log('Nie udało się uzyskać tokenu. Może być konieczne poproszenie o ponowne uprawnienia.');
        }
      } else {
        setEnabled(false);
        console.log('Odmowa dostępu do powiadomień.');
      }
    } catch (error) {
      setEnabled(false);
      console.error('Błąd podczas żądania uprawnień:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disableNotifications = async () => {
    setIsLoading(true);
    try {
      const messaging = getMessaging();
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string;
      const currentToken = localStorage.getItem(NOTIFICATION_TOKEN) ?? await getToken(messaging, { vapidKey });

      if (currentToken) {
        await deleteToken(messaging);
        setEnabled(false);
        await sendTokenToBackend(null, false);
        console.log('Powiadomienia wyłączone, token usunięty:', currentToken);
      } else {
        setEnabled(false);
        localStorage.removeItem(NOTIFICATION_TOKEN);
        console.log('Brak tokenu do usunięcia.');
      }
    } catch (error) {
      console.error('Błąd podczas wyłączania powiadomień:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip title={enabled ? "Wyłącz powiadomienia" : "Włącz powiadomienia"}>
      <Fab
        color={enabled ? "success" : "primary"}
        aria-label={enabled ? "notifications-off" : "notifications"}
        /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
        onClick={enabled ? disableNotifications : requestPermission}
        disabled={isLoading}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        {enabled ? <NotificationsOffIcon /> : <NotificationsIcon />}
      </Fab>
    </Tooltip>
  );
};

export default NotificationButton;
