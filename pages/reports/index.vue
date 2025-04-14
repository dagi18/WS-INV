<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="display-1 font-weight-bold yellow--text text--darken-3">REPORTS</h1>
      <div class="d-flex align-center">
        <!-- Date Range Picker -->
        <div class="d-flex align-center mr-4">
          <v-text-field
            v-model="fromDate"
            label="From Date"
            type="date"
            dense
            outlined
            hide-details
            class="mr-2"
            style="width: 150px"
          ></v-text-field>
          <v-text-field
            v-model="toDate"
            label="To Date"
            type="date"
            dense
            outlined
            hide-details
            style="width: 150px"
          ></v-text-field>
        </div>
        <v-btn color="warning" class="mr-2">
          FILTER
        </v-btn>
        <v-btn color="warning" outlined class="mr-2">
          <v-icon left>mdi-microsoft-excel</v-icon>
          EXPORT TO EXCEL
        </v-btn>
      </div>
    </div>

    <!-- Charts Grid -->
    <v-row class="mb-6">
      <!-- Inventory Value Chart -->
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="subtitle-1 font-weight-bold">
            Inventory Value Trend
          </v-card-title>
          <v-card-text>
            <client-only>
              <v-chart class="chart" :option="inventoryValueOption" autoresize></v-chart>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Stock Level Chart -->
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="subtitle-1 font-weight-bold">
            Stock Level Analysis
          </v-card-title>
          <v-card-text>
            <client-only>
              <v-chart class="chart" :option="stockLevelOption" autoresize></v-chart>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Second Row of Charts -->
    <v-row class="mb-6">
      <!-- Monthly Device Movement Chart -->
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="subtitle-1 font-weight-bold">
            Monthly Device Movement
          </v-card-title>
          <v-card-text>
            <client-only>
              <v-chart class="chart" :option="deviceMovementOption" autoresize></v-chart>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Device Category Distribution Chart -->
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="subtitle-1 font-weight-bold">
            Device Category Distribution
          </v-card-title>
          <v-card-text>
            <client-only>
              <v-chart class="chart" :option="categoryDistributionOption" autoresize></v-chart>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Third Row of Charts -->
    <v-row class="mb-6">
      <!-- Monthly Defect Rate Chart -->
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="subtitle-1 font-weight-bold">
            Monthly Defect Rate
          </v-card-title>
          <v-card-text>
            <client-only>
              <v-chart class="chart" :option="defectRateOption" autoresize></v-chart>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Vendor Performance Chart -->
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title class="subtitle-1 font-weight-bold">
            Vendor Performance
          </v-card-title>
          <v-card-text>
            <client-only>
              <v-chart class="chart" :option="vendorPerformanceOption" autoresize></v-chart>
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabs and Tables -->
    <v-card flat>
      <v-tabs v-model="activeTab" color="warning">
        <v-tab>Inventory Summary</v-tab>
        <v-tab>Device Movement</v-tab>
        <v-tab>Defect Analysis</v-tab>
        <v-tab>Vendor Performance</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <!-- Inventory Summary Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="inventoryHeaders"
                :items="inventorySummary"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.value="{ item }">
                  {{ item.value.toLocaleString() }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn icon small color="warning">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Device Movement Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="movementHeaders"
                :items="movementData"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon small color="warning">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Defect Analysis Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="defectHeaders"
                :items="defectData"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon small color="warning">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Vendor Performance Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="vendorHeaders"
                :items="vendorData"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.defectRate="{ item }">
                  {{ item.defectRate }}%
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn icon small color="warning">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

// Register ECharts components
echarts.use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

export default {
  data() {
    return {
      fromDate: '',
      toDate: '',
      activeTab: 0,
      inventoryHeaders: [
        { text: 'Category', value: 'category' },
        { text: 'Total Items', value: 'totalItems' },
        { text: 'In Stock', value: 'inStock' },
        { text: 'On Order', value: 'onOrder' },
        { text: 'Value (ETB)', value: 'value' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      movementHeaders: [
        { text: 'Device', value: 'name' },
        { text: 'Beginning', value: 'beginning' },
        { text: 'Checked In', value: 'checkedIn' },
        { text: 'Checked Out', value: 'checkedOut' },
        { text: 'Ending', value: 'ending' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      defectHeaders: [
        { text: 'Device', value: 'device' },
        { text: 'Total Defects', value: 'total' },
        { text: 'Critical', value: 'critical' },
        { text: 'Major', value: 'major' },
        { text: 'Minor', value: 'minor' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      vendorHeaders: [
        { text: 'Vendor', value: 'vendor' },
        { text: 'Total Orders', value: 'totalOrders' },
        { text: 'On Time', value: 'onTime' },
        { text: 'Late', value: 'late' },
        { text: 'Defect Rate', value: 'defectRate' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      inventorySummary: [
        {
          category: 'Network Devices',
          totalItems: 150,
          inStock: 120,
          onOrder: 30,
          value: 2500000
        },
        {
          category: 'Accessories',
          totalItems: 300,
          inStock: 250,
          onOrder: 50,
          value: 750000
        },
        {
          category: 'Cables',
          totalItems: 500,
          inStock: 400,
          onOrder: 100,
          value: 500000
        }
      ],
      movementData: [
        {
          name: 'UISP airMAX NanoStation',
          beginning: 15,
          checkedIn: 5,
          checkedOut: 8,
          ending: 12
        },
        {
          name: 'EdgeRouter X',
          beginning: 20,
          checkedIn: 10,
          checkedOut: 12,
          ending: 18
        }
      ],
      defectData: [
        {
          device: 'UISP airMAX NanoStation',
          total: 5,
          critical: 1,
          major: 2,
          minor: 2
        },
        {
          device: 'EdgeRouter X',
          total: 3,
          critical: 0,
          major: 1,
          minor: 2
        }
      ],
      vendorData: [
        {
          vendor: 'Ubiquiti Networks',
          totalOrders: 25,
          onTime: 23,
          late: 2,
          defectRate: 2.5
        },
        {
          vendor: 'TP-Link',
          totalOrders: 18,
          onTime: 16,
          late: 2,
          defectRate: 3.8
        }
      ]
    }
  },
  computed: {
    inventoryValueOption() {
      return {
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
          name: 'Value (ETB)',
          nameTextStyle: {
            padding: [0, 0, 0, 50]
          }
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: [250000, 280000, 310000, 290000, 320000, 350000]
          }
        ]
      }
    },
    stockLevelOption() {
      return {
        color: ['#FFD43B', '#E2E8F0'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['In Stock', 'On Order']
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
            name: 'In Stock',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230]
          },
          {
            name: 'On Order',
            type: 'bar',
            data: [20, 32, 21, 34, 10, 30]
          }
        ]
      }
    },
    deviceMovementOption() {
      return {
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
    },
    categoryDistributionOption() {
      return {
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
    },
    defectRateOption() {
      return {
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
    },
    vendorPerformanceOption() {
      return {
        color: ['#FFD43B', '#E2E8F0'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['On Time Delivery', 'Defect Rate']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D']
        },
        yAxis: [
          {
            type: 'value',
            name: 'On Time %',
            max: 100
          },
          {
            type: 'value',
            name: 'Defect Rate %',
            max: 10
          }
        ],
        series: [
          {
            name: 'On Time Delivery',
            type: 'bar',
            data: [95, 88, 92, 85]
          },
          {
            name: 'Defect Rate',
            type: 'line',
            yAxisIndex: 1,
            data: [2.5, 3.8, 2.1, 4.2]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 300px;
}

.v-card {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.v-data-table {
  border-radius: 4px;
}

.v-data-table >>> thead th {
  background-color: #f5f5f5;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.v-data-table >>> tbody tr:hover {
  background-color: rgba(255, 212, 59, 0.05);
}
</style> 