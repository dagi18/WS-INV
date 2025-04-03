<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <v-card class="dashboard-card">
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-grey text-body-2">Total Products</div>
            <v-icon color="warning" size="24">mdi-package-variant</v-icon>
          </div>
          <div class="text-h4 font-weight-bold">{{ totalProducts }}</div>
          <div class="mt-2 text-caption text-grey">
            <v-icon size="16" color="success" class="mr-1">mdi-trending-up</v-icon>
            <span class="text-success font-weight-medium">+{{ newProducts }}</span> new this month
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="dashboard-card">
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-grey text-body-2">Categories</div>
            <v-icon color="info" size="24">mdi-shape</v-icon>
          </div>
          <div class="text-h4 font-weight-bold">{{ totalCategories }}</div>
          <div class="mt-2 text-caption text-grey">
            Across {{ totalVendors }} vendors
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="dashboard-card">
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-grey text-body-2">Low Stock Items</div>
            <v-icon color="error" size="24">mdi-alert-circle</v-icon>
          </div>
          <div class="text-h4 font-weight-bold">{{ lowStockItems }}</div>
          <div class="mt-2 text-caption text-grey">
            <span class="text-error font-weight-medium">{{ criticalStockItems }}</span> items critically low
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="dashboard-card">
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="text-grey text-body-2">Pending Orders</div>
            <v-icon color="primary" size="24">mdi-cart</v-icon>
          </div>
          <div class="text-h4 font-weight-bold">{{ pendingOrders }}</div>
          <div class="mt-2 text-caption text-grey">
            Total value: <span class="font-weight-medium">${{ orderValue.toLocaleString() }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'

// Import products data
const products = [
  {
    name: 'UISP airMAX NanoStation 5AC Loco',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'NS-5ACL-US',
    sku: 'MACONLY',
    image: '/products/nanostation.png',
    stock: 5,
    minStock: 10,
    price: 89.99
  },
  {
    name: 'UISP Fiber NanoG',
    category: 'Fiber Optics',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'UF-NANO',
    sku: 'UF-NANO',
    image: '/products/nanog.png',
    stock: 12,
    minStock: 8,
    price: 149.99
  },
  // ... other products with stock and price data
]

// Computed statistics
const totalProducts = computed(() => products.length)
const newProducts = computed(() => 5) // This would come from your API with actual new products count

const totalCategories = computed(() => {
  return new Set(products.map(p => p.category)).size
})

const totalVendors = computed(() => {
  return new Set(products.map(p => p.vendor)).size
})

const lowStockItems = computed(() => {
  return products.filter(p => p.stock < p.minStock).length
})

const criticalStockItems = computed(() => {
  return products.filter(p => p.stock <= p.minStock / 2).length
})

// Mock data for orders (would come from your API)
const pendingOrders = computed(() => 8)
const orderValue = computed(() => 12459.99)
</script>

<style scoped>
.dashboard-card {
  border: 1px solid #eee !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}
</style> 