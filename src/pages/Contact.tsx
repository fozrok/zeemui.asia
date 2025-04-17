import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with our team of luxury property experts
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Info Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Phone Number</h3>
              <p className="text-gray-600">
                +66 88 138 0006
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Email Address</h3>
              <p className="text-gray-600">
                info@zeemui.asia
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Our Location - Koh Samui</h2>
              <div className="rounded-lg overflow-hidden shadow-md h-[500px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125756.25600402366!2d99.87937563646195!3d9.509386328559433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3054f79f752cd2bb%3A0x93a23245f792fc9c!2sKo%20Samui%2C%20Ko%20Samui%20District%2C%20Surat%20Thani%2084140%2C%20Thailand!5e0!3m2!1sen!2s!4v1708099436099!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <Facebook size={20} className="text-amber-600" />
                  </a>
                  <a href="#" className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <Instagram size={20} className="text-amber-600" />
                  </a>
                  <a href="#" className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <Twitter size={20} className="text-amber-600" />
                  </a>
                  <a href="#" className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors">
                    <Linkedin size={20} className="text-amber-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  What services do you offer to property buyers?
                </h3>
                <p className="text-gray-600">
                  We provide comprehensive property search, viewings, legal advice, and support throughout the entire buying process. Our services are free for buyers, as we receive our commission from property sellers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  What services do you offer to property sellers?
                </h3>
                <p className="text-gray-600">
                  For sellers, we provide comprehensive marketing services, professional photography, virtual tours, targeted advertising, and access to our network of qualified buyers. We handle every aspect of the sales process to ensure a smooth transaction.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  Do you offer property management services?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer full-service property management for owners who wish to maintain their investment while away. Our services include maintenance, rental management, security, and regular property inspections.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  What is the process for viewing properties?
                </h3>
                <p className="text-gray-600">
                  We arrange personalized property viewings based on your preferences and schedule. For international clients, we can provide virtual tours and detailed video walkthroughs before you travel to Koh Samui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;