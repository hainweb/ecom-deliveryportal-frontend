# Delivery Frontend | Multi-Role E-Commerce Platform

This frontend module is designed for **delivery personnel** to manage assigned orders, update delivery statuses, handle cash collection, and track analytics in real-time.

---

## Features

- **Authentication**
  - Delivery personnel login
  - Forgot password & OTP verification
  - Reset password
- **Order Management**
  - View assigned orders
  - Update order status:
    - `Shipped`
    - `Delivered`
  - Update cash collection status
- **Notifications**
  - Alerts for users and admins on status updates
- **Analytics**
  - Dashboard integration with Super Admin analytics for delivery tracking

---

## Tech Stack

- React.js
- Redux (for state management, optional)
- Axios (for API calls)
- Tailwind CSS
- React Router DOM (for navigation)

---

## Environment Variables

Create a `.env` file in the **root directory** of the project with the following variables:

```env
# Base URL of your backend API
# Use full URL in development (e.g., localhost), and '/api' in production
# Example for development:
REACT_APP_BASE_URL=http://localhost:13000
# Example for production:
# REACT_APP_BASE_URL=/api


```

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/hainweb/ecom-deliveryportal-frontend.git

# Navigate to project directory
cd ecom-deliveryportal-frontend

# Install dependencies
npm install

# Start the development server
npm start