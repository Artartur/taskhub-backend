# taskHub — Backend

An application where you can create and manage tasks.

## Tech Stack

- **Node.js** + **TypeScript**
- **Express 5**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **Zod** for validation

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas)

### 1. Clone the repository

```bash
git clone git@github.com:Artartur/taskhub-backend.git
cd taskhub-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/taskhub

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173
```

| Variable       | Description                                      |
| -------------- | ------------------------------------------------ |
| `PORT`         | Port the server will listen on                   |
| `NODE_ENV`     | Environment (`development` or `production`)      |
| `MONGODB_URI`  | MongoDB connection string                        |
| `JWT_SECRET`   | Secret key used to sign JWT tokens               |
| `JWT_EXPIRES_IN` | JWT expiration time (e.g. `7d`, `1h`)          |
| `FRONTEND_URL` | Allowed origin for CORS                          |

### 4. Run the project

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Start production build
npm start
```

The server will be available at `http://localhost:<PORT>`.
