<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold mb-1">{{ store.name }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Store Products</p>
      </div>
      <v-btn
        color="warning"
        prepend-icon="mdi-plus"
        @click="addProduct"
      >
        Add Product
      </v-btn>
    </div>

    <!-- Product Grid -->
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="product-card" elevation="0">
          <v-img
            :src="product.image || 'https://via.placeholder.com/300x200?text=No+Image'"
            height="200"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-icon size="48" color="grey-lighten-1">mdi-image-off</v-icon>
              </div>
            </template>
          </v-img>

          <v-card-text class="pa-4">
            <div class="d-flex justify-space-between align-center mb-2">
              <div class="text-subtitle-1 font-weight-bold text-truncate">{{ product.name }}</div>
              <v-chip
                :color="getStatusColor(product.status)"
                size="small"
                class="ml-2"
              >
                {{ product.quantity }}
              </v-chip>
            </div>

            <div class="d-flex align-center mb-2 text-medium-emphasis">
              <v-icon size="small" class="mr-1">mdi-tag</v-icon>
              <span class="text-caption">SKU: {{ product.sku }}</span>
            </div>

            <div class="d-flex align-center text-medium-emphasis">
              <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
              <span class="text-caption">{{ product.location }}</span>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-btn
              variant="text"
              color="warning"
              size="small"
              prepend-icon="mdi-pencil"
              @click="editProduct(product)"
            >
              Edit
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="warning"
              size="small"
              prepend-icon="mdi-eye"
              @click="viewProduct(product)"
            >
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Product Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h6 pa-4">
          {{ editMode ? 'Edit Product' : 'Add Product' }}
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form ref="form">
            <v-text-field
              v-model="editedProduct.name"
              label="Product Name"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="editedProduct.sku"
              label="SKU"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="editedProduct.quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="editedProduct.location"
              label="Location"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="warning"
            @click="saveProduct"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dialog = ref(false)
const editMode = ref(false)
const editedProduct = ref({})

const store = {
  name: route.params.name,
  // Add other store details as needed
}

const products = ref([
  {
    id: 1,
    name: 'WS Fiber Patch Cable 60m',
    sku: 'WS-FPC-60M',
    quantity: 15,
    status: 'in-stock',
    location: 'Shelf S1-C1-R4',
    image: null
  },
  {
    id: 2,
    name: 'Cable Clip 18mm',
    sku: 'CC-18MM',
    quantity: 5,
    status: 'low-stock',
    location: 'Shelf S1-C3-R4',
    image: null
  },
  // Add more products as needed
])

const getStatusColor = (status) => {
  switch (status) {
    case 'in-stock':
      return 'success'
    case 'low-stock':
      return 'warning'
    case 'out-of-stock':
      return 'error'
    default:
      return 'grey'
  }
}

const addProduct = () => {
  editMode.value = false
  editedProduct.value = {
    name: '',
    sku: '',
    quantity: 0,
    location: ''
  }
  dialog.value = true
}

const editProduct = (product) => {
  editMode.value = true
  editedProduct.value = { ...product }
  dialog.value = true
}

const viewProduct = (product) => {
  // Implement view product logic
  console.log('View product:', product)
}

const saveProduct = () => {
  if (editMode.value) {
    const index = products.value.findIndex(p => p.id === editedProduct.value.id)
    if (index !== -1) {
      products.value[index] = { ...editedProduct.value }
    }
  } else {
    products.value.push({
      id: Date.now(),
      ...editedProduct.value,
      status: editedProduct.value.quantity > 10 ? 'in-stock' : 'low-stock',
      image: null
    })
  }
  dialog.value = false
}
</script>

<style scoped>
.product-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.v-card-text {
  .text-truncate {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style> 