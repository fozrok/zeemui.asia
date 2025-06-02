import React from 'react';
import { Shield, Home, Building2, FileCheck, Users, Landmark } from 'lucide-react';

const BuyersGuide = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-900 py-24 bg-cover bg-center relative" style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://res.cloudinary.com/dhxriuzu5/image/upload/v1741727836/a-modern-two-story-house-with-a-sleek-de_SBjwVImtS8iYd2MXRhFS7A_GeTPWMkAQK68003jvQuSRA_zz129a.png')"
      }}>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
              5 Options for Foreigners to Buy Property in Thailand
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A comprehensive guide to safely purchasing luxury property in Thailand as a foreign investor
            </p>
            <div className="flex items-center justify-center text-gray-400">
              <span>DECEMBER 15, 2021</span>
              <span className="mx-2">•</span>
              <span>10 MIN READ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Can Foreigners Buy Luxury Property in Thailand?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The easy answer is 'yes!' However, you cannot directly own the freehold land in your personal name if you are a foreigner. Although, the building structure can always be legally owned and registered in a foreigner's personal name, whereas the freehold Chanote land title must be registered at the land office in a Thai person or in a Limited Thai company name.
              </p>
            </div>

            {/* Context Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif text-gray-800 mb-6">Understanding the Context</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whilst Property Ownership Laws may seem frustrating at the start, they are in fact put in place mainly to protect the real estate market from over-development, to retain the country's natural beauty, and also to keep property & land prices within easy reach of local Thai nationals.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                When you look at it in this way... it sounds fair enough! How would you feel as a first time buyer in your own country of residence if you were unable to afford to buy a property due to inflated property prices from overseas investment?
              </p>
              <p className="text-gray-600 leading-relaxed">
                This has already become the case in many more over-developed places around the world, such as London, San Fransisco, Singapore or Hong Kong.
              </p>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12">
              <p className="text-amber-800">
                <strong>Important Note:</strong> Home ownership within Thailand is very high at over 80%! Compared to places such as United Kingdom at 63.5% or USA at 64.5%.
              </p>
            </div>

            {/* Options Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-serif text-gray-800 mb-8">Your 5 Options for Property Purchase</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-custom-green-50 p-3 rounded-full mr-4">
                      <Building2 className="h-6 w-6 text-custom-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">1. Buying a Luxury Condominium</h3>
                  </div>
                  <p className="text-gray-600">
                    This is one of the easiest methods for Foreigners to Buy Real Estate in Thailand. The 1979 'Thai Condominium Act' permits foreigners to own the freehold of up to 49% of the total unit space in a Condominium project.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-custom-green-50 p-3 rounded-full mr-4">
                      <Home className="h-6 w-6 text-custom-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">2. Leasehold Property</h3>
                  </div>
                  <p className="text-gray-600">
                    A popular option for villa ownership, allowing for long-term leases up to 30 years with potential extensions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-custom-green-50 p-3 rounded-full mr-4">
                      <Landmark className="h-6 w-6 text-custom-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">3. Thai Company Formation</h3>
                  </div>
                  <p className="text-gray-600">
                    Establishing a Thai Limited Company to purchase property, with proper legal structure and compliance.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-custom-green-50 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-custom-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">4. Marriage to a Thai National</h3>
                  </div>
                  <p className="text-gray-600">
                    Property ownership through marriage, with specific legal considerations and protections.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-custom-green-50 p-3 rounded-full mr-4">
                      <FileCheck className="h-6 w-6 text-custom-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">5. BOI Investment</h3>
                  </div>
                  <p className="text-gray-600">
                    This unique type of property ownership option in Thailand is more uncommon for a residential purchase, but it is still a possible option for investors of luxury villas and resorts for sale, however there is a strict assessment procedure to qualify.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-start">
                <div className="bg-custom-green-50 p-3 rounded-full mr-6">
                  <Shield className="h-8 w-8 text-custom-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Need Professional Guidance?</h3>
                  <p className="text-gray-600 mb-4">
                    Our experienced team can help guide you through the property purchase process in Thailand, ensuring a safe and compliant transaction.
                  </p>
                  <a href="/contact" className="inline-block bg-custom-green text-white px-6 py-3 rounded-md hover:bg-custom-green-600 transition-colors">
                    Contact Our Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyersGuide; 