<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-4">Vendors</h1>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>All Vendors</span>
            <v-btn
              color="warning"
              prepend-icon="mdi-plus"
            >
              Add Vendor
            </v-btn>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>Vendor ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vendor in vendors" :key="vendor.id">
                <td>{{ vendor.id }}</td>
                <td>
                  <div class="d-flex align-center">
                    <v-avatar size="32" class="mr-2">
                      <v-img :src="vendor.logo" />
                    </v-avatar>
                    {{ vendor.name }}
                  </div>
                </td>
                <td>{{ vendor.category }}</td>
                <td>
                  <v-chip
                    :color="vendor.statusColor"
                    size="small"
                    variant="flat"
                  >
                    {{ vendor.status }}
                  </v-chip>
                </td>
                <td>{{ vendor.products }}</td>
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
          <v-card-title>Vendor Statistics</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Active Vendors</span>
                <span>15</span>
              </div>
              <v-progress-linear
                color="success"
                height="8"
                rounded
                value="75"
              ></v-progress-linear>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Pending Approval</span>
                <span>3</span>
              </div>
              <v-progress-linear
                color="warning"
                height="8"
                rounded
                value="15"
              ></v-progress-linear>
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span>Total Products</span>
                <span>156</span>
              </div>
              <v-progress-linear
                color="primary"
                height="8"
                rounded
                value="60"
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const vendors = [
  {
    id: 'VEN001',
    name: 'TP-Link',
    logo: 'https://placeholder.co/32',
    category: 'Network Equipment',
    status: 'Active',
    statusColor: 'success',
    products: '45 products'
  },
  {
    id: 'VEN002',
    name: 'Cisco Systems',
    logo: 'https://placeholder.co/32',
    category: 'Enterprise Solutions',
    status: 'Active',
    statusColor: 'success',
    products: '78 products'
  },
  {
    id: 'VEN003',
    name: 'Ubiquiti',
    logo: 'https://placeholder.co/32',
    category: 'Wireless Equipment',
    status: 'Pending',
    statusColor: 'warning',
    products: '33 products'
  }
]
</script> 