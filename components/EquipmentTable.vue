<template>
  <div>
    <v-card>
      <v-card-title class="d-flex align-center">
        Equipment Inventory
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mx-4"
          style="max-width: 300px"
        ></v-text-field>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="$emit('add-equipment')"
        >
          Add Equipment
        </v-btn>
      </v-card-title>

      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="equipment"
        :search="search"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.raw.status)"
            size="small"
          >
            {{ item.raw.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            @click="$emit('edit-equipment', item.raw)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            class="me-2"
            @click="$emit('view-history', item.raw)"
          >
            mdi-history
          </v-icon>
          <v-icon
            size="small"
            color="error"
            @click="$emit('delete-equipment', item.raw)"
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
const loading = ref(false)
const itemsPerPage = ref(25)

const headers = [
  { title: 'ID', key: 'id', sortable: true, width: '100px' },
  { title: 'Name', key: 'name', sortable: true },
  { title: 'Category', key: 'category', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Location', key: 'location', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, width: '150px' },
]

// Sample data - replace with actual data from your backend
const equipment = ref([
  {
    id: 'EQ001',
    name: 'Router X1',
    category: 'Network Equipment',
    status: 'Active',
    location: 'Main Office',
  },
  {
    id: 'EQ002',
    name: 'Switch Y2',
    category: 'Network Equipment',
    status: 'Maintenance',
    location: 'Data Center',
  },
  // Add more sample data as needed
])

const getStatusColor = (status) => {
  const colors = {
    Active: 'success',
    Maintenance: 'warning',
    Inactive: 'error',
    Pending: 'info',
  }
  return colors[status] || 'grey'
}

defineEmits(['add-equipment', 'edit-equipment', 'view-history', 'delete-equipment'])
</script>

<style scoped>
.v-data-table {
  --v-table-header-height: 48px;
}
</style> 