<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="rail ? '' : 'ISP Inventory'"
        :subtitle="rail ? '' : 'Management System'"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="rail ? '' : item.text"
          :subtitle="rail ? '' : item.description"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-title>ISP Inventory Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="page-container">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)

const items = [
  {
    text: 'Dashboard',
    description: 'System overview',
    icon: 'mdi-view-dashboard',
    to: '/'
  },
  {
    text: 'Products',
    description: 'Manage products',
    icon: 'mdi-package-variant-closed',
    to: '/products'
  },
  {
    text: 'Devices',
    description: 'Device management',
    icon: 'mdi-devices',
    to: '/devices'
  },
  {
    text: 'Your Devices',
    description: 'Your assigned devices',
    icon: 'mdi-laptop',
    to: '/your-devices'
  },
  {
    text: 'Device Requests',
    description: 'Manage device requests',
    icon: 'mdi-clipboard-text-clock',
    to: '/device-requests'
  },
  {
    text: 'Transfer Requests',
    description: 'Manage transfer requests',
    icon: 'mdi-transfer',
    to: '/transfer-requests'
  },
  {
    text: 'Facilities',
    description: 'Manage facilities',
    icon: 'mdi-domain',
    to: '/facilities'
  },
  {
    text: 'Vendors',
    description: 'Manage vendors',
    icon: 'mdi-truck-delivery',
    to: '/vendors'
  },
  {
    text: 'Batches',
    description: 'Manage batches',
    icon: 'mdi-package-variant',
    to: '/batches'
  },
  {
    text: 'Stores',
    description: 'Manage stores',
    icon: 'mdi-store',
    to: '/stores'
  },
  {
    text: 'Anomalies',
    description: 'View anomalies',
    icon: 'mdi-alert-circle',
    to: '/anomalies'
  },
  {
    text: 'Tally',
    description: 'Stock tally',
    icon: 'mdi-calculator',
    to: '/tally'
  },
  {
    text: 'Reports',
    description: 'View reports',
    icon: 'mdi-chart-box',
    to: '/reports'
  }
]
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Roboto:wght@400&display=swap');

:root {
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Roboto', sans-serif;
}

.v-application {
  font-family: var(--font-body) !important;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading) !important;
  font-weight: 600 !important;
}

.page-container {
  width: 80%;
  margin: 2rem auto;
  max-width: 1600px;
}

.v-navigation-drawer {
  border-right: 1px solid #e2e8f0;
}

.v-list-item--active {
  background: #f4d609 !important;
  color: #000000 !important;
}

.v-list-item--active:hover {
  background: #f4d609 !important;
}
</style> 