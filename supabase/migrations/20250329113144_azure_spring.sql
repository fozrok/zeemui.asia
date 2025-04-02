/*
  # Seed initial properties data
  
  This migration inserts initial property data from the static data file into the database.
*/

-- Insert sample properties
INSERT INTO properties (id, title, description, price, type, bedrooms, bathrooms, city, country, area, featured, new_property, active)
VALUES
  ('123e4567-e89b-12d3-a456-426614174001', 'Luxury 3 Bed Designer Villas for Sale in Ban Makham', 'These luxurious villas for sale in Koh Samui are located in the peaceful North West region, nestled on a serene, private hillside in Ban Makham. Designed with the utmost attention to detail, these properties offer breathtaking ocean views, infinity pools, and modern architecture that blends seamlessly with the natural surroundings.', 17000000, 'Villa', 3, 3, 'Ban Makham', 'Koh Samui', 'Koh Samui', true, true, true),
  
  ('123e4567-e89b-12d3-a456-426614174002', 'Stylish 4 Bedroom Sea View Luxury Villa in Big Buddha', 'This sleek villa for sale in Koh Samui is just 200 meters from the stunning Bangrak Bay, offering breathtaking sunset sea views. Positioned on the Big Buddha hillside, this property features a modern design with large glass windows that maximize the ocean panorama. The open-plan living area opens onto a large terrace with an infinity pool overlooking the bay.', 19900000, 'Villa', 4, 5, 'Big Buddha', 'Koh Samui', 'Koh Samui', true, false, true),
  
  ('123e4567-e89b-12d3-a456-426614174003', 'Luxury 4 Bed Sea View Villa for Sale in Chaweng Noi', 'This exquisite 4-bedroom luxury villa for sale is perched high in the Chaweng Noi hills, on the east coast of Koh Samui. Boasting breathtaking sea views, this contemporary property features a stunning infinity pool that appears to merge with the ocean horizon. With high ceilings and an open-plan design, the villa is flooded with natural light.', 18900000, 'Villa', 4, 4, 'Chaweng Noi', 'Koh Samui', 'Koh Samui', true, true, true),
  
  ('123e4567-e89b-12d3-a456-426614174004', 'Modern 5 Bedroom Luxury Pool Villa in Lamai', 'This modern 5-bedroom luxury pool villa is situated in the desirable Lamai area of Koh Samui. Built to the highest standards, this property offers a perfect blend of luxury and comfort. The villa boasts a spacious living area that opens onto a large terrace with a private infinity pool and unobstructed sea views.', 24500000, 'Villa', 5, 6, 'Lamai', 'Koh Samui', 'Koh Samui', false, false, true),
  
  ('123e4567-e89b-12d3-a456-426614174005', 'Beachfront 3 Bedroom Villa in Maenam', 'This stunning beachfront villa in Maenam offers direct access to one of Koh Samui''s most beautiful beaches. With 3 spacious bedrooms, each with its own en-suite bathroom, this property is perfect for those seeking a luxurious beachfront lifestyle. The villa features an open-plan design with floor-to-ceiling windows that showcase the magnificent ocean views.', 28000000, 'Villa', 3, 4, 'Maenam', 'Koh Samui', 'Koh Samui', false, true, true),
  
  ('123e4567-e89b-12d3-a456-426614174006', 'Elegant 4 Bedroom Ocean View Villa in Bophut Hills', 'Located in the prestigious Bophut Hills, this elegant 4-bedroom villa offers spectacular ocean views from every room. The property features a contemporary design with Asian influences, creating a perfect harmony between modern luxury and traditional elements. The spacious open-plan living area leads to a large terrace with an infinity pool that appears to merge with the ocean beyond.', 22500000, 'Villa', 4, 5, 'Bophut', 'Koh Samui', 'Koh Samui', false, false, false);

-- Insert property features
INSERT INTO property_features (property_id, feature) VALUES
  -- Property 1 features
  ('123e4567-e89b-12d3-a456-426614174001', 'Private Infinity Pool'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Ocean View'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Modern Kitchen'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Outdoor Dining Area'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Air Conditioning'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Smart Home System'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Private Garden'),
  ('123e4567-e89b-12d3-a456-426614174001', 'Secure Parking'),
  
  -- Property 2 features
  ('123e4567-e89b-12d3-a456-426614174002', 'Infinity Pool'),
  ('123e4567-e89b-12d3-a456-426614174002', 'Sea View'),
  ('123e4567-e89b-12d3-a456-426614174002', 'Modern Design'),
  ('123e4567-e89b-12d3-a456-426614174002', 'Floor-to-ceiling Windows'),
  ('123e4567-e89b-12d3-a456-426614174002', 'Fully Equipped Kitchen'),
  ('123e4567-e89b-12d3-a456-426614174002', 'Terrace'),
  ('123e4567-e89b-12d3-a456-426614174002', 'BBQ Area'),
  ('123e4567-e89b-12d3-a456-426614174002', 'Covered Parking'),
  
  -- Property 3 features
  ('123e4567-e89b-12d3-a456-426614174003', 'Infinity Edge Pool'),
  ('123e4567-e89b-12d3-a456-426614174003', 'Panoramic Sea View'),
  ('123e4567-e89b-12d3-a456-426614174003', 'High Ceilings'),
  ('123e4567-e89b-12d3-a456-426614174003', 'Open-plan Living'),
  ('123e4567-e89b-12d3-a456-426614174003', 'Modern Kitchen'),
  ('123e4567-e89b-12d3-a456-426614174003', 'Home Theater'),
  ('123e4567-e89b-12d3-a456-426614174003', 'Fitness Room'),
  ('123e4567-e89b-12d3-a456-426614174003', 'Outdoor Sala'),
  
  -- Property 4 features
  ('123e4567-e89b-12d3-a456-426614174004', 'Private Infinity Pool'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Sea View'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Modern Kitchen'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Wine Cellar'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Home Office'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Game Room'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Landscaped Garden'),
  ('123e4567-e89b-12d3-a456-426614174004', 'Security System'),
  
  -- Property 5 features
  ('123e4567-e89b-12d3-a456-426614174005', 'Direct Beach Access'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Beachfront Pool'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Outdoor Dining Sala'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Fully Equipped Kitchen'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Beach Loungers'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Tropical Garden'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Beachfront Terrace'),
  ('123e4567-e89b-12d3-a456-426614174005', 'Staff Quarters'),
  
  -- Property 6 features
  ('123e4567-e89b-12d3-a456-426614174006', 'Infinity Pool'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Ocean Views'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Home Theater'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Fully Equipped Gym'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Wine Cellar'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Office Space'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Maid''s Quarters'),
  ('123e4567-e89b-12d3-a456-426614174006', 'Covered Parking');

-- Insert property images
INSERT INTO property_images (property_id, image_url, display_order) VALUES
  -- Property 1 images
  ('123e4567-e89b-12d3-a456-426614174001', 'https://www.conradvillas.com/uploads/properties/218/koh-samui-luxury-designer-villas-for-sale-ban-makham-98249753.jpg', 1),
  ('123e4567-e89b-12d3-a456-426614174001', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 2),
  ('123e4567-e89b-12d3-a456-426614174001', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 3),
  
  -- Property 2 images
  ('123e4567-e89b-12d3-a456-426614174002', 'https://conradvillas-1f861.kxcdn.com/uploads/properties/217/thumb/koh-samui-sea-view-luxury-villa-in-big-buddha-4-26153618-property-small@2.jpg', 1),
  ('123e4567-e89b-12d3-a456-426614174002', 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 2),
  ('123e4567-e89b-12d3-a456-426614174002', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 3),
  
  -- Property 3 images
  ('123e4567-e89b-12d3-a456-426614174003', 'https://conradvillas-1f861.kxcdn.com/uploads/properties/211/thumb/luxury-4-bed-sea-view-villa-for-sale-in-chaweng-noi-41650382-property-small@2.jpg', 1),
  ('123e4567-e89b-12d3-a456-426614174003', 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 2),
  ('123e4567-e89b-12d3-a456-426614174003', 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 3),
  
  -- Property 4 images
  ('123e4567-e89b-12d3-a456-426614174004', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 1),
  ('123e4567-e89b-12d3-a456-426614174004', 'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 2),
  ('123e4567-e89b-12d3-a456-426614174004', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 3),
  
  -- Property 5 images
  ('123e4567-e89b-12d3-a456-426614174005', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 1),
  ('123e4567-e89b-12d3-a456-426614174005', 'https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 2),
  ('123e4567-e89b-12d3-a456-426614174005', 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 3),
  
  -- Property 6 images
  ('123e4567-e89b-12d3-a456-426614174006', 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 1),
  ('123e4567-e89b-12d3-a456-426614174006', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 2),
  ('123e4567-e89b-12d3-a456-426614174006', 'https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', 3);