<template>
  <div class="dashboard-container">
    <!-- Header Section -->

    <!-- Statistics Cards -->
    <v-container fluid class="px-0">
      <v-row class="mt-2" no-gutters>
        <!-- Total Devices -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            flat
            height="150px"
            @click="navigateTo('../products/index.vue')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="subtitle-1 mb-2 grey--text text--darken-1">Total Devices</div>
                <div class="d-flex flex-column">
                  <span class="display-2 font-weight-bold mb-1">{{ totalProducts }}</span>
                  <span class="success--text caption font-weight-medium">
                    <v-icon small class="mr-1">mdi-trending-up</v-icon>
                    +10% vs. last month
                  </span>
                </div>
              </div>
              <v-avatar
                color="warning"
                size="48"
                class="rounded-circle elevation-2"
              >
                <v-icon color="white" size="28">mdi-package-variant</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <!-- Pending Requests -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            flat
            height="150px"
            @click="navigateTo('../device-requests/index.vue')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="subtitle-1 mb-2 grey--text text--darken-1">Pending Requests</div>
                <div class="d-flex flex-column">
                  <span class="display-2 font-weight-bold mb-1">8</span>
                  <span class="error--text caption font-weight-medium">
                    <v-icon small class="mr-1">mdi-trending-down</v-icon>
                    -5% vs. last month
                  </span>
                </div>
              </div>
              <v-avatar
                color="primary"
                size="48"
                class="rounded-circle elevation-2"
              >
                <v-icon color="white" size="28">mdi-clipboard-text-clock</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <!-- Pending Transfers -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            flat
            height="150px"
            @click="navigateTo('/transfer-requests')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="subtitle-1 mb-2 grey--text text--darken-1">Pending Transfers</div>
                <div class="d-flex flex-column">
                  <span class="display-2 font-weight-bold mb-1">11</span>
                  <span class="success--text caption font-weight-medium">
                    <v-icon small class="mr-1">mdi-trending-up</v-icon>
                    +3% vs. last month
                  </span>
                </div>
              </div>
              <v-avatar
                color="purple"
                size="48"
                class="rounded-circle elevation-2"
              >
                <v-icon color="white" size="28">mdi-transfer</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <!-- Low Stock Items -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            flat
            height="150px"
            @click="navigateTo('/low-stock')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="subtitle-1 mb-2 grey--text text--darken-1">Low Stock Items</div>
                <div class="d-flex flex-column">
                  <span class="display-2 font-weight-bold mb-1">3</span>
                  <span class="error--text caption font-weight-medium">
                    <v-icon small class="mr-1">mdi-trending-down</v-icon>
                    -20% vs. last month
                  </span>
                </div>
              </div>
              <v-avatar
                color="error"
                size="48"
                class="rounded-circle elevation-2"
              >
                <v-icon color="white" size="28">mdi-alert</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <!-- Incomplete Declarations -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            flat
            height="150px"
            @click="navigateTo('/declarations')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="subtitle-1 mb-2 grey--text text--darken-1">Incomplete Declarations</div>
                <div class="d-flex flex-column">
                  <span class="display-2 font-weight-bold mb-1">5</span>
                  <span class="success--text caption font-weight-medium">
                    <v-icon small class="mr-1">mdi-plus</v-icon>
                    +2 new
                  </span>
                </div>
              </div>
              <v-avatar
                color="orange"
                size="48"
                class="rounded-circle elevation-2"
              >
                <v-icon color="white" size="28">mdi-file-document-alert</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Main Content Area -->
    <v-row class="mt-8">
      <!-- Left Column -->
      <v-col cols="12" md="8">
        <!-- Recent Stock -->
        <v-card class="mb-6 rounded-lg" flat>
          <v-card-title class="d-flex justify-space-between align-center px-6 py-4">
            <div>
              <span class="headline font-weight-bold">Recent Stock</span>
              <p class="subtitle-1 grey--text mb-0">Latest inventory updates</p>
            </div>
            <v-btn
              text
              color="warning"
              class="text-none"
              @click="navigateTo('/products')"
            >
              See all
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="stockHeaders"
            :items="recentStock"
            :items-per-page="5"
            class="elevation-0"
            hide-default-footer
          >
            <template v-slot:item.product="{ item }">
              <div class="d-flex align-center">
                <v-avatar size="40" class="grey lighten-3 mr-3">
                  <v-icon color="grey">mdi-package-variant</v-icon>
                </v-avatar>
                <div>
                  <div class="subtitle-1 font-weight-medium">{{ item.product }}</div>
                  <div class="caption grey--text">{{ item.batchCode }}</div>
                </div>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="warning"
                small
                class="text-none"
                @click="navigateToProduct(item.product)"
              >
                More
                <v-icon right small>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <!-- Your Devices -->
        <v-card class="rounded-lg" flat>
          <v-card-title class="d-flex justify-space-between align-center px-6 py-4">
            <div>
              <span class="headline font-weight-bold">Your Devices</span>
              <p class="subtitle-1 grey--text mb-0">Currently assigned equipment</p>
            </div>
            <v-btn
              text
              color="warning"
              class="text-none"
              @click="navigateTo('/your-devices')"
            >
              View all
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="deviceHeaders"
            :items="yourDevices"
            :items-per-page="5"
            class="elevation-0"
            hide-default-footer
          >
            <template v-slot:item.product="{ item }">
              <div class="d-flex align-center">
                <v-avatar size="40" class="primary lighten-3 mr-3">
                  <v-icon color="primary">mdi-router-wireless</v-icon>
                </v-avatar>
                <div>
                  <div class="subtitle-1 font-weight-medium">{{ item.product }}</div>
                  <div class="caption grey--text">{{ item.vendor }}</div>
                </div>
              </div>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                small
                :color="item.status === 'Store' ? 'success' : 'warning'"
                class="white--text font-weight-medium"
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="warning"
                small
                class="text-none"
                @click="requestDevice(item)"
              >
                Request
                <v-icon right small>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <!-- Recent Activity -->
        <v-card class="rounded-lg" flat>
          <v-card-title class="d-flex justify-space-between align-center px-6 py-4">
            <div>
              <span class="headline font-weight-bold">Recent Activity</span>
            </div>
            <v-btn
              text
              color="warning"
              class="text-none"
              @click="navigateTo('/activity')"
            >
              View all
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-4">
            <v-list>
              <v-list-item v-for="(activity, index) in recentActivities" :key="index">
                <v-list-item-icon>
                  <v-avatar color="yellow lighten-4" size="32">
                    <v-icon color="yellow darken-2">mdi-check-circle-outline</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">{{ activity.title }}</v-list-item-title>
                  <v-list-item-subtitle class="grey--text">{{ activity.description }}</v-list-item-subtitle>
                  <v-list-item-subtitle class="grey--text">By {{ activity.user }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="caption grey--text">{{ activity.time }}</span>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Column -->
      <v-col cols="12" md="4">
        <!-- Inventory Summary -->
        <v-card class="mb-6 rounded-lg" flat>
          <v-card-title class="px-6 py-4">
            <div>
              <span class="headline font-weight-bold">Inventory Summary</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium">Network Devices</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="caption grey--text">425 units</span>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium">Accessories</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="caption grey--text">312 units</span>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium">Cables</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="caption grey--text">215 units</span>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium">Other Hardware</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <span class="caption grey--text">112 units</span>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Quick Actions -->
        <v-card class="rounded-lg" flat>
          <v-card-title class="px-6 py-4">
            <div>
              <span class="headline font-weight-bold">Quick Actions</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-list>
              <v-list-item
                v-for="(action, i) in quickActions"
                :key="i"
                @click="handleQuickAction(action)"
                class="px-6"
              >
                <v-list-item-icon class="mr-4">
                  <v-avatar
                    :color="action.color"
                    size="40"
                    class="elevation-2"
                  >
                    <v-icon color="white" size="24">{{ action.icon }}</v-icon>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium">{{ action.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon color="grey">mdi-chevron-right</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RecentActivities from '~/components/RecentActivities.vue'

const { navigateTo } = useRouter()

// Products data
const products = [
  {
    name: 'UISP airMAX NanoStation 5AC Loco',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'NS-5ACL-US',
    sku: 'MACONLY',
    type: 'device'
  },
  {
    name: 'UISP Fiber NanoG',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'UF-NANO',
    sku: 'UF-NANO',
    type: 'device'
  },
  {
    name: 'UISP airMAX LiteBeam 5AC Bridge GEN2',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'LBE-5AC-GEN2',
    sku: 'LBE-5AC-GEN2',
    type: 'device'
  },
  {
    name: '450Mbps Wireless N Router',
    category: 'Networking',
    vendor: 'TP-Link',
    vendorIcon: 'mdi-router-wireless',
    modelNo: 'TL-WR940N',
    sku: 'TL-WR940N',
    type: 'device'
  },
  {
    name: 'POE 24V Adapter',
    category: 'Power Supplies',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-power-plug',
    modelNo: 'POE-24-12W',
    sku: 'POE-24-12W',
    type: 'accessory'
  },
  {
    name: 'EdgeRouter X',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-router',
    modelNo: 'ER-X',
    sku: 'ER-X',
    type: 'device'
  },
  {
    name: 'UISP Fiber Loco',
    category: 'Fiber Optics',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'UF-LOCO',
    sku: 'UF-LOCO',
    type: 'device'
  },
  {
    name: 'UISP airCube ISP Access Point',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'ACB-ISP',
    sku: 'ACB-ISP',
    type: 'device'
  },
  {
    name: 'Cat6 Ethernet Cable 5m',
    category: 'Cables',
    vendor: 'Generic',
    vendorIcon: 'mdi-ethernet-cable',
    modelNo: 'CAT6-5M',
    sku: 'CAT6-5M',
    type: 'accessory'
  },
  {
    name: 'DIGITAL SM LC UPC 9/125, 1.5M',
    category: 'Fiber Optics',
    vendor: 'Generic',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'SM-LC-UPC',
    sku: 'SM-LC-UPC-1.5M',
    type: 'accessory'
  },
  {
    name: 'CABLE TRUNKING 3M',
    category: 'Cables',
    vendor: 'Generic',
    vendorIcon: 'mdi-cable-data',
    modelNo: 'TRUNKING-3M',
    sku: 'TRUNKING-3M',
    type: 'accessory'
  },
  {
    name: 'WS GPON TERMINAL',
    category: 'Networking',
    vendor: 'WS',
    vendorIcon: 'mdi-network',
    modelNo: 'GPON-TERM',
    sku: 'WS-GPON',
    type: 'device'
  },
  {
    name: 'WS FIBER PATCH CABLE 100M SC/UPC-SC/UPC',
    category: 'Fiber Optics',
    vendor: 'WS',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'FPC-100M',
    sku: 'WS-FPC-100M',
    type: 'accessory'
  },
  {
    name: 'PLANTRONICS HEADSET',
    category: 'Accessories',
    vendor: 'Plantronics',
    vendorIcon: 'mdi-headset',
    modelNo: 'PLT-HS',
    sku: 'PLT-HS-01',
    type: 'accessory'
  }
]

// Computed values for statistics
const totalProducts = products.length
const productsGrowth = computed(() => {
  // This would typically come from your API
  return '+15'
})

const pendingRequests = ref(8)
const requestsGrowth = computed(() => -5)

const recentStock = [
  {
    batchNo: '3599',
    product: 'DIGITAL SM LC UPC 9/125, 1.5M',
    batchCode: 'Digital SM LC UPC 9/125, 1.5m'
  },
  {
    batchNo: '3604',
    product: 'CABLE TRUNKING 3M',
    batchCode: 'Cable Trunking 3M'
  },
  {
    batchNo: '3607',
    product: 'WS GPON TERMINAL',
    batchCode: 'Wssssss'
  },
  {
    batchNo: '3617',
    product: 'WS FIBER PATCH CABLE 100M SC/UPC-SC/UPC',
    batchCode: '100mmm'
  },
  {
    batchNo: '3620',
    product: 'PLANTRONICS HEADSET',
    batchCode: 'Headset'
  }
]

const navigateToProduct = (productName) => {
  const product = products.find(p => p.name === productName)
  if (product) {
    navigateTo(`/products/${product.sku}`)
  }
}

// Add new function for device requests
const requestDevice = (device) => {
  navigateTo(`/device-requests/new?product=${encodeURIComponent(device.product)}&location=${encodeURIComponent(device.location)}`)
}

// Add your devices data
const yourDevices = [
  {
    vendor: 'TP-LINK',
    product: '3G/4G WIRELESS N ROUTER',
    status: 'Store',
    location: 'BloomTech'
  }
  // Add more devices as needed
]

const stockHeaders = [
  { text: 'Batch No.', value: 'batchNo' },
  { text: 'Product', value: 'product' },
  { text: 'Batch Code', value: 'batchCode' },
  { text: 'Actions', value: 'actions', sortable: false }
]

const deviceHeaders = [
  { text: 'Vendor', value: 'vendor' },
  { text: 'Product', value: 'product' },
  { text: 'Status', value: 'status' },
  { text: 'Location', value: 'location' },
  { text: 'Actions', value: 'actions', sortable: false }
]

const recentActivities = [
  {
    title: 'Added new device',
    description: 'UISP airMAX NanoStation 5AC Loco',
    user: 'Abraham Tibebu',
    time: '2 hours ago'
  },
  {
    title: 'Updated stock count',
    description: 'Fiber Patch Cable 100m',
    user: 'Kedir Yusuf',
    time: '5 hours ago'
  },
  {
    title: 'Transferred item',
    description: 'Ethernet Cable Cat6 3m',
    user: 'Dawit Tesfaye',
    time: '1 day ago'
  }
]

const quickActions = [
  {
    title: 'Add New Product',
    icon: 'mdi-plus',
    color: 'success'
  },
  {
    title: 'Request Device',
    icon: 'mdi-clipboard-text',
    color: 'primary'
  },
  {
    title: 'Transfer Request',
    icon: 'mdi-transfer',
    color: 'purple'
  }
]

const handleActivityAction = (activity) => {
  // Handle activity action
}

const handleQuickAction = (action) => {
  // Handle quick action
}
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  background-color: #f0f2f5;
}

.dashboard-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 16px;
  color: #333;
}

.stat-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  height: 150px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.v-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 16px;
}

.v-card-title {
  padding: 12px 16px !important;
}

.v-card-text {
  padding: 8px 16px !important;
}

.v-data-table {
  border-radius: 8px;
}

.v-data-table >>> thead th {
  background-color: #f0f2f5;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  color: #64748b;
  padding: 8px 16px !important;
}

.v-data-table >>> tbody td {
  padding: 8px 16px !important;
}

.v-data-table >>> tbody tr:hover {
  background-color: rgba(255, 212, 59, 0.05);
}

.v-timeline-item {
  padding: 8px 0;
}

.v-list-item {
  transition: all 0.3s ease;
  padding: 8px 16px !important;
}

.v-list-item:hover {
  background-color: rgba(255, 212, 59, 0.05);
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: #007bff;
}

.v-btn--text {
  font-weight: 500;
}

.v-chip {
  font-weight: 500;
  letter-spacing: 0.3px;
}

.v-avatar {
  transition: all 0.3s ease;
}

.v-avatar:hover {
  transform: scale(1.05);
}

.v-row {
  margin-bottom: 16px;
}

.v-list-item__content {
  padding: 4px 0 !important;
}

.v-card__title {
  padding-bottom: 8px !important;
}

.v-data-table__wrapper {
  padding: 0 8px;
}
</style>