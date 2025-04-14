import { ref } from 'vue'

export interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  timestamp: Date
  read: boolean
}

export function useNotifications() {
  const notifications = ref<Notification[]>([
    {
      id: 1,
      title: 'New Device Request',
      message: 'John Doe requested 5 new laptops for the IT department',
      type: 'info',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      message: 'Router inventory is running low. Current stock: 3 units',
      type: 'warning',
      timestamp: new Date(),
      read: false
    },
    {
      id: 3,
      title: 'Transfer Request Approved',
      message: 'Your request to transfer 10 switches has been approved',
      type: 'success',
      timestamp: new Date(),
      read: false
    }
  ])

  const unreadCount = ref(notifications.value.filter(n => !n.read).length)

  const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
      unreadCount.value = notifications.value.filter(n => !n.read).length
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
    unreadCount.value = 0
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  }
} 