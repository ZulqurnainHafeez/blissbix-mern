# Blissbix Database Design

## Objective

The objective of this document is to design the MongoDB database structure for the Blissbix sofa e-commerce website.

---

## Database Name

blissbix

---

## Collections

1. Users
2. Products
3. Categories
4. Carts
5. Wishlists
6. Orders
---

# Users Collection

The Users collection stores customer and administrator information.

| Field | Data Type | Required | Description |
|-------|-----------|----------|-------------|
| name | String | Yes | Full name of the user |
| email | String | Yes | User email address |
| password | String | Yes | Encrypted password |
| phone | String | Yes | Contact number |
| address | String | Yes | Delivery address |
| role | String | Yes | User role (customer/admin) |
| createdAt | Date | Yes | Account creation date |
---

# Products Collection

The Products collection stores all sofa products available in the store.

| Field | Data Type | Required | Description |
|-------|-----------|----------|-------------|
| name | String | Yes | Sofa name |
| category | String | Yes | Sofa category (L Shape, Corner, U Shape, etc.) |
| price | Number | Yes | Sofa price in GBP (£) |
| description | String | Yes | Product description |
| material | String | Yes | Sofa material (Velvet, Fabric, Leather, etc.) |
| color | String | Yes | Sofa color |
| stock | Number | Yes | Available quantity |
| images | Array | Yes | Product images |
| featured | Boolean | No | Featured product (true/false) |
| createdAt | Date | Yes | Product creation date |
---

# Categories Collection

The Categories collection stores different sofa categories.

| Field | Data Type | Required | Description |
|-------|-----------|----------|-------------|
| name | String | Yes | Category name (L Shape, Corner, U Shape, Sofa Bed, etc.) |
| description | String | No | Short description of the category |
| createdAt | Date | Yes | Category creation date |
---

# Wishlist Collection

The Wishlist collection stores products saved by users for future purchase.

| Field | Data Type | Required | Description |
|-------|-----------|----------|-------------|
| userId | ObjectId | Yes | Reference to the user |
| productId | ObjectId | Yes | Reference to the product |
| createdAt | Date | Yes | Date added to wishlist |
---

# Orders Collection

The Orders collection stores customer orders.

| Field | Data Type | Required | Description |
|-------|-----------|----------|-------------|
| userId | ObjectId | Yes | Reference to the user |
| products | Array | Yes | List of ordered products |
| totalAmount | Number | Yes | Total order amount |
| paymentMethod | String | Yes | Payment method |
| orderStatus | String | Yes | Pending, Processing, Shipped, Delivered |
| shippingAddress | String | Yes | Delivery address |
| createdAt | Date | Yes | Order creation date |
---

# Database Relationships

1. One User can have multiple Orders.
2. One User can have one Cart.
3. One User can have one Wishlist.
4. One Category can contain multiple Products.
5. One Product can belong to one Category.
6. One Order can contain multiple Products.

---

# Validation Rules

## User
- Email must be unique.
- Password is required.
- Name cannot be empty.

## Product
- Price must be greater than 0.
- Stock cannot be negative.
- Product name is required.

## Category
- Category name is required.

## Cart
- Quantity must be at least 1.

## Order
- Total amount must be greater than 0.
- Order status must be one of:
  - Pending
  - Processing
  - Shipped
  - Delivered