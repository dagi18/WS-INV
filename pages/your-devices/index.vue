<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-4">Your Devices</h1>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Assigned Devices</span>
        <v-btn
          color="warning"
          prepend-icon="mdi-plus"
        >
          Request Device
        </v-btn>
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Product</th>
            <th>Status</th>
            <th>Location</th>
            <th>Assigned Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in assignedDevices" :key="device.id">
            <td>{{ device.id }}</td>
            <td>
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-2">{{ device.icon }}</v-icon>
                {{ device.name }}
              </div>
            </td>
            <td>
              <v-chip
                :color="device.statusColor"
                size="small"
                variant="flat"
              >
                {{ device.status }}
              </v-chip>
            </td>
            <td>{{ device.location }}</td>
            <td>{{ device.assignedDate }}</td>
            <td>
              <v-btn
                color="warning"
                size="small"
                variant="flat"
                class="mr-2"
              >
                Return
              </v-btn>
              <v-btn
                color="primary"
                size="small"
                variant="flat"
              >
                Report Issue
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup>
const assignedDevices = [
  {
    id: 'DEV001',
    name: '3G/4G WIRELESS N ROUTER',
    icon: 'mdi-router-wireless',
    status: 'Store',
    statusColor: 'success',
    location: 'BloomTech',
    assignedDate: '2024-03-01'
  },
  {
    id: 'DEV002',
    name: 'Fiber Optic Modem',
    icon: 'mdi-router',
    status: 'In Use',
    statusColor: 'info',
    location: 'BloomTech',
    assignedDate: '2024-02-15'
  },
  {
    id: 'DEV003',
    name: 'Network Switch',
    icon: 'mdi-switch',
    status: 'Check',
    statusColor: 'warning',
    location: 'BloomTech',
    assignedDate: '2024-01-20'
  }
]
</script> 