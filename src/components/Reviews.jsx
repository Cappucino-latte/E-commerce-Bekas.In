import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';

const Reviews = ({ reviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [showAll, setShowAll] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  const displayedReviews = showAll ? sortedReviews : sortedReviews.slice(0, 3);
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Ulasan Pembeli</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} ({reviews.length} ulasan)
            </span>
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="highest">Rating Tertinggi</option>
          <option value="lowest">Rating Terendah</option>
        </select>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  {review.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.user}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        ✓ Terverifikasi
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <Flag className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-700 leading-relaxed">{review.comment}</p>

            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                <span>Bermanfaat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary font-semibold hover:underline"
          >
            {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat ${reviews.length - 3} Ulasan Lainnya`}
          </button>
        </div>
      )}

      {/* Add Review Button */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-primary/20">
          Tulis Ulasan
        </button>
      </div>
    </div>
  );
};

export default Reviews;
