<template>
  <v-app>
    <!-- Left Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      color="black"
      :width="280"
      theme="dark"
      class="sidebar-gradient"
    >
      <div class="d-flex align-center py-3" :class="{'px-4': !rail, 'px-2': rail}">
        <v-list-item
          prepend-icon="mdi-cube-outline"
          :title="!rail ? 'Inventory Hub' : ''"
          class="text-warning app-title pa-0"
        />
      </div>

      <v-list nav class="px-2 sidebar-list">
        <v-list-subheader :class="{'d-none': rail}" class="text-white text-uppercase overline mb-2">
          Inventory Items
        </v-list-subheader>
        
        <v-list-item
          prepend-icon="mdi-home"
          :title="!rail ? 'Home' : ''"
          value="home"
          to="/"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/'"
          active-color="warning"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-devices"
          :title="!rail ? 'Devices' : ''"
          value="devices"
          to="/devices"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/devices'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-domain"
          :title="!rail ? 'Facilities' : ''"
          value="facilities"
          to="/facilities"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/facilities'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-account-group"
          :title="!rail ? 'Vendors' : ''"
          value="vendors"
          to="/vendors"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/vendors'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-package-variant-closed"
          :title="!rail ? 'Products' : ''"
          value="products"
          to="/products"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/products'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-package-variant"
          :title="!rail ? 'Batches' : ''"
          value="batches"
          to="/batches"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/batches'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-store"
          :title="!rail ? 'Stores' : ''"
          value="stores"
          to="/stores"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/stores'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-alert-circle"
          :title="!rail ? 'Anomalies' : ''"
          value="anomalies"
          to="/anomalies"
          class="mb-4 text-white rounded-lg"
          :active="route.path === '/anomalies'"
          active-color="warning"
        ></v-list-item>

        <v-list-subheader :class="{'d-none': rail}" class="text-white text-uppercase overline mb-2">Inventory Tally</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-clipboard-text"
          :title="!rail ? 'Tally' : ''"
          value="tally"
          to="/tally"
          class="mb-4 text-white rounded-lg"
          :active="route.path === '/tally'"
          active-color="warning"
        ></v-list-item>

        <v-list-subheader :class="{'d-none': rail}" class="text-white text-uppercase overline mb-2">Requests</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-devices"
          :title="!rail ? 'Device Requests' : ''"
          value="device-requests"
          to="/device-requests"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/device-requests'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-transfer"
          :title="!rail ? 'Transfer Requests' : ''"
          value="transfer-requests"
          to="/transfer-requests"
          class="mb-4 text-white rounded-lg"
          :active="route.path === '/transfer-requests'"
          active-color="warning"
        ></v-list-item>

        <v-list-subheader :class="{'d-none': rail}" class="text-white text-uppercase overline mb-2">Declaration Documents</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-file-document"
          :title="!rail ? 'Declarations' : ''"
          value="declarations"
          to="/declarations"
          class="mb-4 text-white rounded-lg"
          :active="route.path === '/declarations'"
          active-color="warning"
        ></v-list-item>

        <v-list-subheader :class="{'d-none': rail}" class="text-white text-uppercase overline mb-2">Partner Eligibility</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-check-circle"
          :title="!rail ? 'Eligibility' : ''"
          value="eligibility"
          to="/eligibility"
          class="mb-4 text-white rounded-lg"
          :active="route.path === '/eligibility'"
          active-color="warning"
        ></v-list-item>

        <v-list-subheader :class="{'d-none': rail}" class="text-white text-uppercase overline mb-2">Reports</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-file-chart"
          :title="!rail ? 'Reports' : ''"
          value="reports"
          to="/reports"
          class="mb-1 text-white rounded-lg"
          :active="route.path === '/reports'"
          active-color="warning"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-clock-outline"
          :title="!rail ? 'Activity' : ''"
          value="activity"
          to="/activity"
          class="mb-4 text-white rounded-lg"
          :active="route.path === '/activity'"
          active-color="warning"
        ></v-list-item>
      </v-list>

      <!-- Fixed toggle button at the bottom -->
      <div class="toggle-btn-wrapper" :class="{'rail-mode': rail}">
        <v-btn
          variant="text"
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          size="small"
          color="warning"
          @click.stop="rail = !rail"
        ></v-btn>
      </div>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-4">
      <v-container 
        fluid 
        class="pa-8" 
        :class="{'max-width-80': route.path !== '/'}"
      >
        <div class="d-flex justify-space-between align-center mb-8">
          <div>
            <h1 v-if="route.path === '/'" class="text-h4 font-weight-bold text-yellow-darken-3">DASHBOARD</h1>
            <div v-if="route.path === '/'" class="text-grey text-body-2">Overview</div>
          </div>
          <div class="d-flex align-center">
            <v-menu
              location="bottom end"
              offset="10"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-badge
                  :content="unreadCount"
                  color="error"
                  location="top end"
                  offset-x="2"
                  offset-y="2"
                  class="mr-6 cursor-pointer"
                  v-bind="props"
                >
                  <v-icon size="24" color="black">mdi-bell-outline</v-icon>
                </v-badge>
              </template>

              <v-card width="400" class="notification-card">
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                  <div class="d-flex align-center">
                    <v-icon color="warning" class="mr-2">mdi-bell-ring</v-icon>
                    <span class="text-h6">Notifications</span>
                  </div>
                  <v-btn
                    v-if="unreadCount > 0"
                    variant="text"
                    size="small"
                    color="warning"
                    class="text-none"
                    @click="markAllAsRead"
                  >
                    <v-icon start>mdi-check-all</v-icon>
                    Mark all as read
                  </v-btn>
                </v-card-title>

                <v-divider class="mx-4"></v-divider>

                <v-list class="notification-list">
                  <v-list-item
                    v-for="notification in notifications"
                    :key="notification.id"
                    :class="{ 'notification-unread': !notification.read }"
                    @click="markAsRead(notification.id)"
                    class="notification-item"
                  >
                    <template v-slot:prepend>
                      <div class="notification-icon-wrapper">
                        <v-icon
                          :color="getNotificationColor(notification.type)"
                          size="large"
                        >
                          {{ getNotificationIcon(notification.type) }}
                        </v-icon>
                      </div>
                    </template>

                    <div class="notification-content">
                      <div class="d-flex align-center">
                        <v-list-item-title class="font-weight-medium text-body-1">
                          {{ notification.title }}
                        </v-list-item-title>
                        <v-chip
                          v-if="!notification.read"
                          size="x-small"
                          color="warning"
                          class="ml-2"
                        >
                          New
                        </v-chip>
                      </div>
                      <v-list-item-subtitle class="text-body-2 mt-1">
                        {{ notification.message }}
                      </v-list-item-subtitle>
                      <div class="d-flex align-center mt-2">
                        <v-icon size="small" color="grey" class="mr-1">mdi-clock-outline</v-icon>
                        <span class="text-caption text-grey">
                          {{ formatDate(notification.timestamp) }}
                        </span>
                      </div>
                    </div>
                  </v-list-item>

                  <v-list-item v-if="notifications.length === 0" class="notification-empty">
                    <v-list-item-title class="text-center text-grey">
                      <v-icon size="large" color="grey" class="mb-2">mdi-bell-off</v-icon>
                      <div>No notifications</div>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
            <v-avatar class="mr-3" color="warning" size="36">
              <span class="text-body-2">AT</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-2 font-weight-medium">Abraham Tibebu</div>
              <div class="text-caption text-grey-darken-1">abraham.tibebu@websprix.com</div>
            </div>
            <v-icon class="ml-2" color="black" size="20">mdi-chevron-down</v-icon>
          </div>
        </div>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useNotifications } from './composables/useNotifications'

const route = useRoute()
const drawer = ref(true)
const rail = ref(false)
const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

const getNotificationColor = (type) => {
  switch (type) {
    case 'info': return 'info'
    case 'warning': return 'warning'
    case 'error': return 'error'
    case 'success': return 'success'
    default: return 'grey'
  }
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'info': return 'mdi-information'
    case 'warning': return 'mdi-alert'
    case 'error': return 'mdi-alert-circle'
    case 'success': return 'mdi-check-circle'
    default: return 'mdi-bell'
  }
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date)
}
</script>

<style>
.sidebar-gradient {
  background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%) !important;
  border-right: none !important;
}

.app-title {
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
}

.v-list {
  --v-list-padding: 16px;
}

.v-list-item {
  margin-bottom: 4px !important;
  transition: all 0.3s ease !important;
  border-radius: 8px !important;
  min-height: 44px !important;
}

.v-list-item--active {
  background: linear-gradient(90deg, rgba(255, 212, 59, 0.15) 0%, rgba(255, 212, 59, 0.05) 100%) !important;
  backdrop-filter: blur(8px) !important;
}

.v-list-item--active .v-list-item-title {
  color: #FFD43B !important;
  font-weight: 500 !important;
}

.v-list-item--active .v-icon {
  color: #FFD43B !important;
}

.v-list-item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  transform: translateX(4px);
}

.v-list-subheader {
  font-size: 0.7rem !important;
  letter-spacing: 0.15em !important;
  opacity: 0.7;
  font-weight: 500 !important;
  padding: 0 12px !important;
  min-height: 36px !important;
}

.text-white {
  color: white !important;
}

/* Improved typography */
.text-h4 {
  letter-spacing: -0.5px !important;
}

.text-subtitle-2 {
  letter-spacing: 0.1px !important;
}

/* Smooth transitions */
.v-list-item__prepend > .v-icon {
  transition: transform 0.3s ease;
}

.v-list-item:hover .v-list-item__prepend > .v-icon {
  transform: scale(1.1);
}

.rotate-180 {
  transform: rotate(180deg);
}

.v-navigation-drawer--rail {
  width: 64px !important;
}

.v-navigation-drawer--rail .v-list-item {
  padding-inline-start: 12px !important;
  padding-inline-end: 12px !important;
  justify-content: center;
}

.v-navigation-drawer--rail .v-list-item__prepend {
  margin-inline-end: 0 !important;
}

.v-navigation-drawer--rail .v-list-item-title {
  display: none !important;
}

.v-navigation-drawer--rail .app-title {
  justify-content: center;
  padding: 0 !important;
}

.v-navigation-drawer--rail .app-title .v-list-item__prepend {
  margin-inline-end: 0 !important;
}

.v-navigation-drawer--rail .v-list {
  padding-top: 8px !important;
}

/* Smooth transitions for rail mode */
.v-navigation-drawer {
  transition: width 0.3s ease-out !important;
}

.v-list-item {
  transition: all 0.3s ease !important;
}

.v-list-item__prepend {
  transition: margin 0.3s ease !important;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.v-btn--icon.v-btn--density-default {
  width: 32px;
  height: 32px;
}

/* Remove scrollbar and adjust list height */
.sidebar-list {
  height: calc(100% - 120px) !important;
  overflow-y: auto !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

.sidebar-list::-webkit-scrollbar {
  display: none !important;
}

/* Fixed toggle button styling */
.toggle-btn-wrapper {
  position: fixed;
  bottom: 20px;
  left: 224px;
  z-index: 100;
  transition: all 0.3s ease;
}

.toggle-btn-wrapper.rail-mode {
  left: 8px;
}

/* Adjust navigation drawer padding */
.v-navigation-drawer {
  padding-bottom: 64px !important;
}

.notification-card {
  max-height: 500px;
  overflow-y: auto;
  border-radius: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%) !important;
}

.notification-list {
  padding: 8px;
}

.notification-item {
  border-radius: 8px !important;
  margin-bottom: 8px !important;
  transition: all 0.2s ease !important;
  padding: 12px !important;
}

.notification-item:hover {
  background: linear-gradient(90deg, rgba(255, 212, 59, 0.15) 0%, rgba(255, 212, 59, 0.05) 100%) !important;
  transform: translateX(4px);
}

.notification-unread {
  background: linear-gradient(90deg, rgba(255, 212, 59, 0.1) 0%, rgba(255, 212, 59, 0.05) 100%) !important;
  border-left: 3px solid #FFD43B !important;
}

.notification-icon-wrapper {
  background: linear-gradient(135deg, rgba(255, 212, 59, 0.2) 0%, rgba(255, 212, 59, 0.1) 100%);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.notification-content {
  flex: 1;
}

.notification-empty {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Custom scrollbar for notification card */
.notification-card::-webkit-scrollbar {
  width: 6px;
}

.notification-card::-webkit-scrollbar-track {
  background: transparent;
}

.notification-card::-webkit-scrollbar-thumb {
  background-color: rgba(255, 212, 59, 0.3);
  border-radius: 3px;
}

.notification-card::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 212, 59, 0.5);
}

/* Modern chip style */
.v-chip {
  border-radius: 4px !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
  background: linear-gradient(135deg, #FFD43B 0%, #FFC107 100%) !important;
  color: black !important;
}

/* Modern divider style */
.v-divider {
  opacity: 0.1;
}

.cursor-pointer {
  cursor: pointer;
}

.max-width-80 {
  max-width: 80% !important;
  margin: 0 auto !important;
}
</style>
