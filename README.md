# ISP Inventory Management Dashboard

A modern, responsive inventory management dashboard built with Vue.js/Nuxt.js and Vuetify.

## Features

- Responsive design with breakpoints for Desktop, Laptop, and Tablet
- Real-time equipment tracking and management
- Interactive data visualization
- Advanced filtering and search capabilities
- Equipment history tracking
- Multi-step forms for equipment management
- Export functionality for reports

## Technical Requirements

- Node.js 16.x or higher
- npm 7.x or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd isp-inventory-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
NUXT_PUBLIC_API_BASE_URL=your_api_url
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Project Structure

```
isp-inventory-dashboard/
├── components/         # Reusable Vue components
├── layouts/           # Layout components
├── pages/            # Application pages
├── plugins/          # Vue plugins
├── public/           # Static assets
└── nuxt.config.ts    # Nuxt configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
