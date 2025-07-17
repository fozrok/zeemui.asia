import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: '7',
    title: 'Navigating Property Taxes in Koh Samui: A Complete Guide',
    excerpt: 'A comprehensive guide to property taxes, ownership structures, and tax tips for buyers and investors in Koh Samui.',
    image: 'https://res.cloudinary.com/dhxriuzu5/image/upload/v1752716181/Blog_Navigating_property_tax_photo_Large_okkdl6.jpg',
    date: 'July 1, 2025',
    author: 'Editorial Team',
    category: 'Legal & Finance'
  },
  {
    id: '8',
    title: 'Koh Samui Luxury Real Estate Market Outlook 2025',
    excerpt: 'A comprehensive outlook on the trends, investment returns, and infrastructure shaping Koh Samui\'s luxury property market in 2025.',
    image: 'https://res.cloudinary.com/dhxriuzu5/image/upload/v1752716176/Blog_Real_estate_market_outlook_2025_photo_Large_tpaack.jpg',
    date: 'July 8, 2025',
    author: 'Editorial Team',
    category: 'Market Trends'
  },
  {
    id: '9',
    title: 'Most Popular Locations for Rental Investment in Koh Samui',
    excerpt: 'Explore the top areas in Koh Samui for rental property investment, from vibrant Chaweng to tranquil Maenam and exclusive Choeng Mon.',
    image: 'https://res.cloudinary.com/dhxriuzu5/image/upload/v1752716175/Blog_rental_investment_photo_Large_fdg1ig.jpg',
    date: 'July 15, 2025',
    author: 'Editorial Team',
    category: 'Investment Guide'
  },
  {
    id: '10',
    title: 'Top 5 International Schools in Koh Samui',
    excerpt: 'Discover the leading international schools in Koh Samui, their curricula, facilities, and what makes each unique for expat families.',
    image: 'https://res.cloudinary.com/dhxriuzu5/image/upload/v1752716179/Blog_Top_5_schools_photo_Large_j60rba.jpg',
    date: 'July 22, 2025',
    author: 'Editorial Team',
    category: 'Lifestyle & Family'
  },
  {
    id: '11',
    title: 'Best Locations for Expats to Live in Koh Samui',
    excerpt: 'Discover the top neighborhoods in Koh Samui for expatriates, from vibrant Chaweng to tranquil Maenam and exclusive Choeng Mon.',
    image: 'https://res.cloudinary.com/dhxriuzu5/image/upload/v1752716178/Blog_best_expat_locations_photo_Large_kiwoe3.jpg',
    date: 'July 29, 2025',
    author: 'Editorial Team',
    category: 'Lifestyle & Family'
  }
];

const categories = [
  'Market Trends',
  'Luxury Living',
  'Investment Guide',
  'Architecture & Design',
  'Wellness Living',
  'Legal & Finance',
  'Lifestyle & Family'
];

const Blog = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest insights, trends, and news from the luxury real estate market.
            </p>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Blog Posts */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-12">
                {blogPosts.map(post => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover md:h-64"
                        />
                      </div>
                      <div className="p-6 md:p-8 md:w-2/3">
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {post.category}
                        </span>
                        <h2 className="text-2xl font-bold mt-2 mb-3 text-gray-800 hover:text-amber-600 transition-colors">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                          <div className="flex items-center mr-4">
                            <Clock size={14} className="mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="text-amber-600 font-medium hover:text-amber-800 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            {/* Sidebar placeholder for categories, recent posts, etc. */}
            <div className="lg:col-span-1"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;