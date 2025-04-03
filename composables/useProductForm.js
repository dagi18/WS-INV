import { ref, reactive, computed } from 'vue'

export const categoryMap = {
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
  'Routers': {
    icon: 'mdi-router-wireless',
    subCategories: ['Wireless', 'Wired', 'Enterprise']
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

export const categories = [
  'Networking',
  'Fiber Optics',
  'Cables',
  'Routers',
  'Power Supplies',
  'Accessories',
  'Cable Management',
  'Network Terminals'
]

export const vendors = [
  'Ubiquiti Networks',
  'TP-Link',
  'Digital Connections',
  'Cable Solutions',
  'WebSprix',
  'Plantronics',
  'Generic'
]

export function useProductForm(emit) {
  const dialog = ref(false)
  const valid = ref(false)
  const loading = ref(false)
  const form = ref(null)
  const fileInput = ref(null)

  const product = reactive({
    name: '',
    category: '',
    subCategory: '',
    vendor: '',
    modelNo: '',
    sku: '',
    description: '',
    image: null,
    barcode: '',
    hsCode: '',
    stock: {
      inStock: 0,
      onOrder: 0,
      minThreshold: 0,
      criticalThreshold: 0
    }
  })

  const availableSubCategories = computed(() => {
    if (!product.category) return []
    return categoryMap[product.category]?.subCategories || []
  })

  const handleCategoryChange = () => {
    product.subCategory = ''
  }

  const triggerImageUpload = () => {
    fileInput.value.click()
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        product.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const closeDialog = () => {
    dialog.value = false
    resetForm()
  }

  const resetForm = () => {
    product.name = ''
    product.category = ''
    product.subCategory = ''
    product.vendor = ''
    product.modelNo = ''
    product.sku = ''
    product.description = ''
    product.image = null
    product.barcode = ''
    product.hsCode = ''
    product.stock.inStock = 0
    product.stock.onOrder = 0
    product.stock.minThreshold = 0
    product.stock.criticalThreshold = 0
    form.value?.reset()
  }

  const saveProduct = async () => {
    if (!form.value?.validate()) return

    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Emit event to parent
      emit('product-added')
      
      // Close dialog and reset form
      closeDialog()
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      loading.value = false
    }
  }

  return {
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
  }
} 