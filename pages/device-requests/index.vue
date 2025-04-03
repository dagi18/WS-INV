<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-8">
      <div>
        <h1 class="text-h4 font-weight-bold" style="color: #FFD600;">DEVICE REQUESTS</h1>
        <div class="text-subtitle-1 text-medium-emphasis">Overview</div>
      </div>
      
      <div class="d-flex align-center gap-4">

        
        <v-menu location="bottom end">
          <v-list width="200">
            <v-list-item
              v-for="(item, index) in userMenuItems"
              :key="index"
              :value="index"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" class="mr-2"></v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <div class="d-flex justify-space-between align-center mb-6">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search your requests..."
        single-line
        hide-details
        variant="outlined"
        density="comfortable"
        class="search-field"
      ></v-text-field>

      <v-btn
        color="warning"
        prepend-icon="mdi-plus"
        class="text-none font-weight-medium"
        style="text-transform: uppercase;"
        @click="showRequestDialog = true"
      >
        REQUEST DEVICE
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredRequests"
        :search="search"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            :text-color="item.status === 'Pending' ? 'black' : 'white'"
            size="small"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex gap-2">
            <v-btn
              v-if="item.status === 'Pending'"
              variant="text"
              color="success"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="approveRequest(item)"
            >
              Approve
            </v-btn>
            <v-btn
              v-if="item.status === 'Pending'"
              variant="text"
              color="error"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="rejectRequest(item)"
            >
              Reject
            </v-btn>
            <v-btn
              v-if="item.status === 'Approved'"
              variant="text"
              color="black"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="checkoutRequest(item)"
            >
              Checkout
            </v-btn>
            <v-btn
              v-if="item.status === 'Rejected'"
              variant="text"
              color="error"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="deleteRequest(item)"
            >
              Delete
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Request Device Dialog -->
    <v-dialog v-model="showRequestDialog" width="600" persistent>
      <v-card class="request-dialog">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5 font-weight-bold">Request Device</span>
          <v-btn icon="mdi-close" variant="text" @click="showRequestDialog = false"></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6">
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="newRequest.product"
              :items="products"
              label="Product"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :rules="[v => !!v || 'Product is required']"
            ></v-select>

            <v-select
              v-model="newRequest.store"
              :items="stores"
              label="Store"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :rules="[v => !!v || 'Store is required']"
            ></v-select>

            <v-text-field
              v-model.number="newRequest.quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :rules="[
                v => !!v || 'Quantity is required',
                v => v > 0 || 'Quantity must be greater than 0'
              ]"
            ></v-text-field>

            <v-textarea
              v-model="newRequest.summary"
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
            @click="showRequestDialog = false"
            class="mr-4 text-none"
          >
            Cancel
          </v-btn>
          <v-btn
            color="black"
            :loading="submitting"
            :disabled="!valid"
            @click="submitRequest"
            class="text-none font-weight-medium text-warning"
          >
            Submit Request
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showRequestDialog = ref(false)
const valid = ref(false)
const submitting = ref(false)

const headers = [
  { title: 'No.', align: 'start', key: 'id' },
  { title: 'Requested By', align: 'start', key: 'requestedBy' },
  { title: 'Date', align: 'start', key: 'date' },
  { title: 'Product', align: 'start', key: 'product' },
  { title: 'Store', align: 'start', key: 'store' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Summary', align: 'start', key: 'summary' },
  { title: 'Actions', align: 'end', key: 'actions', sortable: false }
]

const userMenuItems = [
  { title: 'Profile', icon: 'mdi-account' },
  { title: 'Settings', icon: 'mdi-cog' },
  { title: 'Logout', icon: 'mdi-logout' }
]

const requests = ref([
  {
    id: 'REQ-001',
    requestedBy: 'Abraham Tibebu',
    date: '2023-06-10',
    product: 'UISP airMAX NanoStation 5AC Loco',
    store: 'BloomTech',
    status: 'Approved',
    summary: 'Needed for new client installation',
    quantity: 1
  },
  {
    id: 'REQ-002',
    requestedBy: 'Abraham Tibebu',
    date: '2023-06-15',
    product: 'EdgeRouter X',
    store: 'Jakros Store',
    status: 'Pending',
    summary: 'Required for network upgrade',
    quantity: 2
  },
  {
    id: 'REQ-003',
    requestedBy: 'Abraham Tibebu',
    date: '2023-06-20',
    product: '450Mbps Wireless N Router',
    store: 'BloomTech No 3',
    status: 'Rejected',
    summary: 'Out of stock, suggested alternative',
    quantity: 1
  }
])

const products = [
  'UISP airMAX NanoStation 5AC Loco',
  'EdgeRouter X',
  '450Mbps Wireless N Router',
  'UISP Fiber NanoG',
  'POE 24V Adapter'
]

const stores = [
  'BloomTech',
  'Jakros Store',
  'BloomTech No 3',
  'Main Warehouse'
]

const newRequest = ref({
  product: '',
  store: '',
  summary: '',
  quantity: 1
})

const filteredRequests = computed(() => {
  if (!search.value) return requests.value
  const searchTerm = search.value.toLowerCase()
  return requests.value.filter(request => 
    request.id.toLowerCase().includes(searchTerm) ||
    request.product.toLowerCase().includes(searchTerm) ||
    request.store.toLowerCase().includes(searchTerm) ||
    request.summary.toLowerCase().includes(searchTerm)
  )
})

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Rejected':
      return 'error'
    default:
      return 'grey'
  }
}

const approveRequest = (item) => {
  const request = requests.value.find(r => r.id === item.id)
  if (request) {
    request.status = 'Approved'
  }
}

const rejectRequest = (item) => {
  const request = requests.value.find(r => r.id === item.id)
  if (request) {
    request.status = 'Rejected'
  }
}

const checkoutRequest = (item) => {
  // Navigate to checkout page
  navigateTo(`/device-requests/${item.id}/checkout`)
}

const deleteRequest = (item) => {
  const index = requests.value.findIndex(r => r.id === item.id)
  if (index !== -1) {
    requests.value.splice(index, 1)
  }
}

const submitRequest = async () => {
  if (!valid.value) return

  submitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newId = `REQ-${String(requests.value.length + 1).padStart(3, '0')}`
    requests.value.push({
      id: newId,
      requestedBy: 'Abraham Tibebu',
      date: new Date().toISOString().split('T')[0],
      product: newRequest.value.product,
      store: newRequest.value.store,
      status: 'Pending',
      summary: newRequest.value.summary,
      quantity: newRequest.value.quantity
    })

    showRequestDialog.value = false
    newRequest.value = {
      product: '',
      store: '',
      summary: '',
      quantity: 1
    }
  } catch (error) {
    console.error('Error submitting request:', error)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.search-field {
  max-width: 600px;
}

:deep(.v-data-table) {
  background: transparent !important;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

:deep(.v-data-table-header) {
  background: #f8fafc;
}

:deep(.v-data-table-header th) {
  font-weight: 600 !important;
  color: #64748b !important;
  text-transform: none !important;
  font-size: 0.875rem !important;
}

:deep(.v-data-table .v-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)) {
  background: #f8fafc !important;
}

:deep(.v-field__outline) {
  border-color: #e2e8f0 !important;
}

:deep(.v-field--focused .v-field__outline) {
  border-color: #f4d609 !important;
}

.request-dialog {
  border-radius: 12px;
}

.gap-2 {
  gap: 8px;
}

.gap-4 {
  gap: 16px;
}

:deep(.v-btn) {
  text-transform: none !important;
  font-weight: 500 !important;
}

:deep(.v-btn.v-btn--variant-text) {
  opacity: 1 !important;
}
</style> 