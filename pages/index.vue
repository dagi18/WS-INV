<template>
  <div class="dashboard-container">
    <!-- Statistics Cards -->
    <v-container fluid class="px-0">
      <v-row class="mt-2" no-gutters>
        <!-- Total Products -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            elevation="0"
            @click="navigateTo('/products')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="text-subtitle-1 mb-2">Total Products</div>
                <div class="d-flex flex-column">
                  <span class="text-h4 font-weight-bold mb-1">{{ totalProducts }}</span>
                  <span class="text-success text-caption">{{ productsGrowth }}% this month</span>
                </div>
              </div>
              <v-avatar
                color="warning"
                size="42"
                class="rounded-circle"
              >
                <v-icon color="white" size="24">mdi-package-variant</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>

        <!-- Pending Requests -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            elevation="0"
            @click="navigateTo('/device-requests')"
          >
            <div class="d-flex align-center justify-space-between h-100">
  <div>
                <div class="text-subtitle-1 mb-2">Pending Requests</div>
                <div class="d-flex flex-column">
                  <span class="text-h4 font-weight-bold mb-1">{{ pendingRequests }}</span>
                  <span class="text-error text-caption">{{ requestsGrowth }}% vs last month</span>
                </div>
              </div>
              <v-avatar
                color="primary"
                size="42"
                class="rounded-circle"
              >
                <v-icon color="white" size="24">mdi-clipboard-text-clock</v-icon>
              </v-avatar>
            </div>
        </v-card>
      </v-col>

        <!-- Pending Transfers -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            elevation="0"
            @click="navigateTo('/transfer-requests')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="text-subtitle-1 mb-2">Pending Transfers</div>
                <div class="d-flex flex-column">
                  <span class="text-h4 font-weight-bold mb-1">11</span>
                  <span class="text-success text-caption">+3% vs. last month</span>
                </div>
              </div>
              <v-avatar
                color="purple"
                size="42"
                class="rounded-circle"
              >
                <v-icon color="white" size="24">mdi-transfer</v-icon>
              </v-avatar>
            </div>
        </v-card>
      </v-col>

        <!-- Low Stock Items -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            elevation="0"
            @click="navigateTo('/low-stock')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="text-subtitle-1 mb-2">Low Stock Items</div>
                <div class="d-flex flex-column">
                  <span class="text-h4 font-weight-bold mb-1">3</span>
                  <span class="text-error text-caption">-20% vs. last month</span>
                </div>
              </div>
              <v-avatar
                color="error"
                size="42"
                class="rounded-circle"
              >
                <v-icon color="white" size="24">mdi-alert</v-icon>
              </v-avatar>
            </div>
        </v-card>
      </v-col>

        <!-- Incomplete Declarations -->
        <v-col cols="2.4" class="px-1">
          <v-card 
            class="rounded-lg pa-4 stat-card" 
            elevation="0"
            @click="navigateTo('/declarations')"
          >
            <div class="d-flex align-center justify-space-between h-100">
              <div>
                <div class="text-subtitle-1 mb-2">Incomplete Declarations</div>
                <div class="d-flex flex-column">
                  <span class="text-h4 font-weight-bold mb-1">5</span>
                  <span class="text-success text-caption">+2 new</span>
                </div>
              </div>
              <v-avatar
                color="orange"
                size="42"
                class="rounded-circle"
              >
                <v-icon color="white" size="24">mdi-file-document-alert</v-icon>
              </v-avatar>
            </div>
        </v-card>
      </v-col>
    </v-row>
    </v-container>

    <!-- Main Content Area -->
    <v-row class="mt-6">
      <!-- Left Column -->
      <v-col cols="12" md="8">
        <!-- Recent Stock -->
        <v-card class="mb-6">
          <v-card-title class="d-flex justify-space-between align-center px-6">
            <span>Recent Stock</span>
            <v-btn
              variant="text"
              color="warning"
              class="text-none"
            >
              See all →
            </v-btn>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>Batch No.</th>
                <th>Product</th>
                <th>Batch Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in recentStock" :key="item.batchNo">
                <td>{{ item.batchNo }}</td>
                <td>
                  <div class="d-flex align-center">
                    <v-avatar size="32" class="bg-grey-lighten-3 mr-2"></v-avatar>
                    {{ item.product }}
                  </div>
                </td>
                <td>{{ item.batchCode }}</td>
                <td>
                  <v-btn
                    color="black"
                    size="small"
                    variant="flat"
                  >
                    More
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <!-- Your Devices -->
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center px-6">
            <span>Your Devices</span>
            <v-btn
              variant="text"
              color="warning"
              class="text-none"
            >
              View all →
            </v-btn>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Product</th>
                <th>Status</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TP-LINK</td>
                <td>
                  <div class="d-flex align-center">
                    <v-icon size="small" class="mr-2">mdi-router-wireless</v-icon>
                    3G/4G WIRELESS N ROUTER
                  </div>
                </td>
                <td>
                  <v-chip
                    size="small"
                    color="success"
                    variant="flat"
                  >
                    Store
                  </v-chip>
                </td>
                <td>BloomTech</td>
                <td>
                  <v-btn
                    color="black"
                    size="small"
                    variant="flat"
                  >
                    Request
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <!-- Right Column -->
      <v-col cols="12" md="4">
        <!-- Inventory Summary -->
        <v-card class="mb-6">
          <v-card-title>Inventory Summary</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Network Devices</span>
                <span>425 units</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="70"
              ></v-progress-linear>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Accessories</span>
                <span>312 units</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="50"
              ></v-progress-linear>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Cables</span>
                <span>215 units</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="35"
              ></v-progress-linear>
            </div>

            <div>
              <div class="d-flex justify-space-between mb-1">
                <span>Other Hardware</span>
                <span>112 units</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="20"
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>

    <!-- Quick Actions -->
        <v-card>
          <v-card-title>Quick Actions</v-card-title>
          <v-card-text>
            <v-row>
            <v-col cols="6">
                <v-btn
                  block
                color="warning"
                variant="flat"
                  prepend-icon="mdi-plus"
              >
                Add Products
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="warning"
                variant="outlined"
                prepend-icon="mdi-clipboard-text"
              >
                New Tally
                </v-btn>
              </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col cols="6">
                <v-btn
                  block
                color="warning"
                variant="outlined"
                prepend-icon="mdi-store"
              >
                Create Store
                </v-btn>
              </v-col>
            <v-col cols="6">
                <v-btn
                  block
                color="warning"
                variant="outlined"
                prepend-icon="mdi-account-group"
              >
                Add Vendors
                </v-btn>
              </v-col>
          </v-row>
          <v-row class="mt-2">
            <v-col cols="12">
                <v-btn
                  block
                color="warning"
                variant="outlined"
                prepend-icon="mdi-domain"
              >
                Create Facilities
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      <RecentActivities />
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
</script>

<style scoped>
.v-card {
  border: 1px solid #eee !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s ease;
}

.stat-card {
  cursor: pointer;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.text-h4 {
  font-size: 2rem !important;
  line-height: 1.2 !important;
}

.text-subtitle-1 {
  color: #4B5563 !important;
  font-weight: 500 !important;
}

.text-caption {
  font-size: 0.75rem !important;
  font-weight: 500 !important;
}

.text-success {
  color: #22C55E !important;
}

.text-error {
  color: #EF4444 !important;
}

.v-avatar {
  border: 4px solid rgba(255, 255, 255, 0.1);
}

.rounded-circle {
  border-radius: 9999px !important;
}

/* Ensure flex layout works properly */
.v-row {
  display: flex;
  flex-wrap: wrap;
}

.v-col {
  display: flex;
}

.dashboard-container {
  width: 75%;
  margin: 0 auto;
}
</style>