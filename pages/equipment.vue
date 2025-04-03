<template>
  <div>
    <v-row>
      <v-col cols="12">
        <EquipmentTable
          @add-equipment="openAddDialog"
          @edit-equipment="openEditDialog"
          @view-history="openHistoryDialog"
          @delete-equipment="confirmDelete"
        />
      </v-col>
    </v-row>

    <!-- Add/Edit Equipment Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Edit' : 'Add' }} Equipment</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.category"
                  :items="categories"
                  label="Category"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.status"
                  :items="statuses"
                  label="Status"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.location"
                  label="Location"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Delete Equipment</v-card-title>
        <v-card-text>
          Are you sure you want to delete this equipment?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="text" @click="deleteItem">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- History Dialog -->
    <v-dialog v-model="historyDialog" max-width="800px">
      <v-card>
        <v-card-title class="text-h5">Equipment History</v-card-title>
        <v-card-text>
          <v-timeline density="compact">
            <v-timeline-item
              v-for="(event, i) in historyEvents"
              :key="i"
              :dot-color="event.color"
              size="small"
            >
              <div class="d-flex justify-space-between">
                <div>
                  <div class="text-subtitle-2">{{ event.action }}</div>
                  <div class="text-caption">{{ event.description }}</div>
                </div>
                <div class="text-caption">{{ event.date }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="historyDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EquipmentTable from '~/components/EquipmentTable.vue'

const dialog = ref(false)
const deleteDialog = ref(false)
const historyDialog = ref(false)
const isEditing = ref(false)
const editedItem = ref({
  name: '',
  category: '',
  status: '',
  location: '',
})
const itemToDelete = ref(null)

const categories = [
  'Network Equipment',
  'Servers',
  'Storage Devices',
  'Security Equipment',
  'Peripherals',
]

const statuses = [
  'Active',
  'Maintenance',
  'Inactive',
  'Pending',
]

const historyEvents = ref([
  {
    action: 'Equipment Added',
    description: 'Initial setup and configuration',
    date: '2024-03-15',
    color: 'success',
  },
  {
    action: 'Status Updated',
    description: 'Changed status to Maintenance',
    date: '2024-03-16',
    color: 'warning',
  },
  {
    action: 'Location Changed',
    description: 'Moved to Data Center',
    date: '2024-03-17',
    color: 'info',
  },
])

const openAddDialog = () => {
  isEditing.value = false
  editedItem.value = {
    name: '',
    category: '',
    status: '',
    location: '',
  }
  dialog.value = true
}

const openEditDialog = (item) => {
  isEditing.value = true
  editedItem.value = { ...item }
  dialog.value = true
}

const openHistoryDialog = (item) => {
  historyDialog.value = true
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const save = () => {
  // Implement save logic here
  dialog.value = false
}

const deleteItem = () => {
  // Implement delete logic here
  deleteDialog.value = false
}
</script> 