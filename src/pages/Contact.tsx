import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('https://res.cloudinary.com/dhxriuzu5/image/upload/v1741726808/a-luxurious-modern-villa-with-an-infinit__IeWg50eSy6SiOD580qnjg_Bn614P7vTy20g1-4ro7q7Q_gralzm.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our team of luxury real estate experts is ready to assist with your property journey.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Our Location</h3>
              <p className="text-gray-600">
                123 Luxury Lane, Chaweng<br />
                Koh Samui, Koh Samui 84320
              </p>
            </div>
            
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
                info@zeemui.com<br />
                sales@zeemui.com
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Working Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-8 mb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Whether you're looking to buy, sell, or have questions about our properties, we're here to help. Fill out the form below and one of our luxury real estate specialists will get back to you shortly.
              </p>
              
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Find Us</h2>
              <div className="rounded-lg overflow-hidden shadow-md">
                {/* Map placeholder - in a real app, this would be an actual map */}
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <MapPin size={48} className="text-gray-400" />
                  <span className="ml-2 text-gray-500">Map view would be displayed here</span>
                </div>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our luxury properties and services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  What areas of Koh Samui do you cover?
                </h3>
                <p className="text-gray-600">
                  Zeemui specializes in luxury properties throughout Koh Samui's most desirable locations, with a primary focus on Koh Samui, Phuket, Bangkok, Hua Hin, and Chiang Mai.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  Can foreigners own property in Koh Samui?
                </h3>
                <p className="text-gray-600">
                  Foreigners can own condominiums in their own name, while houses and villas are typically purchased through a Thai company structure or long-term leasehold. Our team can guide you through the legal process and options available.
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