<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5">Batches</h2>
      <v-btn color="warning" prepend-icon="mdi-plus">
        Add Batch
      </v-btn>
    </div>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center px-4">
        <span>All Batches</span>
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search batches"
          single-line
          hide-details
          density="compact"
          class="max-width-200"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="batches"
        :search="search"
        hover
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.raw.statusColor"
            size="small"
            class="text-uppercase"
          >
            {{ item.raw.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            @click="editBatch(item.raw)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            color="error"
            @click="deleteBatch(item.raw)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'Batch ID', align: 'start', key: 'id' },
  { title: 'Product', key: 'product' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Vendor', key: 'vendor' },
  { title: 'Arrival Date', key: 'arrivalDate' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const batches = [
  {
    id: 'BAT001',
    product: 'ThinkPad X1 Carbon',
    quantity: 50,
    vendor: 'Lenovo',
    arrivalDate: '2024-03-15',
    status: 'In Transit',
    statusColor: 'info'
  },
  {
    id: 'BAT002',
    product: 'MacBook Pro M2',
    quantity: 30,
    vendor: 'Apple',
    arrivalDate: '2024-03-10',
    status: 'Delivered',
    statusColor: 'success'
  },
  {
    id: 'BAT003',
    product: 'Dell XPS 13',
    quantity: 25,
    vendor: 'Dell',
    arrivalDate: '2024-03-20',
    status: 'Pending',
    statusColor: 'warning'
  }
]

const editBatch = (batch) => {
  console.log('Edit batch:', batch)
}

const deleteBatch = (batch) => {
  console.log('Delete batch:', batch)
}
</script>

<style scoped>
.max-width-200 {
  max-width: 200px;
}
</style> 