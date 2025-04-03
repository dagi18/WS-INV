import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#4285F4',    // Blue for pending requests
            secondary: '#5CBBF6',
            warning: '#FFD43B',    // Yellow for total devices and buttons
            error: '#DC3545',      // Red for low stock
            info: '#2196F3',
            success: '#198754',    // Green for positive stats
            purple: '#8B5CF6',     // Purple for transfers
            orange: '#F97316',     // Orange for incomplete declarations
            background: '#F8F9FA', // Light gray background
            surface: '#FFFFFF',    // White surface
          },
        },
      },
    },
    defaults: {
      VCard: {
        elevation: 0,
      },
      VBtn: {
        variant: 'flat',
        height: 38,
      },
    },
  })

  app.vueApp.use(vuetify)
}) 