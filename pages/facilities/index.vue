<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-4">Facilities</h1>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>All Facilities</span>
            <v-btn
              color="warning"
              prepend-icon="mdi-plus"
            >
              Add Facility
            </v-btn>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>Facility ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="facility in facilities" :key="facility.id">
                <td>{{ facility.id }}</td>
                <td>
                  <div class="d-flex align-center">
                    <v-icon size="small" class="mr-2">{{ facility.icon }}</v-icon>
                    {{ facility.name }}
                  </div>
                </td>
                <td>{{ facility.type }}</td>
                <td>{{ facility.location }}</td>
                <td>
                  <v-chip
                    :color="facility.statusColor"
                    size="small"
                    variant="flat"
                  >
                    {{ facility.status }}
                  </v-chip>
                </td>
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
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Facility Overview</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Data Centers</span>
                <span>3 facilities</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="60"
              ></v-progress-linear>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Branch Offices</span>
                <span>8 facilities</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="80"
              ></v-progress-linear>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Storage Units</span>
                <span>5 facilities</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="40"
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const facilities = [
  {
    id: 'FAC001',
    name: 'Main Data Center',
    icon: 'mdi-server',
    type: 'Data Center',
    location: 'New York',
    status: 'Operational',
    statusColor: 'success'
  },
  {
    id: 'FAC002',
    name: 'BloomTech Branch',
    icon: 'mdi-office-building',
    type: 'Branch Office',
    location: 'San Francisco',
    status: 'Active',
    statusColor: 'success'
  },
  {
    id: 'FAC003',
    name: 'Storage Facility A',
    icon: 'mdi-warehouse',
    type: 'Storage',
    location: 'Chicago',
    status: 'Maintenance',
    statusColor: 'warning'
  }
]
</script> 