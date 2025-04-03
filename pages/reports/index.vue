<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4 font-weight-bold text-yellow-darken-3">REPORTS</h1>
      <div class="d-flex align-center gap-4">
        <!-- Date Range Picker -->
        <div class="d-flex align-center gap-2">
          <v-text-field
            v-model="fromDate"
            label="From Date"
            type="date"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 150px"
          ></v-text-field>
          <v-text-field
            v-model="toDate"
            label="To Date"
            type="date"
            density="compact"
            variant="outlined"
            hide-details
            style="width: 150px"
          ></v-text-field>
        </div>
        <v-btn color="warning" variant="flat">
          FILTER
        </v-btn>
        <v-btn color="warning" variant="outlined" prepend-icon="mdi-microsoft-excel">
          EXPORT TO EXCEL
        </v-btn>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="d-flex gap-6 mb-6">
      <!-- Monthly Device Movement Chart -->
      <v-card class="flex-grow-1" elevation="0">
        <v-card-title class="text-subtitle-1 font-weight-bold">
          Monthly Device Movement
        </v-card-title>
        <v-card-text>
          <v-chart class="chart" :option="deviceMovementOption" autoresize></v-chart>
        </v-card-text>
      </v-card>

      <!-- Device Category Distribution Chart -->
      <v-card class="flex-grow-1" elevation="0">
        <v-card-title class="text-subtitle-1 font-weight-bold">
          Device Category Distribution
        </v-card-title>
        <v-card-text>
          <v-chart class="chart" :option="categoryDistributionOption" autoresize></v-chart>
        </v-card-text>
      </v-card>
    </div>

    <!-- Monthly Defect Rate Chart -->
    <v-card class="mb-6" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold">
        Monthly Defect Rate
      </v-card-title>
      <v-card-text>
        <v-chart class="chart" :option="defectRateOption" autoresize style="height: 300px"></v-chart>
      </v-card-text>
    </v-card>

    <!-- Tabs and Table -->
    <v-card elevation="0">
      <v-tabs v-model="activeTab" color="warning">
        <v-tab value="checked">Checked Devices</v-tab>
        <v-tab value="returned">Returned Products</v-tab>
        <v-tab value="defected">Defected Items</v-tab>
      </v-tabs>

      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Beginning</th>
              <th>Checked In Count</th>
              <th>Checked Out</th>
              <th>Ending Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.beginning }}</td>
              <td>{{ item.checkedIn }}</td>
              <td>{{ item.checkedOut }}</td>
              <td>{{ item.ending }}</td>
              <td>
                <v-btn icon="mdi-plus" size="small" variant="text" color="warning"></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

// Register ECharts components
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const fromDate = ref('')
const toDate = ref('')
const activeTab = ref('checked')

// Monthly Device Movement Chart
const deviceMovementOption = {
  color: ['#FFD43B', '#E2E8F0'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Checked Out', 'Returned']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Checked Out',
      type: 'bar',
      data: [40, 28, 35, 30, 45, 40]
    },
    {
      name: 'Returned',
      type: 'bar',
      data: [20, 25, 22, 28, 35, 38]
    }
  ]
}

// Device Category Distribution Chart
const categoryDistributionOption = {
  color: ['#FFD43B', '#FFF3B0', '#2D3748'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 42, name: 'Network Devices' },
        { value: 37, name: 'Accessories' },
        { value: 21, name: 'Cables' }
      ]
    }
  ]
}

// Monthly Defect Rate Chart
const defectRateOption = {
  color: ['#FFD43B'],
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yAxis: {
    type: 'value',
    max: 4
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [2.4, 3.2, 2.1, 1.6, 1.8, 1.5]
    }
  ]
}

// Table Data
const tableData = [
  {
    name: '3G/4G Wireless N Router',
    beginning: 0,
    checkedIn: 0,
    checkedOut: 0,
    ending: 0
  },
  {
    name: 'UISP airMAX NanoStation 5AC Loco',
    beginning: 0,
    checkedIn: 1,
    checkedOut: 1,
    ending: 0
  },
  {
    name: 'UISP Fiber NanoG',
    beginning: 0,
    checkedIn: 1,
    checkedOut: 1,
    ending: 0
  }
]
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.gap-4 {
  gap: 16px;
}

.gap-6 {
  gap: 24px;
}

.chart {
  height: 300px;
}

.v-card {
  border: 1px solid #eee !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}

:deep(.v-table) {
  background: transparent;
}

:deep(.v-table th) {
  font-weight: 600 !important;
  color: #374151 !important;
  text-transform: uppercase;
  font-size: 0.75rem !important;
  letter-spacing: 0.05em;
}

:deep(.v-table td) {
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}
</style> 