
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [condition, setCondition] = useState('Semua');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);


  const conditions = ['Semua', 'Baru', 'Like New', 'Bekas'];


  const performSearch = useCallback(() => {
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const searchResults = PRODUCTS.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
  }, [query]);

  const applyFilters = useCallback(() => {
    let filtered = [...results];

    // Category filter
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Condition filter
    if (condition !== 'Semua') {
      filtered = filtered.filter(product => product.condition === condition);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredResults(filtered);
  }, [results, selectedCategory, priceRange, condition, sortBy]);

  useEffect(() => {
    if (query) {
      setTimeout(() => performSearch(), 0);
    }
  }, [query, performSearch]);

  useEffect(() => {
    setTimeout(() => applyFilters(), 0);
  }, [applyFilters]);

  const clearFilters = () => {
    setSelectedCategory('Semua');
    setPriceRange([0, 20000000]);
    setCondition('Semua');
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h1>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {isLoading ? 'Searching...' : `${filteredResults.length} results found`}
            </p>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-slate-800"
                >
                  Clear All
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-3 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="20000000"
                    step="500000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Rp 0</span>
                    <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Condition</h4>
                <div className="space-y-2">
                  {conditions.map((cond) => (
                    <label key={cond} className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={condition === cond}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-3 text-sm text-gray-700">{cond}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {Array(8).fill(0).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
