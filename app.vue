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
        ></v-list-item>
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
      <v-container fluid class="pa-8">
        <div class="d-flex justify-space-between align-center mb-8">
          <div>
            <h1 v-if="route.path === '/'" class="text-h4 font-weight-bold text-yellow-darken-3">DASHBOARD</h1>
            <div v-if="route.path === '/'" class="text-grey text-body-2">Overview</div>
          </div>
          <div class="d-flex align-center">
            <v-badge
              dot
              color="error"
              location="top end"
              offset-x="2"
              offset-y="2"
              class="mr-6"
            >
              <v-icon size="24" color="black">mdi-bell-outline</v-icon>
            </v-badge>
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

const route = useRoute()
const drawer = ref(true)
const rail = ref(false)
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
</style>
