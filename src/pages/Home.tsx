import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ThumbsUp, Award, Users, Globe } from 'lucide-react';
import { HeroSection, FeaturedProperties } from '../components';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 uppercase tracking-wider mb-2">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Zeemui, our core values guide everything we do, from the properties we select to the service we provide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Excellence</h3>
              <p className="text-gray-600">
                We are committed to excellence in every aspect of our business, from the properties we represent to the service we provide.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with unwavering integrity and transparency, ensuring that our clients can trust us completely throughout their journey.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Personalization</h3>
              <p className="text-gray-600">
                We believe in personalized service, tailoring our approach to meet the unique needs and preferences of each client.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-md rounded-lg transition-shadow">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovation and continuously seek new ways to enhance the experience of buying and selling luxury real estate.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white bg-cover bg-center relative" style={{ backgroundImage: "url('https://res.cloudinary.com/dhxriuzu5/image/upload/v1741727836/a-modern-two-story-house-with-a-sleek-de_SBjwVImtS8iYd2MXRhFS7A_GeTPWMkAQK68003jvQuSRA_zz129a.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Find Your Dream Luxury Property in Koh Samui
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Let us help you discover the perfect property that matches your lifestyle and investment goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link 
                to="/properties" 
                className="bg-custom-green hover:bg-custom-green-600 text-white px-8 py-3 rounded-md transition-colors inline-block"
              >
                Browse Properties
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-md transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 uppercase tracking-wider mb-2">
              Latest News
            </h2>
            <div className="w-full max-w-lg mx-auto flex items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-custom-green uppercase text-lg">From Our Blog</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md group">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Blog Post" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-custom-green text-sm mb-2">June 15, 2025</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">The Luxury Real Estate Market in Koh Samui: 2025 Outlook</h3>
                <p className="text-gray-600 mb-4">Discover the latest trends and investment opportunities in Koh Samui's thriving luxury real estate market for 2025.</p>
                <Link to="/blog" className="text-custom-green font-medium hover:text-custom-green-800 transition-colors">
                  Read More
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md group">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Blog Post" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-custom-green text-sm mb-2">May 28, 2025</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">5 Must-Have Features in Your Luxury Villa</h3>
                <p className="text-gray-600 mb-4">From infinity pools to smart home technology, we explore the essential features that define true luxury in modern villas.</p>
                <Link to="/blog" className="text-custom-green font-medium hover:text-custom-green-800 transition-colors">
                  Read More
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md group">
              <div className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Blog Post" 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-custom-green text-sm mb-2">May 10, 2025</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Investing in Koh Samui: A Guide for Foreign Buyers</h3>
                <p className="text-gray-600 mb-4">Everything you need to know about purchasing property in Koh Samui, from legal requirements to the best locations.</p>
                <Link to="/blog" className="text-custom-green font-medium hover:text-custom-green-800 transition-colors">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-block border-2 border-custom-green text-custom-green hover:bg-custom-green hover:text-white px-6 py-3 rounded-md transition-colors uppercase font-medium tracking-wider"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;