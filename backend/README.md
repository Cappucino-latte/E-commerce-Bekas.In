# Second-hand Market Backend

A Flask-based REST API backend for a second-hand marketplace application.

## Features

- **Authentication**: User registration, login, and JWT-based authentication
- **Product Management**: Full CRUD operations for products
- **Categories**: Support for product categories (Handphone, Laptop, Camera, etc.)
- **Database**: SQLite database with sample data
- **CORS**: Cross-origin resource sharing enabled for frontend integration

## Quick Start

### Prerequisites

- Python 3.7+
- pip (Python package installer)

### Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   python run.py
   ```

3. **Test the backend:**
   ```bash
   python test_backend.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /` - Check if API is running

### Categories
- `GET /api/categories` - Get all product categories

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires authentication)
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get a specific product
- `POST /api/products` - Create a new product (requires authentication)
- `PUT /api/products/<id>` - Update a product (requires authentication)
- `DELETE /api/products/<id>` - Delete a product (requires authentication)

## API Usage Examples

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword"
  }'
```

### Get All Products
```bash
curl -X GET http://localhost:5000/api/products
```

### Create a Product (with authentication)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "iPhone 14 Pro",
    "price": 15000000,
    "location": "Jakarta",
    "category": "Handphone",
    "condition": "Like New",
    "rating": 4.9,
    "image": "https://example.com/iphone14.jpg"
  }'
```

## Database Schema

### User Model
- `id` (Integer, Primary Key)
- `username` (String, Unique, Required)
- `email` (String, Unique, Required)
- `password_hash` (String, Required)

### Product Model
- `id` (Integer, Primary Key)
- `title` (String, Required)
- `price` (Integer, Required)
- `location` (String, Required)
- `category` (String, Required)
- `condition` (String, Required)
- `rating` (Float, Optional)
- `sold` (Integer, Default: 0)
- `image` (String, Optional)

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── models.py           # Database models
├── run.py              # Application entry point
├── requirements.txt    # Python dependencies
├── test_backend.py    # Backend structure test
├── routes/
│   ├── auth.py        # Authentication endpoints
│   └── products.py    # Product CRUD endpoints
└── marketplace.db     # SQLite database (created on first run)
```

## Configuration

### Environment Variables
- `FLASK_ENV` - Set to `development` for debug mode
- `JWT_SECRET_KEY` - JWT secret key (change in production)

### Database Configuration
The application uses SQLite by default. To use a different database, update the `SQLALCHEMY_DATABASE_URI` in `app.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///marketplace.db'
```

## Development

### Adding New Endpoints

1. Create a new blueprint file in `routes/`
2. Define your endpoints
3. Register the blueprint in `app.py`

### Sample Data

The application automatically creates sample products on first run, including:
- iPhone 13 Pro 256GB
- MacBook Air M1 2020
- Sony WH-1000XM4 Headphones
- FujiFilm X-T30 Camera
- PlayStation 5
- And more...

## Security Notes

- JWT tokens are used for authentication
- Passwords are hashed using Werkzeug
- CORS is enabled for frontend integration
- Change the JWT secret key in production

## Troubleshooting

### Import Errors
If you encounter import errors, ensure you're running commands from the `backend/` directory.

### Database Issues
Delete `marketplace.db` to reset the database and recreate tables with sample data.

### Port Already in Use
Change the port in `app.py`:
```python
app.run(debug=True, port=5001)
```

## Next Steps

- [ ] Update frontend to connect to backend API
- [ ] Add more product features (search, filtering)
- [ ] Implement user profiles and product favorites
- [ ] Add image upload functionality
- [ ] Add pagination for product listings
