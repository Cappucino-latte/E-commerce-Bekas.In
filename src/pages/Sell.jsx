import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Camera, X, Plus, MapPin, Package, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: '',
    location: '',
    images: []
  });
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    'Handphone', 'Laptop', 'Kamera', 'Console', 'Audio', 'Aksesoris', 'Fashion', 'Olahraga', 'Rumah Tangga'
  ];

  const conditions = [
    { value: 'Baru', label: 'Baru (Belum pernah digunakan)' },
    { value: 'Like New', label: 'Like New (Sangat baik, minim痕跡)' },
    { value: 'Bekas', label: 'Bekas (Masih dalam kondisi baik)' },
    { value: 'Bekas', label: 'Bekas (Butuh perbaikan)' }
  ];

  const locations = [
    'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Barat', 'Jakarta Utara',
    'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Yogyakarta', 'Bali', 'Makassar', 'Palembang'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    // Simulate form submission
    toast.success('Your listing has been submitted for review!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      condition: '',
      price: '',
      location: '',
      images: []
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.title || !formData.category || !formData.condition)) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (currentStep === 2 && (!formData.price || !formData.location)) {
      toast.error('Please fill in price and location');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Sell Your Product</h1>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Step {currentStep} of 3</span>
            <span className="text-sm font-medium text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          
          {/* Step 1: Product Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Product Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter a clear and descriptive title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select condition</option>
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>{condition.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe your product, its features, and any important details..."
                />
              </div>
            </div>
          )}

          {/* Step 2: Price & Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Price & Location</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (IDR) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.price && (
                    <span>Price: Rp {parseInt(formData.price || 0).toLocaleString('id-ID')}</span>
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Pricing Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Research similar products to set a competitive price</li>
                  <li>• Consider the condition and age of your item</li>
                  <li>• Factor in negotiation room (you can set a slightly higher asking price)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add Photos</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Photo Guidelines</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Upload 1-5 high-quality photos</li>
                  <li>• Include photos from multiple angles</li>
                  <li>• Show any wear or damage clearly</li>
                  <li>• Use good lighting for better visibility</li>
                </ul>
              </div>

              <div>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop your photos here
                  </h3>
                  <p className="text-gray-500 mb-4">or click to browse files</p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Take Photo
                    </button>
                  </div>
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            Main Photo
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {formData.images.length < 5 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 hover:border-gray-400 transition-colors cursor-pointer">
                        <button
                          type="button"
                          onClick={() => document.querySelector('input[type="file"]').click()}
                          className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="w-8 h-8" />
                          <span className="text-sm">Add More</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                Submit Listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
