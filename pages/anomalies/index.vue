<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5">Anomalies</h2>
      <v-btn color="warning" prepend-icon="mdi-plus">
        Report Anomaly
      </v-btn>
    </div>

    <v-card>
      <v-card-title class="d-flex justify-space-between align-center px-4">
        <span>Recent Anomalies</span>
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="Search anomalies"
          single-line
          hide-details
          density="compact"
          class="max-width-200"
        ></v-text-field>
      </v-card-title>

      <v-timeline side="end" align="start" truncate-line="both">
        <v-timeline-item
          v-for="anomaly in filteredAnomalies"
          :key="anomaly.id"
          :dot-color="anomaly.severityColor"
          size="small"
        >
          <template v-slot:opposite>
            <div class="text-caption">{{ anomaly.date }}</div>
          </template>
          
          <v-card>
            <v-card-title class="text-subtitle-1 d-flex align-center">
              <v-icon
                :color="anomaly.severityColor"
                class="me-2"
                size="small"
              >
                {{ anomaly.icon }}
              </v-icon>
              {{ anomaly.title }}
              <v-chip
                :color="anomaly.statusColor"
                size="x-small"
                class="text-uppercase ms-2"
              >
                {{ anomaly.status }}
              </v-chip>
            </v-card-title>

            <v-card-text>
              <p class="text-body-2 mb-2">{{ anomaly.description }}</p>
              <div class="d-flex align-center text-caption text-grey">
                <v-icon size="small" class="me-1">mdi-map-marker</v-icon>
                {{ anomaly.location }}
                <v-icon size="small" class="ms-3 me-1">mdi-account</v-icon>
                {{ anomaly.reporter }}
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                variant="text"
                density="comfortable"
                @click="viewDetails(anomaly)"
              >
                View Details
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                v-if="anomaly.status === 'Open'"
                color="success"
                variant="text"
                density="comfortable"
                @click="resolveAnomaly(anomaly)"
              >
                Resolve
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const anomalies = [
  {
    id: 'ANM001',
    title: 'Inventory Count Mismatch',
    description: 'Physical count shows 45 laptops while system shows 50 laptops in Main Warehouse.',
    date: '2024-03-15 14:30',
    severity: 'High',
    severityColor: 'error',
    status: 'Open',
    statusColor: 'error',
    location: 'Main Warehouse',
    reporter: 'John Doe',
    icon: 'mdi-alert-circle'
  },
  {
    id: 'ANM002',
    title: 'Damaged Shipment',
    description: '3 devices found damaged during receiving inspection from latest shipment.',
    date: '2024-03-14 09:15',
    severity: 'Medium',
    severityColor: 'warning',
    status: 'In Progress',
    statusColor: 'warning',
    location: 'Regional Hub - North',
    reporter: 'Sarah Smith',
    icon: 'mdi-package-variant-closed'
  },
  {
    id: 'ANM003',
    title: 'System Sync Error',
    description: 'Inventory sync failed between local and cloud database.',
    date: '2024-03-13 16:45',
    severity: 'Low',
    severityColor: 'info',
    status: 'Resolved',
    statusColor: 'success',
    location: 'System Wide',
    reporter: 'Tech Support',
    icon: 'mdi-sync-alert'
  }
]

const filteredAnomalies = computed(() => {
  if (!search.value) return anomalies
  const searchLower = search.value.toLowerCase()
  return anomalies.filter(anomaly => 
    anomaly.title.toLowerCase().includes(searchLower) ||
    anomaly.description.toLowerCase().includes(searchLower) ||
    anomaly.location.toLowerCase().includes(searchLower) ||
    anomaly.reporter.toLowerCase().includes(searchLower)
  )
})

const viewDetails = (anomaly) => {
  console.log('View anomaly details:', anomaly)
}

const resolveAnomaly = (anomaly) => {
  console.log('Resolve anomaly:', anomaly)
}
</script>

<style scoped>
.max-width-200 {
  max-width: 200px;
}
</style> 