import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };
  
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setShowLightbox(true);
  };
  
  const closeLightbox = () => {
    setShowLightbox(false);
  };
  
  return (
    <div>
      {/* Main Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 aspect-video">
          <img 
            src={images[0]} 
            alt={`${title} - Main Image`} 
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => openLightbox(0)}
          />
        </div>
        
        {images.slice(1).map((image, index) => (
          <div key={index} className="aspect-video">
            <img 
              src={image} 
              alt={`${title} - Image ${index + 2}`} 
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openLightbox(index + 1)}
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 text-white hover:bg-opacity-30 transition-opacity"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={prevImage}
            className="absolute left-4 bg-white bg-opacity-20 rounded-full p-2 text-white hover:bg-opacity-30 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          
          <img 
            src={images[currentIndex]} 
            alt={`${title} - Lightbox Image ${currentIndex + 1}`}
            className="max-h-[85vh] max-w-[85vw] object-contain"
          />
          
          <button 
            onClick={nextImage}
            className="absolute right-4 bg-white bg-opacity-20 rounded-full p-2 text-white hover:bg-opacity-30 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-4 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;