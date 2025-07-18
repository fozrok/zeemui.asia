import React from 'react';
import { Award, Users, Globe, ThumbsUp, MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const About = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              About Zeemui
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Luxury real estate redefined: Excellence, integrity, and unparalleled service.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to Zeemui – Redefining Luxury Real Estate in Koh Samui.
                Zeemui is an independent British luxury property agency based in Koh Samui, Thailand. Founded with a clear mission, we provide discerning clients with access to the island's most exclusive and exceptional properties.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our journey is defined by an unwavering commitment to excellence, integrity, and personalized service. At Zeemui, we believe that purchasing a property is more than a transaction—it's a meaningful experience, and we are here to make that experience seamless, rewarding, and memorable.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With a curated portfolio of the finest villas, estates, and developments in Koh Samui's most desirable locations, we set the standard for luxury real estate on the island. Our team of trained professionals is dedicated to understanding your needs and guiding you through every step of the property journey with expertise, discretion, and care.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                As an independent agency, we are free from ties to developers or sellers. This allows us to offer impartial advice and honest insights, ensuring that your interests are always our priority.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our services are entirely free for property buyers—our commissions are only received from sellers. This transparent model supports our ethos of trust and fairness in every interaction.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At Zeemui, passion, creativity, and commitment drive everything we do. We go the extra mile to deliver beyond expectations, making your investment in Koh Samui not just secure, but truly exceptional.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://res.cloudinary.com/dhxriuzu5/image/upload/v1752715832/About-Us-Villa_Charal_-_June_2021_28_Large_ftwieh.jpg" 
                alt="Luxury villa" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="https://res.cloudinary.com/dhxriuzu5/image/upload/v1752715833/About-Us-Property_entry_view_Large_sbmryv.jpg" 
                alt="Luxury property" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="https://res.cloudinary.com/dhxriuzu5/image/upload/v1752715832/About-Us-Villa_L_-_May_2016_19_Large_w39ytm.jpg" 
                alt="Modern villa" 
                className="rounded-lg h-64 w-full object-cover"
              />
              <img 
                src="https://res.cloudinary.com/dhxriuzu5/image/upload/v1752715834/About-Us-Villa_L_-_May_2016_45_Large_jlpjnd.jpg" 
                alt="Luxury pool" 
                className="rounded-lg h-64 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Zeemui, our core values guide everything we do, from the properties we select to the service we provide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Award size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We are committed to excellence in every aspect of our business, from the properties we represent to the service we provide.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Integrity</h3>
              <p className="text-gray-600">
                We operate with unwavering integrity and transparency, ensuring that our clients can trust us completely throughout their journey.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Personalization</h3>
              <p className="text-gray-600">
                We believe in personalized service, tailoring our approach to meet the unique needs and preferences of each client.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-custom-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Globe size={24} className="text-custom-green" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovation and continuously seek new ways to enhance the experience of buying and selling luxury real estate.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">The Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet our Founder, bringing over two decades of expertise and passion for luxury real estate.
            </p>
          </div>
          
          {/* Founder Profile - Prominent and Centered */}
          <div>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-full">
                  <img 
                    src="https://res.cloudinary.com/dhxriuzu5/image/upload/v1744706701/zanette-small_yf0jba.jpg" 
                    alt="Zanette Cross" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl mb-2 text-gray-800">Zanette Cross</h3>
                  <div className="text-custom-green font-medium text-lg mb-4">Founder & Managing Director</div>
                  <p className="text-gray-600 leading-relaxed">
                  Zanette founded Zeemui after more than two decades of experience in the real estate industry, bringing with her a wealth of expertise and a reputation for excellence.
                  </p><br/>
                  <p className="text-gray-600 leading-relaxed">
                    Her career began in the UK with Countrywide plc, one of the largest property services groups, where she worked with prestigious brands including Bridgfords and Bairstow Eves.
                  </p><br/>
                  <p className="text-gray-600 leading-relaxed">
                  Her deep understanding of the market and unwavering professionalism quickly established her as a trusted and results-driven property advisor.
                  </p><br/>
                  <p className="text-gray-600 leading-relaxed">
                  After relocating to Thailand, Zanette spent nearly a decade in the real estate industry primarily as Sales Director for Conrad Properties in Koh Samui. During this time, she developed a profound knowledge of the local market, forged strong industry relationships, and helped clients from around the world secure their dream properties on the island.
                  </p><br/>
                  <p className="text-gray-600 leading-relaxed">
                  Zanette is widely respected for her extensive local insight, focused diligence, and perseverance in finding properties that perfectly match her clients' needs. Her hands-on, client-first approach has earned her lasting praise and loyalty from buyers who value her commitment to quality and integrity.
                  </p><br/>
                  <p className="text-gray-600 leading-relaxed">
                  Through Zeemui, Zanette channels her passion and expertise into a boutique real estate experience—offering impartial advice, exceptional service, and access to Koh Samui's most exclusive luxury properties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Hear from our satisfied clients who have experienced the Zeemui difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "We had a wonderful experience working with Zeemui, namely Zanette. She went above and beyond to assist us in the purchase of Villa Celadon on Samui, and made the entire process very smooth, no easy task in the midst of a global pandemic when we were based thousands of miles away. We would highly recommend Zanette who I'd work with again in a heartbeat."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">Jennifer M</h4>
                  <p className="text-gray-500 text-sm">Singapore</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I recently purchased my new property through Zanette at Zeemui after being highly recommended by her previous clients. After meeting Zanette I was inspired by her energy, passion, and professionalism. Her approach was simple, after discussing my requirements and expectations Zanette set about delivering them. Her open and honest communication through email, phone and personal contact helped me greatly to reach the decision to purchase my property. I congratulate her on her commitment and integrity and would not hesitate to recommend her unreservedly to prospective property purchasers."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">Jane E</h4>
                  <p className="text-gray-500 text-sm">New Zealand</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I had a fantastic experience working with Zeemui. Their team was professional, knowledgeable, and truly dedicated to helping me find the perfect property. From the initial consultation to the final closing, they provided excellent guidance and clear communication every step of the way."
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">Giovanni C</h4>
                  <p className="text-gray-500 text-sm">Italy</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I recently bought a property through Zeemui and would definitely recommend their services. Fast and professional answers and service. It was my first time and I couldn't have hoped for more! Thanks again!"
              </p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">Olivier D</h4>
                  <p className="text-gray-500 text-sm">Hong Kong</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're looking to buy, sell, or simply learn more about luxury real estate in Koh Samui, our team is here to help. Contact us today to schedule a consultation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-custom-green-50 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Phone size={20} className="text-custom-green" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      +66(0)620492980
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;