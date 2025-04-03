<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5">Inventory Tally</h2>
      <v-btn color="warning" prepend-icon="mdi-refresh">
        Refresh Data
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <div class="text-h6 mb-2">Total Devices</div>
            <div class="d-flex align-center">
              <div class="text-h4">455</div>
              <v-chip color="success" size="small" class="ms-2">
                +12 this week
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <div class="text-h6 mb-2">In Use</div>
            <div class="d-flex align-center">
              <div class="text-h4">378</div>
              <div class="text-caption text-grey ms-2">(83.1%)</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <div class="text-h6 mb-2">Available</div>
            <div class="d-flex align-center">
              <div class="text-h4">77</div>
              <div class="text-caption text-grey ms-2">(16.9%)</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="mt-6">
      <v-card-title class="d-flex justify-space-between align-center px-4">
        <span>Inventory Count by Location</span>
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search locations"
          single-line
          hide-details
          density="compact"
          class="max-width-200"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="locations"
        :search="search"
        hover
      >
        <template v-slot:item.variance="{ item }">
          <div :class="getVarianceClass(item.raw.variance)">
            {{ item.raw.variance > 0 ? '+' : '' }}{{ item.raw.variance }}
          </div>
        </template>

        <template v-slot:item.lastCount="{ item }">
          {{ formatDate(item.raw.lastCount) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            variant="text"
            color="warning"
            size="small"
            @click="startCount(item.raw)"
          >
            Start Count
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

const headers = [
  { title: 'Location', align: 'start', key: 'name' },
  { title: 'System Count', key: 'systemCount', align: 'center' },
  { title: 'Physical Count', key: 'physicalCount', align: 'center' },
  { title: 'Variance', key: 'variance', align: 'center' },
  { title: 'Last Count', key: 'lastCount', align: 'center' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false }
]

const locations = [
  {
    name: 'Main Warehouse',
    systemCount: 250,
    physicalCount: 248,
    variance: -2,
    lastCount: '2024-03-15T14:30:00'
  },
  {
    name: 'Regional Hub - North',
    systemCount: 120,
    physicalCount: 120,
    variance: 0,
    lastCount: '2024-03-14T09:15:00'
  },
  {
    name: 'Regional Hub - South',
    systemCount: 85,
    physicalCount: 86,
    variance: 1,
    lastCount: '2024-03-13T16:45:00'
  }
]

const getVarianceClass = (variance) => {
  if (variance > 0) return 'text-success'
  if (variance < 0) return 'text-error'
  return 'text-grey'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

const startCount = (location) => {
  console.log('Start count for location:', location)
}
</script>

<style scoped>
.max-width-200 {
  max-width: 200px;
}
</style> 