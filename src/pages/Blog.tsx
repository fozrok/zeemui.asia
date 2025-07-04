import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'The Luxury Real Estate Market in Koh Samui: 2025 Outlook',
    excerpt: 'Discover the latest trends and investment opportunities in Koh Samui\'s thriving luxury real estate market for 2025.',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'June 15, 2025',
    author: 'Sarah Johnson',
    category: 'Market Trends'
  },
  {
    id: '2',
    title: '5 Must-Have Features in Your Luxury Villa',
    excerpt: 'From infinity pools to smart home technology, we explore the essential features that define true luxury in modern villas.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'May 28, 2025',
    author: 'Michael Chen',
    category: 'Luxury Living'
  },
  {
    id: '3',
    title: 'Investing in Koh Samui: A Guide for Foreign Buyers',
    excerpt: 'Everything you need to know about purchasing property in Koh Samui, from legal requirements to the best locations.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'May 10, 2025',
    author: 'David Wilson',
    category: 'Investment Guide'
  },
  {
    id: '4',
    title: 'Sustainable Luxury: Eco-Friendly Design Trends',
    excerpt: 'How luxury real estate is embracing sustainability without compromising on elegance and comfort.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'April 22, 2025',
    author: 'Emma Roberts',
    category: 'Architecture & Design'
  },
  {
    id: '5',
    title: 'The Rise of Wellness-Focused Real Estate in Koh Samui',
    excerpt: 'Exploring the growing demand for properties that prioritize health, well-being, and holistic living.',
    image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'April 8, 2025',
    author: 'Sophie Taylor',
    category: 'Wellness Living'
  },
  {
    id: '6',
    title: 'Navigating Property Taxes in Koh Samui: A Complete Guide',
    excerpt: 'Understanding the tax implications of buying, owning, and selling luxury real estate in Koh Samui.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'March 15, 2025',
    author: 'Robert Chang',
    category: 'Legal & Finance'
  },
  {
    id: '7',
    title: 'Navigating Property Taxes in Koh Samui: A Complete Guide',
    excerpt: 'A comprehensive guide to property taxes, ownership structures, and tax tips for buyers and investors in Koh Samui.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'July 1, 2025',
    author: 'Editorial Team',
    category: 'Legal & Finance'
  },
  {
    id: '8',
    title: 'Koh Samui Luxury Real Estate Market Outlook 2025',
    excerpt: 'A comprehensive outlook on the trends, investment returns, and infrastructure shaping Koh Samui\'s luxury property market in 2025.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'July 8, 2025',
    author: 'Editorial Team',
    category: 'Market Trends'
  },
  {
    id: '9',
    title: 'Most Popular Locations for Rental Investment in Koh Samui',
    excerpt: 'Explore the top areas in Koh Samui for rental property investment, from vibrant Chaweng to tranquil Maenam and exclusive Choeng Mon.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    date: 'July 15, 2025',
    author: 'Editorial Team',
    category: 'Investment Guide'
  }
];

const categories = [
  'Market Trends',
  'Luxury Living',
  'Investment Guide',
  'Architecture & Design',
  'Wellness Living',
  'Legal & Finance'
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
            
            {/* Sidebar */}
            <div>
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link 
                        to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center group"
                      >
                        <Tag size={16} className="text-gray-400 group-hover:text-amber-600 mr-2" />
                        <span className="text-gray-700 group-hover:text-amber-600 transition-colors">
                          {category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex items-start">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded mr-3 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium">
                          <Link 
                            to={`/blog/${post.id}`}
                            className="text-gray-800 hover:text-amber-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h4>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Subscribe */}
              <div className="bg-amber-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Stay Updated</h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter to receive the latest updates and insights.
                </p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;