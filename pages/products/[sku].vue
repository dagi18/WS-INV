<template>
  <div>
    <div v-if="loading" class="d-flex justify-center align-center" style="height: 400px;">
      <v-progress-circular indeterminate color="warning"></v-progress-circular>
    </div>

    <div v-else-if="!product" class="d-flex flex-column align-center justify-center" style="height: 400px;">
      <h1 class="text-h2 mb-4">404</h1>
      <p class="text-body-1 mb-4">Product not found</p>
      <v-btn color="warning" @click="navigateBack">Back to Products</v-btn>
    </div>

    <div v-else>
      <!-- Product Details -->
      <div class="d-flex justify-space-between align-center mb-6">
        <div class="d-flex align-center">
          <v-btn icon="mdi-arrow-left" variant="text" @click="navigateBack" class="mr-4"></v-btn>
          <h1 class="text-h4 font-weight-bold">{{ product.name }}</h1>
        </div>
        <div class="d-flex gap-2">
          <v-btn color="warning" prepend-icon="mdi-export" variant="outlined">Export</v-btn>
          <v-btn color="warning" prepend-icon="mdi-pencil" variant="outlined">Edit</v-btn>
          <v-btn color="error" prepend-icon="mdi-delete" variant="outlined">Delete</v-btn>
        </div>
      </div>

      <!-- Product Info Card -->
      <v-card class="mb-6">
        <v-card-text>
          <div class="d-flex">
            <div class="mr-6" style="width: 200px;">
              <v-img
                :src="product.image || '/products/default.png'"
                :aspect-ratio="1"
                cover
                class="bg-grey-lighten-2 rounded-lg"
              ></v-img>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex flex-wrap gap-6">
                <div class="info-group">
                  <div class="text-caption text-grey">Category</div>
                  <div class="d-flex align-center">
                    <v-icon :icon="product.vendorIcon" size="small" class="mr-2"></v-icon>
                    {{ product.category }}
                  </div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">Vendor</div>
                  <div>{{ product.vendor }}</div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">SKU</div>
                  <div>{{ product.sku }}</div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">Model Number</div>
                  <div>{{ product.modelNo }}</div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">Stock Status</div>
                  <div class="d-flex align-center">
                    <v-chip
                      :color="getStockStatusColor(product.stock)"
                      size="small"
                      class="text-uppercase"
                    >
                      {{ getStockStatus(product.stock) }}
                    </v-chip>
                  </div>
                </div>
              </div>

              <v-divider class="my-6"></v-divider>

              <div class="d-flex flex-wrap gap-6">
                <div class="info-group">
                  <div class="text-caption text-grey">Barcode</div>
                  <div>{{ product.barcode || 'N/A' }}</div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">HS Code</div>
                  <div>{{ product.hsCode || 'N/A' }}</div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">In Stock</div>
                  <div>{{ product.stock?.inStock || 0 }}</div>
                </div>
                <div class="info-group">
                  <div class="text-caption text-grey">On Order</div>
                  <div>{{ product.stock?.onOrder || 0 }}</div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Tabs Section -->
      <v-card>
        <v-tabs v-model="activeTab" color="warning">
          <v-tab value="description">Description</v-tab>
          <v-tab value="shelf">Shelf</v-tab>
          <v-tab value="import">Import History</v-tab>
          <v-tab value="stock">Stock Report</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="activeTab">
            <v-window-item value="description">
              <div class="pa-4">
                <ul class="description-list">
                  <li v-for="(desc, index) in product.description" :key="index">
                    {{ desc }}
                  </li>
                </ul>
              </div>
            </v-window-item>

            <v-window-item value="shelf">
              <div class="pa-4">
                <p>Shelf information coming soon...</p>
              </div>
            </v-window-item>

            <v-window-item value="import">
              <div class="pa-4">
                <p>Import history coming soon...</p>
              </div>
            </v-window-item>

            <v-window-item value="stock">
              <div class="pa-4">
                <p>Stock report coming soon...</p>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <!-- Action Buttons -->
      <div class="d-flex justify-end gap-2 mt-6">
        <v-btn 
          color="warning" 
          prepend-icon="mdi-transfer" 
          variant="outlined"
          @click="showTransferDialog = true"
        >
          Request Transfer
        </v-btn>
        <v-btn 
          color="warning" 
          prepend-icon="mdi-cart" 
          variant="flat"
          @click="showDeviceDialog = true"
        >
          Request Item
        </v-btn>
      </div>

      <!-- Transfer Request Dialog -->
      <v-dialog v-model="showTransferDialog" width="600" persistent>
        <v-card class="request-dialog">
          <v-card-title class="d-flex justify-space-between align-center pa-6">
            <span class="text-h5 font-weight-bold">Request Transfer</span>
            <v-btn icon="mdi-close" variant="text" @click="showTransferDialog = false"></v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-6">
            <v-form ref="transferForm" v-model="transferValid">
              <v-text-field
                v-model="product.name"
                label="Product"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                readonly
              ></v-text-field>

              <v-select
                v-model="transferRequest.fromStore"
                :items="stores"
                label="From Store"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                :rules="[v => !!v || 'From Store is required']"
              ></v-select>

              <v-select
                v-model="transferRequest.toStore"
                :items="stores"
                label="To Store"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                :rules="[v => !!v || 'To Store is required']"
              ></v-select>

              <v-text-field
                v-model.number="transferRequest.quantity"
                label="Quantity"
                type="number"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                :rules="[
                  v => !!v || 'Quantity is required',
                  v => v > 0 || 'Quantity must be greater than 0',
                  v => v <= product.stock.inStock || 'Quantity exceeds available stock'
                ]"
              ></v-text-field>

              <v-textarea
                v-model="transferRequest.summary"
                label="Transfer Summary"
                variant="outlined"
                density="comfortable"
                rows="3"
                class="mb-4"
                :rules="[v => !!v || 'Summary is required']"
              ></v-textarea>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              color="grey"
              @click="showTransferDialog = false"
              class="mr-4 text-none"
            >
              Cancel
            </v-btn>
            <v-btn
              color="black"
              :loading="submitting"
              :disabled="!transferValid"
              @click="submitTransferRequest"
              class="text-none font-weight-medium text-warning"
            >
              Submit Request
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Device Request Dialog -->
      <v-dialog v-model="showDeviceDialog" width="600" persistent>
        <v-card class="request-dialog">
          <v-card-title class="d-flex justify-space-between align-center pa-6">
            <span class="text-h5 font-weight-bold">Request Device</span>
            <v-btn icon="mdi-close" variant="text" @click="showDeviceDialog = false"></v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-6">
            <v-form ref="deviceForm" v-model="deviceValid">
              <v-text-field
                v-model="product.name"
                label="Product"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                readonly
              ></v-text-field>

              <v-select
                v-model="deviceRequest.store"
                :items="stores"
                label="Store"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                :rules="[v => !!v || 'Store is required']"
              ></v-select>

              <v-text-field
                v-model.number="deviceRequest.quantity"
                label="Quantity"
                type="number"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                :rules="[
                  v => !!v || 'Quantity is required',
                  v => v > 0 || 'Quantity must be greater than 0',
                  v => v <= product.stock.inStock || 'Quantity exceeds available stock'
                ]"
              ></v-text-field>

              <v-textarea
                v-model="deviceRequest.summary"
                label="Request Summary"
                variant="outlined"
                density="comfortable"
                rows="3"
                class="mb-4"
                :rules="[v => !!v || 'Summary is required']"
              ></v-textarea>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              color="grey"
              @click="showDeviceDialog = false"
              class="mr-4 text-none"
            >
              Cancel
            </v-btn>
            <v-btn
              color="black"
              :loading="submitting"
              :disabled="!deviceValid"
              @click="submitDeviceRequest"
              class="text-none font-weight-medium text-warning"
            >
              Submit Request
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const activeTab = ref('description')

// Add dialog refs and form data
const showTransferDialog = ref(false)
const showDeviceDialog = ref(false)
const transferValid = ref(false)
const deviceValid = ref(false)
const submitting = ref(false)

const stores = [
  'BloomTech',
  'Jakros Store',
  'BloomTech No 3',
  'Main Warehouse'
]

const transferRequest = ref({
  fromStore: '',
  toStore: '',
  quantity: 1,
  summary: ''
})

const deviceRequest = ref({
  store: '',
  quantity: 1,
  summary: ''
})

// Add dialog methods
const showTransferRequestDialog = () => {
  router.push({
    path: '/transfer-requests',
    query: { 
      product: product.value?.name,
      sku: product.value?.sku,
      quantity: 1
    }
  })
}

const showDeviceRequestDialog = () => {
  router.push({
    path: '/device-requests',
    query: { 
      product: product.value?.name,
      sku: product.value?.sku,
      quantity: 1
    }
  })
}

// Get products data from your store or API
const products = [
  {
    name: 'UISP airMAX NanoStation 5AC Loco',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'NS-5ACL-US',
    sku: 'NS-5ACL-US',
    image: '/products/nanostation.png',
    description: [
      'High-performance device for professional use',
      'Compatible with a wide range of systems and networks',
      'Energy-efficient design for reduced operating costs',
      'Built-in security features to protect against unauthorized access',
      'Extended warranty available for added peace of mind'
    ],
    barcode: '121468252258',
    hsCode: '85176290',
    stock: {
      inStock: 15,
      onOrder: 5,
      minThreshold: 10,
      criticalThreshold: 3
    }
  },
  {
    name: 'UISP Fiber NanoG',
    category: 'Fiber Optics',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'UF-NANO',
    sku: 'UF-NANO',
    image: '/products/nanog.png',
    description: [
      'Advanced fiber optic networking solution',
      'High-speed data transmission capabilities',
      'Low latency performance',
      'Compact and durable design',
      'Easy installation and maintenance'
    ],
    barcode: '121468252259',
    hsCode: '85176291',
    stock: {
      inStock: 8,
      onOrder: 10,
      minThreshold: 5,
      criticalThreshold: 2
    }
  },
  {
    name: 'UISP airMAX LiteBeam 5AC Bridge GEN2',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'LBE-5AC-Gen2',
    sku: 'LBE-5AC-Gen2',
    image: '/products/litebeam.png',
    description: [
      'High-performance bridge device',
      'Long-range connectivity',
      'Weather-resistant design',
      'Easy installation and setup'
    ],
    barcode: '121468252260',
    hsCode: '85176292',
    stock: {
      inStock: 12,
      onOrder: 8,
      minThreshold: 8,
      criticalThreshold: 4
    }
  },
  {
    name: '450Mbps Wireless N Router',
    category: 'Routers',
    vendor: 'TP-Link',
    vendorIcon: 'mdi-router-wireless',
    modelNo: 'TL-WR940N',
    sku: 'TL-WR940N',
    image: '/products/router.png',
    description: [
      'High-speed wireless connectivity',
      'Multiple antenna design',
      'Easy setup and configuration',
      'Advanced security features'
    ],
    barcode: '121468252261',
    hsCode: '85176293',
    stock: {
      inStock: 20,
      onOrder: 0,
      minThreshold: 5,
      criticalThreshold: 2
    }
  },
  {
    name: 'POE 24V Adapter',
    category: 'Power Supplies',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-power-plug',
    modelNo: 'POE-24V',
    sku: 'POE-24V',
    image: '/products/poe.png',
    description: [
      'Reliable power delivery',
      'Compatible with multiple devices',
      'Surge protection',
      'Compact design'
    ],
    barcode: '121468252262',
    hsCode: '85176294',
    stock: {
      inStock: 30,
      onOrder: 0,
      minThreshold: 10,
      criticalThreshold: 5
    }
  },
  {
    name: 'EdgeRouter X',
    category: 'Routers',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-router-network',
    modelNo: 'ER-X',
    sku: 'ER-X',
    image: '/products/edgerouter.png',
    description: [
      'Advanced routing capabilities',
      'Multiple ethernet ports',
      'Enterprise-level features',
      'Compact form factor'
    ],
    barcode: '121468252263',
    hsCode: '85176295',
    stock: {
      inStock: 5,
      onOrder: 10,
      minThreshold: 8,
      criticalThreshold: 3
    }
  },
  {
    name: 'UISP Fiber Loco',
    category: 'Fiber Optics',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-fiber-optic',
    modelNo: 'UF-LOCO',
    sku: 'UF-LOCO',
    image: '/products/fiber-loco.png',
    description: [
      'Compact fiber optic solution',
      'High-speed data transmission',
      'Easy mounting options',
      'Weather-resistant design'
    ],
    barcode: '121468252264',
    hsCode: '85176296',
    stock: {
      inStock: 15,
      onOrder: 5,
      minThreshold: 10,
      criticalThreshold: 3
    }
  },
  {
    name: 'UISP airCube ISP Access Point',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'ACB-AC-US',
    sku: 'ACB-AC-US',
    image: '/products/aircube.png',
    description: [
      'Dual-band WiFi',
      'Easy management',
      'Compact design',
      'Multiple SSIDs support'
    ],
    barcode: '121468252265',
    hsCode: '85176297',
    stock: {
      inStock: 25,
      onOrder: 0,
      minThreshold: 10,
      criticalThreshold: 5
    }
  },
  {
    name: 'Cat6 Ethernet Cable 5m',
    category: 'Cables',
    vendor: 'Generic',
    vendorIcon: 'mdi-cable-data',
    modelNo: 'CAT6-5M',
    sku: 'CAT6-5M',
    image: '/products/cable.png',
    description: [
      'High-quality copper conductors',
      'Cat6 specification compliant',
      'Snagless design',
      'UV-resistant jacket'
    ],
    barcode: '121468252266',
    hsCode: '85176298',
    stock: {
      inStock: 100,
      onOrder: 50,
      minThreshold: 30,
      criticalThreshold: 15
    }
  },
  {
    name: 'DIGITAL SM LC UPC 9/125, 1.5M',
    category: 'Fiber Optic Cables',
    vendor: 'Digital Connections',
    vendorIcon: 'mdi-cable-data',
    modelNo: 'SM-LC-9125-1.5',
    sku: 'SM-LC-9125-1.5',
    image: null,
    description: [
      'Single-mode fiber optic cable',
      'LC UPC connectors',
      '9/125 micron core/cladding',
      '1.5 meter length'
    ],
    barcode: '121468252267',
    hsCode: '85176299',
    stock: {
      inStock: 50,
      onOrder: 0,
      minThreshold: 20,
      criticalThreshold: 10
    }
  },
  {
    name: 'CABLE TRUNKING 3M',
    category: 'Cable Management',
    vendor: 'Cable Solutions',
    vendorIcon: 'mdi-cable-data',
    modelNo: 'CT-3M',
    sku: 'CT-3M',
    image: null,
    description: [
      'Professional cable management solution',
      'Durable PVC construction',
      'Easy installation',
      '3 meter length'
    ],
    barcode: '121468252268',
    hsCode: '85176300',
    stock: {
      inStock: 75,
      onOrder: 25,
      minThreshold: 30,
      criticalThreshold: 15
    }
  },
  {
    name: 'WS GPON TERMINAL',
    category: 'Network Terminals',
    vendor: 'WebSprix',
    vendorIcon: 'mdi-network',
    modelNo: 'WS-GPT-01',
    sku: 'WS-GPT-01',
    image: null,
    description: [
      'GPON terminal device',
      'High-speed fiber connectivity',
      'Multiple ethernet ports',
      'Advanced QoS features'
    ],
    barcode: '121468252269',
    hsCode: '85176301',
    stock: {
      inStock: 10,
      onOrder: 5,
      minThreshold: 8,
      criticalThreshold: 4
    }
  },
  {
    name: 'WS FIBER PATCH CABLE 100M SC/UPC-SC/UPC',
    category: 'Fiber Optic Cables',
    vendor: 'WebSprix',
    vendorIcon: 'mdi-cable-data',
    modelNo: 'WS-FPC-100M',
    sku: 'WS-FPC-100M',
    image: null,
    description: [
      'High-quality fiber patch cable',
      'SC/UPC connectors on both ends',
      '100 meter length',
      'Low signal loss'
    ],
    barcode: '121468252270',
    hsCode: '85176302',
    stock: {
      inStock: 15,
      onOrder: 10,
      minThreshold: 12,
      criticalThreshold: 6
    }
  },
  {
    name: 'PLANTRONICS HEADSET',
    category: 'Accessories',
    vendor: 'Plantronics',
    vendorIcon: 'mdi-headset',
    modelNo: 'PLT-HS-01',
    sku: 'PLT-HS-01',
    image: null,
    description: [
      'Professional-grade headset',
      'Noise-canceling microphone',
      'Comfortable ear cushions',
      'Durable construction'
    ],
    barcode: '121468252271',
    hsCode: '85176303',
    stock: {
      inStock: 20,
      onOrder: 0,
      minThreshold: 10,
      criticalThreshold: 5
    }
  }
]

// Watch for route changes
watch(
  () => route.params.sku,
  async (newSku) => {
    if (!newSku) return
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    loading.value = false
  },
  { immediate: true }
)

const product = computed(() => {
  const found = products.find(p => p.sku === route.params.sku)
  return found
})

const getStockStatus = (stock) => {
  if (!stock) return 'Unknown'
  if (stock.inStock <= stock.criticalThreshold) return 'Critical'
  if (stock.inStock <= stock.minThreshold) return 'Low'
  return 'In Stock'
}

const getStockStatusColor = (stock) => {
  if (!stock) return 'grey'
  if (stock.inStock <= stock.criticalThreshold) return 'error'
  if (stock.inStock <= stock.minThreshold) return 'warning'
  return 'success'
}

const navigateBack = () => {
  router.push('/products')
}

const submitTransferRequest = async () => {
  if (!transferValid.value) return

  submitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Transfer request submitted:', {
      product: product.value.name,
      ...transferRequest.value
    })
    showTransferDialog.value = false
    transferRequest.value = {
      fromStore: '',
      toStore: '',
      quantity: 1,
      summary: ''
    }
  } catch (error) {
    console.error('Error submitting transfer request:', error)
  } finally {
    submitting.value = false
  }
}

const submitDeviceRequest = async () => {
  if (!deviceValid.value) return

  submitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Device request submitted:', {
      product: product.value.name,
      ...deviceRequest.value
    })
    showDeviceDialog.value = false
    deviceRequest.value = {
      store: '',
      quantity: 1,
      summary: ''
    }
  } catch (error) {
    console.error('Error submitting device request:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.gap-6 {
  gap: 24px;
}

.info-group {
  min-width: 120px;
}

.description-list {
  list-style-type: disc;
  padding-left: 20px;
}

.description-list li {
  margin-bottom: 8px;
}

.request-dialog {
  border-radius: 12px;
}
</style> 