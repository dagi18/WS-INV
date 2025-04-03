<template>
  <v-card class="pa-6">
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="text-h6">Recent Activity</div>
      <v-btn
        variant="text"
        color="warning"
        class="text-none px-0"
        to="/activity"
      >
        View all →
      </v-btn>
    </div>

    <v-list class="pa-0">
      <v-list-item
        class="px-0 mb-4"
      >
        <template v-slot:prepend>
          <v-avatar
            color="warning"
            variant="tonal"
            size="40"
            class="mr-3"
          >
            <v-icon color="warning">mdi-plus-circle</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-subtitle-1 mb-1">
          Added new device
        </v-list-item-title>
        <v-list-item-subtitle class="text-body-2">
          UISP airMAX NanoStation 5AC Loco
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-caption text-grey">
          By Abraham Tibebu
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="text-caption text-grey">2 hours ago</div>
        </template>
      </v-list-item>

      <v-list-item
        class="px-0 mb-4"
      >
        <template v-slot:prepend>
          <v-avatar
            color="warning"
            variant="tonal"
            size="40"
            class="mr-3"
          >
            <v-icon color="warning">mdi-update</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-subtitle-1 mb-1">
          Updated stock count
        </v-list-item-title>
        <v-list-item-subtitle class="text-body-2">
          Fiber Patch Cable 100m
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-caption text-grey">
          By Kedir Yusuf
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="text-caption text-grey">5 hours ago</div>
        </template>
      </v-list-item>

      <v-list-item
        class="px-0"
      >
        <template v-slot:prepend>
          <v-avatar
            color="warning"
            variant="tonal"
            size="40"
            class="mr-3"
          >
            <v-icon color="warning">mdi-transfer</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-subtitle-1 mb-1">
          Transferred item
        </v-list-item-title>
        <v-list-item-subtitle class="text-body-2">
          Ethernet Cable Cat6 3m
        </v-list-item-subtitle>
        <v-list-item-subtitle class="text-caption text-grey">
          By Dawit Tesfaye
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="text-caption text-grey">1 day ago</div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.v-list-item {
  min-height: unset !important;
}

.v-list-item-title {
  font-weight: 500 !important;
}
</style> 