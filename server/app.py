from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Mengizinkan Frontend (React) mengakses backend ini
CORS(app)

# --- DATABASE SEMENTARA (DUMMY DATA) ---
# Nanti kita ganti ini dengan database sungguhan (MySQL/PostgreSQL)
products = [
    {
        "id": 1,
        "nama": "Kamera Canon DSLR Bekas",
        "harga": 3500000,
        "deskripsi": "Kondisi mulus 90%, lensa kit aman.",
        "kategori": "Elektronik"
    },
    {
        "id": 2,
        "nama": "Jaket Denim Vintage",
        "harga": 150000,
        "deskripsi": "Ukuran L, bahan tebal, warna masih pekat.",
        "kategori": "Fashion"
    },
    {
        "id": 3,
        "nama": "Sepeda Lipat Polygon",
        "harga": 1200000,
        "deskripsi": "Siap gowes, rem pakem.",
        "kategori": "Hobi"
    }
]

# --- ROUTE / JALUR API ---

# 1. Cek Server (Hanya untuk memastikan server jalan)
@app.route('/', methods=['GET'])
def home():
    return "Server Marketplace Berjalan!"

# 2. Ambil Semua Produk (GET)
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

# 3. Ambil Detail 1 Produk berdasarkan ID (GET)
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    # Cari produk yang ID-nya cocok
    product = next((item for item in products if item["id"] == product_id), None)
    if product:
        return jsonify(product)
    else:
        return jsonify({"error": "Produk tidak ditemukan"}), 404

# 4. Tambah Produk Baru (POST)
@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = {
        "id": len(products) + 1,
        "nama": data.get('nama'),
        "harga": data.get('harga'),
        "deskripsi": data.get('deskripsi'),
        "kategori": data.get('kategori')
    }
    products.append(new_product)
    return jsonify({"message": "Berhasil upload produk", "data": new_product}), 201

if __name__ == '__main__':
    # debug=True artinya server akan otomatis restart kalau kita edit kodingan
    app.run(debug=True, port=5000)