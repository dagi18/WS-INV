<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold mb-1">{{ store.name }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis">Shelf Structure</p>
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        @click="isEditMode = !isEditMode"
      >
        {{ isEditMode ? 'View Mode' : 'Edit Mode' }}
      </v-btn>
    </div>

    <!-- Shelf Navigation -->
    <v-card class="mb-6" elevation="0">
      <v-tabs
        v-model="activeShelf"
        color="warning"
        align-tabs="center"
        class="shelf-tabs"
      >
        <v-tab
          v-for="shelf in shelves"
          :key="shelf.id"
          :value="shelf.id"
          class="text-none"
        >
          {{ shelf.name }}
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- Shelf Grid -->
    <v-card elevation="0" class="shelf-grid pa-4">
      <div class="shelf-container">
        <div v-for="row in 4" :key="row" class="shelf-row">
          <div class="shelf-label">
            S1-C{{ activeShelf }}-R{{ 5-row }}
          </div>
          <div 
            class="shelf-slot"
            :class="{ 'is-edit-mode': isEditMode }"
            @click="isEditMode && editShelfSlot(activeShelf, 5-row)"
          >
            <template v-if="getShelfContent(activeShelf, 5-row)">
              <div class="shelf-content">
                <div class="product-name">{{ getShelfContent(activeShelf, 5-row).name }}</div>
                <div class="product-quantity">Qty: {{ getShelfContent(activeShelf, 5-row).quantity }}</div>
              </div>
            </template>
            <template v-else>
              <div class="empty-slot">
                <v-icon v-if="isEditMode" color="grey-lighten-1">mdi-plus</v-icon>
                <span v-else class="text-grey-lighten-1">Empty</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </v-card>

    <!-- Edit Shelf Slot Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6 pa-4">
          Edit Shelf Slot
          <div class="text-subtitle-2 mt-1">{{ selectedSlot }}</div>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form ref="form">
            <v-autocomplete
              v-model="editedSlot.productId"
              :items="availableProducts"
              item-title="name"
              item-value="id"
              label="Select Product"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-autocomplete>
            <v-text-field
              v-model="editedSlot.quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-btn
            variant="text"
            color="error"
            @click="clearShelfSlot"
            v-if="getShelfContent(editedSlot.shelf, editedSlot.row)"
          >
            Clear Slot
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="editDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="warning"
            @click="saveShelfSlot"
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
const isEditMode = ref(false)
const editDialog = ref(false)
const activeShelf = ref(1)
const editedSlot = ref({})
const selectedSlot = ref('')

const store = {
  name: route.params.name
}

const shelves = [
  { id: 1, name: 'SHELF 1' },
  { id: 2, name: 'SHELF 2' },
  { id: 3, name: 'SHELF 3' },
  { id: 4, name: 'SHELF 4' },
  { id: 5, name: 'SHELF 5' },
  { id: 6, name: 'SHELF 6' }
]

const availableProducts = [
  { id: 1, name: 'WS Fiber Patch Cable 60m' },
  { id: 2, name: 'WS Fiber Patch Cable 70m' },
  { id: 3, name: '18mm Cable Clip' },
  { id: 4, name: 'K-010G GPON ONU Alcatel' }
]

const shelfContents = ref({
  // Shelf 1
  'S1-C1-R4': { name: 'WS Fiber Patch Cable 60m', quantity: 10 },
  'S1-C1-R3': { name: 'WS Fiber Patch Cable 80m', quantity: 5 },
  'S1-C1-R2': { name: 'WS Fiber Patch Cable 100m', quantity: 8 },
  'S1-C1-R1': { name: 'WS Fiber Patch Cable 100m', quantity: 12 },
  
  // Shelf 2
  'S1-C2-R4': { name: 'WS Fiber Patch Cable 50m', quantity: 15 },
  'S1-C2-R3': { name: 'WS Fiber Patch Cable 40m', quantity: 7 },
  'S1-C2-R2': { name: 'WS Fiber Patch Cable 30m', quantity: 20 },
  'S1-C2-R1': { name: 'WS Fiber Patch Cable 30m', quantity: 18 },
  
  // Shelf 3
  'S1-C3-R4': { name: '18mm Cable Clip', quantity: 100 },
  'S1-C3-R3': { name: '3 mm Cable Clip', quantity: 150 },
  'S1-C3-R2': { name: '8 mm Cable Clip', quantity: 120 },
  'S1-C3-R1': { name: '3 mm Cable Clip', quantity: 200 },
  
  // Shelf 4
  'S1-C4-R4': { name: 'K-010G GPON ONU Alcatel', quantity: 25 },
  'S1-C4-R3': { name: 'K-010G GPON ONU Alcatel', quantity: 30 },
  'S1-C4-R2': { name: 'K-010G GPON ONU Alcatel', quantity: 20 },
  'S1-C4-R1': { name: 'K-010G GPON ONU Alcatel', quantity: 15 }
})

const getShelfContent = (shelf, row) => {
  const key = `S1-C${shelf}-R${row}`
  return shelfContents.value[key]
}

const editShelfSlot = (shelf, row) => {
  const key = `S1-C${shelf}-R${row}`
  selectedSlot.value = key
  editedSlot.value = {
    shelf,
    row,
    productId: null,
    quantity: 0
  }
  
  const content = shelfContents.value[key]
  if (content) {
    const product = availableProducts.find(p => p.name === content.name)
    if (product) {
      editedSlot.value.productId = product.id
      editedSlot.value.quantity = content.quantity
    }
  }
  
  editDialog.value = true
}

const saveShelfSlot = () => {
  const key = `S1-C${editedSlot.value.shelf}-R${editedSlot.value.row}`
  const product = availableProducts.find(p => p.id === editedSlot.value.productId)
  
  if (product && editedSlot.value.quantity > 0) {
    shelfContents.value[key] = {
      name: product.name,
      quantity: editedSlot.value.quantity
    }
  }
  
  editDialog.value = false
}

const clearShelfSlot = () => {
  const key = `S1-C${editedSlot.value.shelf}-R${editedSlot.value.row}`
  delete shelfContents.value[key]
  editDialog.value = false
}
</script>

<style scoped>
.shelf-tabs {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.shelf-grid {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

.shelf-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.shelf-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.shelf-label {
  width: 120px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}

.shelf-slot {
  flex: 1;
  min-height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  transition: all 0.2s ease;
}

.shelf-slot.is-edit-mode {
  cursor: pointer;
}

.shelf-slot.is-edit-mode:hover {
  border-color: var(--v-warning-base);
  background-color: rgba(255, 212, 59, 0.05);
}

.shelf-content {
  height: 100%;
}

.product-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.product-quantity {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.empty-slot {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 6px;
}

/* Dialog Styles */
.v-dialog :deep(.v-card) {
  border-radius: 12px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.v-dialog :deep(.v-card-title) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style> 