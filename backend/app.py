from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db, User, Product
from routes.products import products_bp
from routes.auth import auth_bp

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///marketplace.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-in-production'
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # Create tables
    with app.app_context():
        db.create_all()
        
        # Add sample products if database is empty
        if Product.query.count() == 0:
            sample_products = [
                Product(
                    title="iPhone 13 Pro 256GB Sierra Blue",
                    price=12500000,
                    location="Jakarta Selatan",
                    category="Handphone",
                    condition="Bekas",
                    rating=4.8,
                    sold=12,
                    image="https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500&q=80"
                ),
                Product(
                    title="MacBook Air M1 2020 Space Grey",
                    price=9800000,
                    location="Bandung",
                    category="Laptop",
                    condition="Bekas",
                    rating=4.9,
                    sold=5,
                    image="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80"
                ),
                Product(
                    title="Sony WH-1000XM4 Noise Cancelling",
                    price=2100000,
                    location="Surabaya",
                    category="Audio",
                    condition="Like New",
                    rating=4.7,
                    sold=30,
                    image="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80"
                ),
                Product(
                    title="FujiFilm X-T30 Kit 15-45mm",
                    price=11000000,
                    location="Yogyakarta",
                    category="Kamera",
                    condition="Bekas",
                    rating=5.0,
                    sold=2,
                    image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80"
                ),
                Product(
                    title="PlayStation 5 Disc Edition Official",
                    price=7200000,
                    location="Medan",
                    category="Console",
                    condition="Baru",
                    rating=4.9,
                    sold=15,
                    image="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80"
                ),
                Product(
                    title="Keychron K2 V2 Mechanical Keyboard",
                    price=1200000,
                    location="Semarang",
                    category="Aksesoris",
                    condition="Bekas",
                    rating=4.5,
                    sold=8,
                    image="https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80"
                ),
                Product(
                    title="Samsung Galaxy S23 Ultra",
                    price=14500000,
                    location="Jakarta Barat",
                    category="Handphone",
                    condition="Like New",
                    rating=4.9,
                    sold=4,
                    image="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80"
                ),
                Product(
                    title="Nintendo Switch OLED",
                    price=3800000,
                    location="Bali",
                    category="Console",
                    condition="Baru",
                    rating=4.8,
                    sold=22,
                    image="https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500&q=80"
                )
            ]
            
            for product in sample_products:
                db.session.add(product)
            db.session.commit()
    
    @app.route('/')
    def health_check():
        return {'message': 'Second-hand Market API is running'}, 200
    
    @app.route('/api/categories')
    def get_categories():
        return [
            'Semua', 'Handphone', 'Laptop', 'Kamera', 'Console', 'Audio', 'Aksesoris'
        ], 200
    
    return app
