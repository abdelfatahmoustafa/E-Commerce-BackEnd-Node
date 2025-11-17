# E-Commerce BackEnd — Node.js + Express + MongoDB 🛒

[![Node.js](https://img.shields.io/badge/node-%3E%3D16-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen)](http://localhost:3000/api-docs)

A modular, RESTful backend for an e-commerce application built with Node.js, Express, and MongoDB. Features include user management, categories/subcategories, brands, full product CRUD (with Cloudinary image uploads), orders, coupons, addresses, and reviews. API documentation is available via Swagger.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Roadmap & Suggested Improvements](#roadmap--suggested-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

# E-Commerce BackEnd — Node.js + Express + MongoDB 🛒

[![Node.js](https://img.shields.io/badge/node-%3E%3D16-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Swagger](https://img.shields.io/badge/API-Swagger-brightgreen)](http://localhost:3000/api-docs)

A modular, RESTful backend for an e-commerce application built with Node.js, Express and MongoDB. Features include user management, categories/subcategories, brands, full product CRUD (with Cloudinary image uploads), orders, coupons, addresses and reviews. API documentation is available via Swagger.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Folder structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Roadmap & Suggested Improvements](#roadmap--suggested-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User signup & signin (note: currently no token auth; see Security section)
- CRUD for Categories, SubCategories and Brands (with image upload)
- Product management: create, read, pagination, search, image uploads
- Orders creation and retrieval
- Coupon generation and application
- User addresses and reviews
- Swagger UI for API docs
- Cloudinary integration for file storage
- Winston-based logging

## Tech stack

- Backend: Node.js (ES Modules), Express 5
- Database: MongoDB (Mongoose ODM)
- File storage: Cloudinary (multer + multer-storage-cloudinary)
- Docs: Swagger (swagger-jsdoc + swagger-ui-express)
- Validation: Joi
- Logging: Winston
- Utilities: slugify, nanoid
- Dev: nodemon

## Getting started

Prerequisites:

- Node.js v16+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

Clone and install:

```bash
git clone https://github.com/abdelfatahmoustafa/E-Commerce-BackEnd-Node.git
cd E-Commerce-BackEnd-Node
npm install
```

Create environment file:

```bash
cp config/.env.example config/.env
# Edit config/.env with your values (MongoDB URI, Cloudinary keys)
```

Run in development:

```bash
npm run dev
# Visit Swagger UI: http://localhost:3000/api-docs
```

Run production:

```bash
npm start
```

## Environment variables

Create `config/.env` with the following (example in `config/.env.example`):

```
PORT=3000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Notes:

- The code uses `process.env.MONGO_URL` in `db/connection.js`. If you prefer `MONGODB_URI`, update the code or env names consistently.

## Scripts

- `npm run dev` — run server with nodemon
- `npm start` — start production node server

## Folder structure (important files)

```
/config
	cloudinary.config.js
	.env.example
/db
	connection.js
	models/
		user-model/
		product-model/
		category-model/
		...
/src
	main.js
	middleware/
		handelError.js
	modules/
		user-module/
			user.controller.js
			user.routes.js
		product-module/
			product.controller.js
			product.routes.js
		category-module/
		subCategory-model/
		brand-module/
		order-module/
		coupon-module/
		address-module/
		review-module/
	services/
		multer.js
	utils/
		logger.js
		pagination.js
README.md
package.json
```

## API Documentation

Open the Swagger UI after starting the server:

```
http://localhost:3000/api-docs
```

Main endpoints (summary)

- Root: GET `/` health and list of main endpoints
- Auth:
  - POST `/api/signup` — register
  - GET `/api/signin` — sign in (currently uses query; consider switching to POST)
- Categories: `/api/category` (GET, POST, PUT, DELETE)
- SubCategories: `/api/subCategory` (GET, POST, PUT, DELETE)
- Brands: `/api/brand` (GET, POST, PUT, DELETE)
- Products: `/api/product` (POST with `img` file, GET, GET `/pagination`, GET `/searchProduct`)
- Orders: `/api/order` (POST, GET, GET `/order/:userId`)
- Coupons: `/api/code/generateCode`, `/api/code/applyCoupon`, `/api/code/editCoupon/:couponCode`
- Addresses: `/api/address/:userId` (POST, GET)
- Reviews: `/api/review/:userId/:productId` (POST), `/api/review/:productId` (GET)

For full input/response schemas, use the Swagger UI.

## Examples

Register a user:

```bash
curl -X POST http://localhost:3000/api/signup \
	-H "Content-Type: application/json" \
	-d '{"name":"Test User","email":"test@example.com","password":"Pass1234"}'
```

Create a product (multipart/form-data, image field `img`):

```bash
# using curl (example)
curl -X POST http://localhost:3000/api/product \
	-F "title=My Product" \
	-F "price=1200" \
	-F "category=<categoryId>" \
	-F "img=@/path/to/image.jpg"
```

## Roadmap & Suggested Improvements

- Implement secure authentication: bcrypt for password hashing + JWT tokens
- Add role-based authorization (admin/seller/customer)
- Consistent input validation across endpoints (Joi)
- Add tests (Jest + Supertest) and CI (GitHub Actions)
- Add Dockerfile and docker-compose for local development
- Add Postman collection and database seed script
- Improve response consistency and error handling

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and add tests
4. Open a PR with a clear description

Please follow consistent code style and add tests for new features.

## License

This project currently has `ISC` in package.json. Add a `LICENSE` file (MIT recommended) to make the license explicit.

## Contact

Open an issue or contact the repo owner on GitHub: `https://github.com/abdelfatahmoustafa`
