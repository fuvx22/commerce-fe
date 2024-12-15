# Commerce-FE

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Commerce-FE is a front-end project for an e-commerce platform. It provides a user-friendly interface for customers to browse products, add items to their cart, and complete purchases.

## Tech Stack
- **React** - A JavaScript library for building user interfaces
- **Vite** - A fast build tool and development server
- **Tailwind CSS** - A utility-first CSS framework
- **Axios** - A promise-based HTTP client for the browser and Node.js
- **Cloudinary** - A cloud-based image and video management service
- **JWT** - JSON Web Tokens for secure user authentication

## Features
- Browse and search for products
- View detailed product information
- Add and remove items from the shopping cart
- User authentication (sign up, login, logout)
- Manage user profiles and update personal information
- View order history and track order status
- Responsive design for mobile and desktop
- Secure API communication using JWT

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a Cloudinary account. If you don't have one, you can create a free account at [Cloudinary](https://cloudinary.com/).
- You have created a Cloudinary app and obtained your Cloudinary URL and upload preset.

### Installation

### Configuration

Before running the project, you need to configure the environment variables. Create a `.env` file in the root directory of the project and add the following variables:

```
VITE_CLOUDINARY_URL="https://api.cloudinary.com/v1_1/your-app/image/upload"
VITE_CLOUDINARY_UPLOAD_PRESET="your_preset"
VITE_DEFAULT_AVATAR_URL = "your_default_avatar_url"
VITE_BACKEND_URL = "http://localhost:5299"

```

Replace with your actual information such as backend url, API key,...


To get started with the Commerce-FE project, follow these steps:

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/commerce-fe.git
  ```
2. Navigate to the project directory:
  ```bash
  cd commerce-fe
  ```
3. Install the dependencies:
  ```bash
  npm install
  ```

## Usage
To start the development server, run:
```bash
npm run dev
```
This will launch the application in your default web browser. The development server will automatically reload the page if you make changes to the code.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
