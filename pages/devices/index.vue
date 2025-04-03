<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-4">Devices</h1>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>All Devices</span>
        <v-btn
          color="warning"
          prepend-icon="mdi-plus"
        >
          Add Device
        </v-btn>
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices" :key="device.id">
            <td>{{ device.id }}</td>
            <td>
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-2">{{ device.icon }}</v-icon>
                {{ device.name }}
              </div>
            </td>
            <td>{{ device.category }}</td>
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
            <td>
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                class="mr-2"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="small"
                variant="text"
                color="error"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script setup>
const devices = [
  {
    id: 'DEV001',
    name: '3G/4G Wireless Router',
    icon: 'mdi-router-wireless',
    category: 'Network Devices',
    status: 'Active',
    statusColor: 'success',
    location: 'Main Office'
  },
  {
    id: 'DEV002',
    name: 'Fiber Optic Switch',
    icon: 'mdi-switch',
    category: 'Network Devices',
    status: 'Maintenance',
    statusColor: 'warning',
    location: 'Server Room'
  },
  {
    id: 'DEV003',
    name: 'VoIP Phone',
    icon: 'mdi-phone-voip',
    category: 'Communication',
    status: 'Inactive',
    statusColor: 'error',
    location: 'Branch Office'
  }
]
</script> 