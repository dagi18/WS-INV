<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4 font-weight-bold text-yellow-darken-3">PRODUCTS</h1>
      <v-btn
        color="warning"
        prepend-icon="mdi-plus"
        variant="flat"
        @click="openAddProduct"
      >
        Add Product
      </v-btn>
    </div>

    <!-- Search and Filter Section -->
    <v-card class="mb-6 pa-4" elevation="0">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search products"
        variant="outlined"
        hide-details
        class="mb-4"
      ></v-text-field>

      <!-- Categories -->
      <div class="categories-section mb-4">
        <!-- Main Categories -->
        <div class="d-flex flex-wrap gap-2">
          <v-btn
            v-for="category in categories"
            :key="category"
            :class="[
              'category-btn text-none',
              selectedCategory === category ? 'selected-category' : ''
            ]"
            :color="selectedCategory === category ? undefined : undefined"
            :variant="selectedCategory === category ? 'flat' : 'text'"
            rounded="pill"
            @click="selectCategory(category)"
          >
            {{ category }}
            <span v-if="getCategoryCount(category)" class="count-indicator ml-2">
              • {{ getCategoryCount(category) }}
            </span>
          </v-btn>
        </div>

        <!-- Sub Categories -->
        <div v-if="showSubCategories" class="sub-categories mt-4">
          <div class="d-flex flex-wrap gap-2">
            <v-btn
              v-for="subCat in currentSubCategories"
              :key="subCat"
              :class="[
                'sub-category-btn text-none',
                selectedSubCategory === subCat ? 'selected-sub-category' : ''
              ]"
              :color="selectedSubCategory === subCat ? 'grey-darken-4' : 'grey'"
              :variant="selectedSubCategory === subCat ? 'flat' : 'text'"
              density="comfortable"
              size="small"
              rounded="pill"
              @click="selectSubCategory(subCat)"
            >
              {{ subCat }}
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>

    <!-- Products Table -->
    <v-card elevation="0">
      <v-data-table
        :headers="headers"
        :items="filteredProducts"
        :search="search"
      >
        <template #[`item.product`]="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="40" class="bg-grey-lighten-3 mr-3">
              <v-img :src="item.image" v-if="item.image"></v-img>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-caption text-grey">{{ item.category }}</div>
            </div>
          </div>
        </template>

        <template #[`item.vendor`]="{ item }">
          <div class="d-flex align-center">
            <v-icon size="18" class="mr-2">{{ item.vendorIcon }}</v-icon>
            {{ item.vendor }}
          </div>
        </template>

        <template #[`item.actions`]="{ item }">
          <div class="d-flex gap-2">
            <v-btn
              color="black"
              size="small"
              variant="flat"
              class="text-none view-btn"
              @click="navigateToProduct(item.sku)"
            >
              View
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add Product Dialog -->
    <AddProductDialog ref="addProductDialog" @product-added="refreshProducts" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AddProductDialog from '~/components/AddProductDialog.vue'

const router = useRouter()

const search = ref('')
const selectedCategory = ref('All')
const selectedSubCategory = ref(null)
const addProductDialog = ref(null)

// Update categories to be a simple array
const categories = ['All', 'Networking', 'Fiber Optics', 'Cables', 'Routers', 'Power Supplies', 'Accessories', 'Cable Management', 'Network Terminals']

const subCategories = {
  cables: ['Ethernet', 'Fiber', 'Power'],
  networking: ['Access Points', 'Bridges', 'Terminals']
}

const headers = [
  {
    title: 'Product',
    key: 'product',
    align: 'start',
  },
  {
    title: 'Vendor',
    key: 'vendor',
    align: 'start',
  },
  {
    title: 'Model No.',
    key: 'modelNo',
    align: 'start',
  },
  {
    title: 'SKU',
    key: 'sku',
    align: 'start',
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'end',
    sortable: false,
  },
]

const products = [
  {
    name: 'UISP airMAX NanoStation 5AC Loco',
    category: 'Networking',
    vendor: 'Ubiquiti Networks',
    vendorIcon: 'mdi-wifi',
    modelNo: 'NS-5ACL-US',
    sku: 'NS-5ACL-US',
    image: '/products/nanostation.png',
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
    stock: {
      inStock: 100,
      onOrder: 50,
      minThreshold: 30,
      criticalThreshold: 15
    }
  },
  // New Recent Stock Items
  {
    name: 'DIGITAL SM LC UPC 9/125, 1.5M',
    category: 'Fiber Optic Cables',
    vendor: 'Digital Connections',
    vendorIcon: 'mdi-cable-data',
    modelNo: 'SM-LC-9125-1.5',
    sku: 'SM-LC-9125-1.5',
    image: null,
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
    stock: {
      inStock: 20,
      onOrder: 0,
      minThreshold: 10,
      criticalThreshold: 5
    }
  }
]

const showSubCategories = computed(() => selectedCategory.value !== 'All' && categoryMap[selectedCategory.value]?.subCategories?.length > 0)

const categoryMap = {
  'All': {
    icon: 'mdi-view-grid',
    subCategories: []
  },
  'Networking': {
    icon: 'mdi-network',
    subCategories: ['Access Points', 'Bridges', 'Routers', 'Switches']
  },
  'Fiber Optics': {
    icon: 'mdi-fiber-optic',
    subCategories: ['Cables', 'Terminals', 'Connectors']
  },
  'Cables': {
    icon: 'mdi-cable-data',
    subCategories: ['Ethernet', 'Fiber', 'Power']
  },
  'Power Supplies': {
    icon: 'mdi-power-plug',
    subCategories: ['PoE', 'Adapters']
  },
  'Accessories': {
    icon: 'mdi-devices',
    subCategories: ['Audio', 'Mounting']
  },
  'Cable Management': {
    icon: 'mdi-cable-data',
    subCategories: ['Trunking', 'Conduits']
  },
  'Network Terminals': {
    icon: 'mdi-router-network',
    subCategories: ['GPON', 'ONT']
  }
}

const currentSubCategories = computed(() => 
  categoryMap[selectedCategory.value]?.subCategories || []
)

const getCategoryIcon = (category) => categoryMap[category]?.icon || 'mdi-folder'

const getCategoryCount = (category) => {
  if (category === 'All') return products.length
  return products.filter(p => 
    p.category === category || 
    p.category.includes(category) ||
    categoryMap[category]?.subCategories?.some(sub => 
      p.category.includes(sub) || p.name.includes(sub)
    )
  ).length
}

const selectCategory = (category) => {
  selectedCategory.value = category
  selectedSubCategory.value = null
}

const selectSubCategory = (subCat) => {
  selectedSubCategory.value = selectedSubCategory.value === subCat ? null : subCat
}

const filteredProducts = computed(() => {
  let filtered = products

  if (selectedCategory.value !== 'All') {
    filtered = products.filter(p => 
      p.category === selectedCategory.value || 
      p.category.includes(selectedCategory.value) ||
      categoryMap[selectedCategory.value]?.subCategories?.some(sub => 
        p.category.includes(sub) || p.name.includes(sub)
      )
    )
  }

  if (selectedSubCategory.value) {
    filtered = filtered.filter(p => 
      p.category.includes(selectedSubCategory.value) || 
      p.name.includes(selectedSubCategory.value)
    )
  }

  return filtered
})

// Dialog control
const openAddProduct = () => {
  addProductDialog.value.dialog = true
}

// Refresh products after adding new one
const refreshProducts = () => {
  // Here you would typically fetch updated products from your API
  console.log('Refreshing products list...')
}

// Update the navigation function
const navigateToProduct = (sku) => {
  router.push({
    path: `/products/${sku}`,
    replace: false
  })
}
</script>

<style scoped>
.v-data-table {
  background: white;
  border-radius: 8px;
}

.v-data-table :deep(th) {
  font-weight: 600 !important;
  color: #374151 !important;
  text-transform: uppercase;
  font-size: 0.75rem !important;
  letter-spacing: 0.05em;
}

.v-data-table :deep(td) {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

.v-card {
  border: 1px solid #eee !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}

.category-filter {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.gap-2 {
  gap: 8px;
}

.categories-section {
  position: relative;
}

.category-btn {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0 16px;
  height: 32px;
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
}

.category-btn.selected-category {
  background: #f4d609 !important;
  color: black !important;
}

.count-indicator {
  opacity: 0.6;
  font-weight: normal;
}

.sub-categories {
  margin-left: 4px;
  padding-top: 8px;
  border-top: 1px solid #eee;
}

.sub-category-btn {
  font-size: 0.875rem;
  padding: 0 12px;
  height: 28px;
  color: black;
  border: 1px solid black !important;
  background: white !important;
}

.sub-category-btn.selected-sub-category {
  background: black !important;
  color: white !important;
  border: 1px solid black !important;
}

/* Remove hover effects */
.category-btn:hover,
.sub-category-btn:hover {
  transform: none;
  box-shadow: none;
}

/* Remove the yellow line */
.sub-categories {
  border-left: none;
}

.view-btn:hover {
  background-color: #f4d609 !important;
  color: black !important;
}

.v-btn.v-btn--size-small {
  min-width: 70px;
}
</style> 