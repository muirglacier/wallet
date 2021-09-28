import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { PermissionStatus } from 'expo-modules-core'
import { AppNotificationTypesI, NotificationPersistence, NotificationType } from '@api/persistence/notifiction_storage'

export interface SendNotificationData {
  title: string
  body: string
  type: NotificationType
  data?: { [key: string]: string | object }
}

/**
 * Wallet push notification implementation light wallet
 */
class NotificationsService {
  status?: PermissionStatus
  allowedNotificationTypes: NotificationType[] = []

   /**
   * Register notifications permission for app.
   */
  async register (): Promise<void> {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      })
    })

    // Set initial allowed notification type preferance
    const networkPreferances = await NotificationPersistence.get()
    if (networkPreferances?.length !== 0) {
      this.setAllowedNotificationTypes(networkPreferances)
    }

    if (Platform.OS !== 'web') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== PermissionStatus.GRANTED) {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowAnnouncements: true
          }
        })
        finalStatus = status
      }

      this.status = finalStatus
      if (finalStatus !== PermissionStatus.GRANTED) {
        return
      }
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          sound: null
        })
      }
    }
  }

  /**
   * Set allowed notifications type in the app.
   * @param {NotificationType []} notificationTypes
   */
  setAllowedNotificationTypes (notificationTypes?: AppNotificationTypesI[]): void {
    this.allowedNotificationTypes = (notificationTypes ?? []).reduce<NotificationType []>((final, current: AppNotificationTypesI) => {
      if (current.value) {
        final.push(current.type)
      }
      return final
    }, [])
  }

  /**
   * Send notifications for app.
   * @param {string} title
   * @param {string} body
   * @param {{ key: string]: unknown }} data
   */
  async send ({ type, title, body, data = {} }: SendNotificationData): Promise<void> {
    if (this.status === PermissionStatus.GRANTED && this.allowedNotificationTypes.includes(type)) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data
        },
        trigger: null
      })
    }
  }
}

export const WalletNotifications = new NotificationsService()
