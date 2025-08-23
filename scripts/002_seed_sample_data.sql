-- Insert sample artisan profile (this will be replaced by real signup data)
-- Note: This is just for testing - in production, data comes from user signups

-- First, we need to create a sample user in auth.users (this would normally be done via signup)
-- For demo purposes, we'll insert sample data that can be referenced

INSERT INTO public.profiles (id, user_type, full_name, email) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'artisan', 'Aastha Patel', 'aastha@example.com')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.artisan_profiles (
  id, 
  location, 
  specialization, 
  learning_source, 
  experience_years, 
  bio,
  profile_image_url,
  banner_image_url,
  rating,
  review_count,
  completed_projects
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Mumbai, Maharashtra',
  'Contemporary Mandala Art & Digital Illustrations',
  'Self-taught through online courses and traditional art workshops',
  8,
  'Passionate contemporary artist specializing in intricate mandala designs and digital illustrations. I blend traditional Indian motifs with modern artistic techniques to create unique, personalized artwork that tells your story.',
  '/indian-artisan-smile.png',
  '/indian-textile-workshop.png',
  4.8,
  95,
  67
) ON CONFLICT (id) DO NOTHING;

-- Insert sample projects for Aastha
INSERT INTO public.projects (artisan_id, title, description, image_url, price, completion_time) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Custom Mandala Wall Hanging', 'Intricate mandala design with personalized elements', '/blue-gold-mandala.png', '$180', '2 weeks'),
('550e8400-e29b-41d4-a716-446655440000', 'Digital Portrait with Mandala Background', 'Modern portrait art with traditional mandala elements', '/generated-mandala-design.png', '$220', '3 weeks'),
('550e8400-e29b-41d4-a716-446655440000', 'Lotus Motif Cushion Covers', 'Set of decorative cushion covers with lotus designs', '/lotus-cushion-covers.png', '$75', '1 week'),
('550e8400-e29b-41d4-a716-446655440000', 'Paisley Table Runner Set', 'Traditional paisley patterns on modern table runners', '/terracotta-paisley-runner.png', '$120', '10 days'),
('550e8400-e29b-41d4-a716-446655440000', 'Custom Wedding Invitation Design', 'Elegant wedding invitations with traditional motifs', '/placeholder-txtp1.png', '$250', '3 weeks'),
('550e8400-e29b-41d4-a716-446655440000', 'Traditional Rajasthani Tapestry', 'Large-scale tapestry with Rajasthani folk art', '/placeholder-k6vwd.png', '$320', '4 weeks');
