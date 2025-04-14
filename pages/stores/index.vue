<template>
  <div>
    <!-- Header with Search and Create Button -->
    <div class="d-flex justify-space-between align-center mb-4">
      <v-text-field
        placeholder="Search stores by name or address..."
        variant="outlined"
        density="compact"
        hide-details
        class="max-w-[300px]"
        prepend-inner-icon="mdi-magnify"
        v-model="searchQuery"
        @input="filterStores"
      ></v-text-field>
      
      <v-btn 
        color="warning" 
        prepend-icon="mdi-plus"
        class="text-none"
        @click="openCreateDialog"
      >
        Create Store
      </v-btn>
    </div>

    <!-- Stores Table -->
    <v-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Description</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="store in filteredStores" :key="store.name">
          <td>{{ store.name }}</td>
          <td>{{ store.address }}</td>
          <td>{{ store.latitude }}</td>
          <td>{{ store.longitude }}</td>
          <td>{{ store.description }}</td>
          <td>
            <div class="d-flex gap-2 justify-center">
              <v-tooltip text="Edit Store" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-pencil"
                    size="32"
                    variant="text"
                    color="warning"
                    v-bind="props"
                    @click="editStore(store)"
                    class="action-btn"
                  ></v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="View Products" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-eye"
                    size="32"
                    variant="text"
                    color="warning"
                    v-bind="props"
                    @click="viewProducts(store)"
                    class="action-btn"
                  ></v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Browse Shelves" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-view-grid-outline"
                    size="32"
                    variant="text"
                    color="warning"
                    v-bind="props"
                    @click="browseShelves(store)"
                    class="action-btn"
                  ></v-btn>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <div class="d-flex justify-center mt-4">
      <v-pagination
        v-model="currentPage"
        :length="3"
        :total-visible="7"
        color="warning"
      ></v-pagination>
    </div>

    <!-- Edit Store Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h6 pa-4">
          Edit Store
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form ref="editForm">
            <v-text-field
              v-model="editedStore.name"
              label="Store Name"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="editedStore.address"
              label="Address"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedStore.latitude"
                  label="Latitude"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedStore.longitude"
                  label="Longitude"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="editedStore.description"
              label="Description"
              variant="outlined"
              density="comfortable"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="editDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="warning"
            @click="saveStore"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const currentPage = ref(1)
const editDialog = ref(false)
const editedStore = ref({})

const stores = [
  {
    name: 'BloomTech',
    address: 'Kazanchis Bloomtech',
    latitude: '9.0152096',
    longitude: '38.7857688',
    description: 'Bloom tech store'
  },
  {
    name: 'Jakros Store',
    address: 'Jakros',
    latitude: '9.0047965',
    longitude: '38.8161681',
    description: 'Jakros store'
  },
  {
    name: 'Kality Store',
    address: 'Akaki Kality, Addis Ababa',
    latitude: '8.897106',
    longitude: '38.768922',
    description: 'Akaki Kality Store'
  },
  {
    name: 'Bahir Dar',
    address: 'Across from St. George Church, Abyssinia Bank Building',
    latitude: '11.594679',
    longitude: '37.387434',
    description: 'Bahirdar Store'
  },
  {
    name: 'Bloomtech No 2',
    address: 'Kazanchis',
    latitude: '9.0152961',
    longitude: '38.7857681',
    description: 'This section is dedicated to office stationary.'
  },
  {
    name: 'Bloomtech No 3',
    address: 'Kazanchis',
    latitude: '9.0152964',
    longitude: '38.7857684',
    description: 'This section is for less frequently accessed items.'
  },
  {
    name: 'Mina Store',
    address: 'Mina Building',
    latitude: '8.991581390257152',
    longitude: '38.772197146737363',
    description: 'Mina Store'
  },
  {
    name: 'Dawit',
    address: 'Taehay Real Estate',
    latitude: '9.022244092325239',
    longitude: '38.854172875014475',
    description: 'Taehay Real Estate Data Center'
  },
  {
    name: 'ITP 1',
    address: 'ICT Park Head Office',
    latitude: '8.996393926950869',
    longitude: '38.840452679706422',
    description: 'ITP 1 is a dedicated store for fast-moving items and distribution of high-demand products.'
  },
  {
    name: 'ITP 2',
    address: 'ICT Park Head Office',
    latitude: '8.996174114313671',
    longitude: '38.840474400195522',
    description: 'ITP 2 is a dedicated store for non-fast-moving items, optimized for the secure and organized storage of products with lower turnover rates.'
  }
]

const editStore = (store) => {
  editedStore.value = { ...store }
  editDialog.value = true
}

const viewProducts = (store) => {
  router.push(`/stores/${store.name}/products`)
}

const browseShelves = (store) => {
  router.push(`/stores/${store.name}/shelves`)
}

const saveStore = () => {
  // Here you would typically save the changes to your backend
  const index = stores.findIndex(s => s.name === editedStore.value.name)
  if (index !== -1) {
    stores[index] = { ...editedStore.value }
  }
  editDialog.value = false
}

const filteredStores = computed(() => {
  if (!searchQuery.value) return stores
  
  const query = searchQuery.value.toLowerCase()
  return stores.filter(store => 
    store.name.toLowerCase().includes(query) ||
    store.address.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.v-table {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

.v-table th {
  font-weight: 600 !important;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.87);
  background-color: #f8f9fa;
}

.v-table td {
  color: rgba(0, 0, 0, 0.87);
}

.v-table tr:hover td {
  background-color: #f8f9fa;
}

.action-btn {
  transition: transform 0.2s ease-in-out;
}

.action-btn:hover {
  transform: scale(1.1);
  background-color: rgba(255, 212, 59, 0.1) !important;
}

/* Dialog Styles */
.v-dialog :deep(.v-card) {
  border-radius: 12px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.v-dialog :deep(.v-card-title) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.v-dialog :deep(.v-text-field .v-field__outline__start),
.v-dialog :deep(.v-text-field .v-field__outline__end) {
  border-color: rgba(0, 0, 0, 0.15);
}

.v-dialog :deep(.v-text-field:hover .v-field__outline__start),
.v-dialog :deep(.v-text-field:hover .v-field__outline__end) {
  border-color: rgba(0, 0, 0, 0.3);
}
</style> 