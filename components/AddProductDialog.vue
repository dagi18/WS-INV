<template>
  <v-dialog v-model="dialog" width="800" persistent>
    <v-card class="add-product-dialog">
      <v-card-title class="d-flex justify-space-between align-center pa-6">
        <span class="text-h5 font-weight-bold">Add New Product</span>
        <v-btn icon="mdi-close" variant="text" @click="closeDialog"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid" @submit.prevent="saveProduct">
          <div class="d-flex flex-wrap gap-4">
            <!-- Left Column -->
            <div class="flex-grow-1" style="min-width: 300px;">
              <v-text-field
                v-model="product.name"
                label="Product Name"
                :rules="[v => !!v || 'Product name is required']"
                variant="outlined"
                density="comfortable"
                class="mb-4"
              ></v-text-field>

              <div class="d-flex gap-4 mb-4">
                <v-select
                  v-model="product.category"
                  :items="categories"
                  label="Category"
                  :rules="[v => !!v || 'Category is required']"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                  @update:model-value="handleCategoryChange"
                ></v-select>

                <v-select
                  v-model="product.subCategory"
                  :items="availableSubCategories"
                  label="Sub Category"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                  :disabled="!product.category || availableSubCategories.length === 0"
                ></v-select>
              </div>

              <div class="d-flex gap-4 mb-4">
                <v-select
                  v-model="product.vendor"
                  :items="vendors"
                  label="Vendor"
                  :rules="[v => !!v || 'Vendor is required']"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                ></v-select>
              </div>

              <div class="d-flex gap-4 mb-4">
                <v-text-field
                  v-model="product.modelNo"
                  label="Model Number"
                  :rules="[v => !!v || 'Model number is required']"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                ></v-text-field>

                <v-text-field
                  v-model="product.sku"
                  label="SKU"
                  :rules="[v => !!v || 'SKU is required']"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                ></v-text-field>
              </div>

              <v-textarea
                v-model="product.description"
                label="Product Description"
                :rules="[v => !!v || 'Description is required']"
                variant="outlined"
                density="comfortable"
                rows="4"
                class="mb-4"
              ></v-textarea>
            </div>

            <!-- Right Column -->
            <div class="flex-grow-1" style="min-width: 300px;">
              <div class="upload-section mb-4">
                <div class="upload-area" @click="triggerImageUpload">
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    style="display: none"
                    @change="handleImageUpload"
                  >
                  <div v-if="!product.image" class="upload-placeholder">
                    <v-icon size="40" color="grey-lighten-1">mdi-image-plus</v-icon>
                    <div class="text-grey mt-2">Click to upload product image</div>
                  </div>
                  <v-img
                    v-else
                    :src="product.image"
                    cover
                    height="200"
                  ></v-img>
                </div>
              </div>

              <div class="d-flex gap-4 mb-4">
                <v-text-field
                  v-model="product.barcode"
                  label="Barcode"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                ></v-text-field>

                <v-text-field
                  v-model="product.hsCode"
                  label="HS Code"
                  variant="outlined"
                  density="comfortable"
                  class="flex-grow-1"
                ></v-text-field>
              </div>

              <v-card variant="outlined" class="pa-4 mb-4">
                <div class="text-subtitle-1 font-weight-medium mb-4">Stock Information</div>
                <div class="d-flex gap-4 mb-4">
                  <v-text-field
                    v-model.number="product.stock.inStock"
                    label="Initial Stock"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    class="flex-grow-1"
                  ></v-text-field>

                  <v-text-field
                    v-model.number="product.stock.minThreshold"
                    label="Min. Threshold"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    class="flex-grow-1"
                  ></v-text-field>
                </div>

                <div class="d-flex gap-4">
                  <v-text-field
                    v-model.number="product.stock.criticalThreshold"
                    label="Critical Threshold"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    class="flex-grow-1"
                  ></v-text-field>

                  <v-text-field
                    v-model.number="product.stock.onOrder"
                    label="On Order"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    class="flex-grow-1"
                  ></v-text-field>
                </div>
              </v-card>
            </div>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          color="grey"
          @click="closeDialog"
          class="mr-4"
          :disabled="loading"
        >
          Cancel
        </v-btn>
        <v-btn
          color="warning"
          variant="flat"
          @click="saveProduct"
          :loading="loading"
          :disabled="!valid"
        >
          Save Product
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useProductForm } from '@/composables/useProductForm'
import { categories, vendors } from '@/composables/useProductForm'
import '@/assets/styles/components/AddProductDialog.css'

const emit = defineEmits(['product-added'])
const {
  dialog,
  valid,
  loading,
  form,
  fileInput,
  product,
  availableSubCategories,
  handleCategoryChange,
  triggerImageUpload,
  handleImageUpload,
  closeDialog,
  saveProduct
} = useProductForm(emit)

defineExpose({
  dialog
})
</script>

<style scoped>
.add-product-dialog {
  border-radius: 12px;
}

.gap-4 {
  gap: 16px;
}

.upload-section {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.upload-section:hover {
  border-color: #f4d609;
  cursor: pointer;
}

.upload-area {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.upload-placeholder {
  text-align: center;
}

:deep(.v-field) {
  border-radius: 8px;
}

:deep(.v-field__outline) {
  border-color: #e2e8f0 !important;
}

:deep(.v-field--focused .v-field__outline) {
  border-color: #f4d609 !important;
}

:deep(.v-label) {
  font-size: 0.875rem;
  color: #64748b;
}

.v-card-title {
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style> 