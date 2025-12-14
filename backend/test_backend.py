#!/usr/bin/env python3
"""
Simple test script to verify backend structure
"""
import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

def test_imports():
    """Test that all modules can be imported"""
    try:
        print("Testing imports...")
        
        # Test models
        from models import db, User, Product
        print("✓ Models imported successfully")
        
        # Test routes
        from routes.products import products_bp
        from routes.auth import auth_bp
        print("✓ Routes imported successfully")
        
        # Test Flask app creation
        from app import create_app
        app = create_app()
        print("✓ Flask app created successfully")
        
        # Test database models
        with app.app_context():
            print(f"✓ User model fields: {[col.name for col in User.__table__.columns]}")
            print(f"✓ Product model fields: {[col.name for col in Product.__table__.columns]}")
        
        print("\n🎉 Backend structure is valid!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    test_imports()
