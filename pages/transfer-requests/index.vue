<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-8">
      <div>
        <h1 class="text-h4 font-weight-bold" style="color: #FFD600;">TRANSFER REQUESTS</h1>
        <div class="text-subtitle-1 text-medium-emphasis">Overview</div>
      </div>
      
      <div class="d-flex align-center gap-4">
        <v-btn icon="mdi-bell-outline" variant="text">
          <v-badge
            color="error"
            content="2"
            location="top end"
          ></v-badge>
        </v-btn>
        
            </div>
          </template>
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
        label="Search transfers..."
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
        @click="showTransferDialog = true"
      >
        REQUEST TRANSFER
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredTransfers"
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
              @click="approveTransfer(item)"
            >
              Approve
            </v-btn>
            <v-btn
              v-if="item.status === 'Pending'"
              variant="text"
              color="error"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="rejectTransfer(item)"
            >
              Reject
            </v-btn>
            <v-btn
              v-if="item.status === 'Approved'"
              variant="text"
              color="black"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="processTransfer(item)"
            >
              Process
            </v-btn>
            <v-btn
              v-if="item.status === 'Rejected'"
              variant="text"
              color="error"
              density="comfortable"
              class="text-none font-weight-medium"
              @click="deleteTransfer(item)"
            >
              Delete
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Transfer Request Dialog -->
    <v-dialog v-model="showTransferDialog" width="600" persistent>
      <v-card class="request-dialog">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5 font-weight-bold">Request Transfer</span>
          <v-btn icon="mdi-close" variant="text" @click="showTransferDialog = false"></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6">
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="newTransfer.product"
              :items="products"
              label="Product"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :rules="[v => !!v || 'Product is required']"
            ></v-select>

            <div class="d-flex gap-4 mb-4">
              <v-select
                v-model="newTransfer.fromStore"
                :items="stores"
                label="From Store"
                variant="outlined"
                density="comfortable"
                class="flex-grow-1"
                :rules="[
                  v => !!v || 'Source store is required',
                  v => v !== newTransfer.toStore || 'Source and destination stores must be different'
                ]"
              ></v-select>

              <v-select
                v-model="newTransfer.toStore"
                :items="stores"
                label="To Store"
                variant="outlined"
                density="comfortable"
                class="flex-grow-1"
                :rules="[
                  v => !!v || 'Destination store is required',
                  v => v !== newTransfer.fromStore || 'Source and destination stores must be different'
                ]"
              ></v-select>
            </div>

            <v-text-field
              v-model.number="newTransfer.quantity"
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
              v-model="newTransfer.reason"
              label="Transfer Reason"
              variant="outlined"
              density="comfortable"
              rows="3"
              class="mb-4"
              :rules="[v => !!v || 'Reason is required']"
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
            :disabled="!valid"
            @click="submitTransfer"
            class="text-none font-weight-medium text-warning"
          >
            Submit Transfer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showTransferDialog = ref(false)
const valid = ref(false)
const submitting = ref(false)

const headers = [
  { title: 'No.', align: 'start', key: 'id' },
  { title: 'Requested By', align: 'start', key: 'requestedBy' },
  { title: 'Date', align: 'start', key: 'date' },
  { title: 'Product', align: 'start', key: 'product' },
  { title: 'From Store', align: 'start', key: 'fromStore' },
  { title: 'To Store', align: 'start', key: 'toStore' },
  { title: 'Quantity', align: 'start', key: 'quantity' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Actions', align: 'end', key: 'actions', sortable: false }
]

const userMenuItems = [
  { title: 'Profile', icon: 'mdi-account' },
  { title: 'Settings', icon: 'mdi-cog' },
  { title: 'Logout', icon: 'mdi-logout' }
]

const transfers = ref([
  {
    id: 'TRF-001',
    requestedBy: 'Abraham Tibebu',
    date: '2023-06-10',
    product: 'UISP airMAX NanoStation 5AC Loco',
    fromStore: 'BloomTech',
    toStore: 'Jakros Store',
    quantity: 5,
    status: 'Approved',
    reason: 'Stock rebalancing between stores'
  },
  {
    id: 'TRF-002',
    requestedBy: 'Abraham Tibebu',
    date: '2023-06-15',
    product: 'EdgeRouter X',
    fromStore: 'Main Warehouse',
    toStore: 'BloomTech No 3',
    quantity: 3,
    status: 'Pending',
    reason: 'Low stock at destination store'
  },
  {
    id: 'TRF-003',
    requestedBy: 'Abraham Tibebu',
    date: '2023-06-20',
    product: '450Mbps Wireless N Router',
    fromStore: 'Jakros Store',
    toStore: 'BloomTech',
    quantity: 2,
    status: 'Rejected',
    reason: 'Insufficient stock at source store'
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

const newTransfer = ref({
  product: '',
  fromStore: '',
  toStore: '',
  quantity: 1,
  reason: ''
})

const filteredTransfers = computed(() => {
  if (!search.value) return transfers.value
  const searchTerm = search.value.toLowerCase()
  return transfers.value.filter(transfer => 
    transfer.id.toLowerCase().includes(searchTerm) ||
    transfer.product.toLowerCase().includes(searchTerm) ||
    transfer.fromStore.toLowerCase().includes(searchTerm) ||
    transfer.toStore.toLowerCase().includes(searchTerm) ||
    transfer.reason.toLowerCase().includes(searchTerm)
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

const approveTransfer = (item) => {
  const transfer = transfers.value.find(t => t.id === item.id)
  if (transfer) {
    transfer.status = 'Approved'
  }
}

const rejectTransfer = (item) => {
  const transfer = transfers.value.find(t => t.id === item.id)
  if (transfer) {
    transfer.status = 'Rejected'
  }
}

const processTransfer = (item) => {
  // Navigate to process transfer page
  navigateTo(`/transfer-requests/${item.id}/process`)
}

const deleteTransfer = (item) => {
  const index = transfers.value.findIndex(t => t.id === item.id)
  if (index !== -1) {
    transfers.value.splice(index, 1)
  }
}

const submitTransfer = async () => {
  if (!valid.value) return

  submitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newId = `TRF-${String(transfers.value.length + 1).padStart(3, '0')}`
    transfers.value.push({
      id: newId,
      requestedBy: 'Abraham Tibebu',
      date: new Date().toISOString().split('T')[0],
      product: newTransfer.value.product,
      fromStore: newTransfer.value.fromStore,
      toStore: newTransfer.value.toStore,
      quantity: newTransfer.value.quantity,
      status: 'Pending',
      reason: newTransfer.value.reason
    })

    showTransferDialog.value = false
    newTransfer.value = {
      product: '',
      fromStore: '',
      toStore: '',
      quantity: 1,
      reason: ''
    }
  } catch (error) {
    console.error('Error submitting transfer:', error)
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