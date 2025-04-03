<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5">Stores</h2>
      <v-btn color="warning" prepend-icon="mdi-plus">
        Add Store
      </v-btn>
    </div>

    <v-row>
      <v-col
        v-for="store in stores"
        :key="store.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img
            :src="store.image"
            height="200"
            cover
            class="bg-grey-lighten-2"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="warning"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title class="d-flex justify-space-between align-center">
            {{ store.name }}
            <v-chip
              :color="store.statusColor"
              size="small"
              class="text-uppercase"
            >
              {{ store.status }}
            </v-chip>
          </v-card-title>

          <v-card-text>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" class="me-2">mdi-map-marker</v-icon>
              {{ store.location }}
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" class="me-2">mdi-devices</v-icon>
              {{ store.devices }} Devices
            </div>
            <div class="d-flex align-center">
              <v-icon size="small" class="me-2">mdi-account-group</v-icon>
              {{ store.staff }} Staff
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              variant="text"
              color="warning"
              @click="viewStore(store)"
            >
              View Details
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              size="small"
              @click="editStore(store)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="error"
              @click="deleteStore(store)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const stores = [
  {
    id: 'STR001',
    name: 'Main Warehouse',
    location: 'Addis Ababa, Ethiopia',
    devices: 250,
    staff: 15,
    status: 'Active',
    statusColor: 'success',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  },
  {
    id: 'STR002',
    name: 'Regional Hub - North',
    location: 'Mekelle, Ethiopia',
    devices: 120,
    staff: 8,
    status: 'Active',
    statusColor: 'success',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  },
  {
    id: 'STR003',
    name: 'Regional Hub - South',
    location: 'Hawassa, Ethiopia',
    devices: 85,
    staff: 6,
    status: 'Maintenance',
    statusColor: 'warning',
    image: 'https://images.unsplash.com/photo-1565891741441-64926e441838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
  }
]

const viewStore = (store) => {
  console.log('View store:', store)
}

const editStore = (store) => {
  console.log('Edit store:', store)
}

const deleteStore = (store) => {
  console.log('Delete store:', store)
}
</script> 