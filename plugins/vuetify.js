import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#f3d70e',
            secondary: '#f5e35e',
            accent: '#fbb339',
            background: '#ffffff',
            'text-primary': '#040707',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        variant: 'elevated',
      },
      VCard: {
        elevation: 2,
      },
    },
  })

  app.vueApp.use(vuetify)
}) 