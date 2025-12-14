
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'price': p.price,
        'location': p.location,
        'category': p.category,
        'condition': p.condition,
        'rating': p.rating,
        'sold': p.sold,
        'image': p.image
    } for p in products]), 200

@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'title': product.title,
        'price': product.price,
        'location': product.location,
        'category': product.category,
        'condition': product.condition,
        'rating': product.rating,
        'sold': product.sold,
        'image': product.image
    }), 200

@products_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()
    product = Product(
        title=data['title'],
        price=data['price'],
        location=data['location'],
        category=data['category'],
        condition=data['condition'],
        rating=data.get('rating'),
        sold=data.get('sold', 0),
        image=data.get('image')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product created', 'id': product.id}), 201

@products_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    product.title = data.get('title', product.title)
    product.price = data.get('price', product.price)
    product.location = data.get('location', product.location)
    product.category = data.get('category', product.category)
    product.condition = data.get('condition', product.condition)
    product.rating = data.get('rating', product.rating)
    product.sold = data.get('sold', product.sold)
    product.image = data.get('image', product.image)
    db.session.commit()
    return jsonify({'message': 'Product updated'}), 200

@products_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 200
