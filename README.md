# showcase coffee ☕

Encafeinados is a modern and efficient software solution designed for managing
coffee shops and cafes. It provides tools to streamline operations, from handling suppliers
and stores to managing sales, purchases, and settlements. Built with React and Redux, this frontend
application ensures a smooth and responsive user experience.

## 🛠️ Technologies Used

* **Frontend**: React, Redux, React Router
* **Styling**: Tailwind CSS, shadcn/ui, and a touch of pure CSS
* **Development Tools**: Vite, ESLint, Prettier
* **HTTP Client**: Axios
* **UI Libraries**: Headless UI, Radix UI, Lucide Icons, Framer Motion
* **Form Management**: React Hook Form, Zod
* **State Management**: Redux Toolkit
* **Routing**: React Router DOM
* **Notifications**: React Hot Toast

## 🚀 Installation

To get started with Encafeinados, follow these steps:

### Prerequisites:

Ensure you have Node.js and npm installed.

### Clone the Repository:

https://github.com/EncafeinadosCompany/showcase-coffee.git

### Install Dependencies:


npm install


### Run the Project:

npm run dev


The application will be available at http://localhost:5173.

## 🗂️ Project Structure

```
src/
├── API/                  # API-related utilities
├── assets/               # Static assets (images, styles)
│   ├── images/          # Image files
│   └── styles/          # Global styles
├── components/          # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility libraries
│   └── ui/             # UI components
├── context/            # React context providers
├── features/           # Feature-specific modules
│   ├── auth/           # Authentication logic
│   ├── companies/      # Company management
│   ├── payments/       # Payment-related features
│   │   ├── deposits/   # Deposit management
│   │   └── liquidations/ # Liquidation management
│   ├── products/       # Product management
│   │   ├── attributes/ # Product attributes
│   │   ├── brands/     # Product brands
│   │   ├── products/   # Products
│   │   └── variants/   # Product variants
│   ├── transactions/   # Transaction management
│   └── users/          # User management
│       └── employees/  # Employee management
├── hooks/              # Custom hooks
├── layout/             # Layout components
├── pages/              # Application pages
├── routes/             # Application routes
├── store/              # Redux store configuration
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## ✨ Key Features

* **Suppliers Management**: Easily manage and track suppliers
* **Stores Management**: Handle multiple coffee shop locations
* **Sales Management**: Track and manage sales transactions
* **Purchases**: Manage inventory and purchases
* **Settlements**: Handle payments and liquidations efficiently

## 🧩 Dependencies

### Core Dependencies

* **React**: Frontend library for building user interfaces
* **Redux**: State management library
* **React Router DOM**: Routing for the application
* **Axios**: HTTP client for API requests
* **Tailwind CSS**: Utility-first CSS framework
* **shadcn/ui**: UI component library

### Development Dependencies

* **Vite**: Fast build tool for modern web development
* **ESLint**: Linting tool for code quality
* **Prettier**: Code formatting tool
* **TypeScript**: Static type checking

For a full list of dependencies, check the `package.json` file.

## 🛠️ Scripts

Start Development Server:
```bash
npm run dev
```

Build for Production:
```bash
npm run build
```

Lint Code:
```bash
npm run lint
```

Preview Production Build:
```bash
npm run preview
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:

* Email: your-email@example.com
* GitHub: your-username

Enjoy managing your coffee shops with Encafeinados! ☕✨