-- Add New Categories for Yoshihara
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('yoshihara-nabe', 'HITORI NABE [Personal Hot Pot]', '🍲', 30, true),
  ('yoshihara-onigirazu', 'ONIGIRAZU [Sushi Sandwiches]', '🥪', 31, true),
  ('yoshihara-pawfect', 'PAWFECT MENU [Dog-Friendly]', '🐶', 32, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- Insert HITORI NABE items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Kimchi Nabe', 'A spicy, savory hot pot featuring kimchi, tofu, mushrooms, and greens.', 565.00, 'yoshihara-nabe', false, true),
  ('Miso Nabe', 'A rich miso-based broth with mushrooms, cabbage, and carrots.', 565.00, 'yoshihara-nabe', false, true),
  ('Yose Nabe', 'A "gathering" style pot with chicken, mushrooms, tofu, and assorted vegetables.', 605.00, 'yoshihara-nabe', false, true),
  ('Tonyu-Goma Nabe', 'A creamy soy milk and sesame-based broth with chicken, tofu, and greens.', 590.00, 'yoshihara-nabe', false, true);

-- Insert ONIGIRAZU items
-- All varieties include Chicken Spam, Egg, Rice, and Nori Seaweeds.
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Classic Onigirazu', 'The original combination of chicken spam and egg. Includes Rice and Nori.', 150.00, 'yoshihara-onigirazu', true, true),
  ('Teriyaki Onigirazu', 'Chicken spam in teriyaki sauce with egg. Includes Rice and Nori.', 185.00, 'yoshihara-onigirazu', false, true),
  ('Cheese Onigirazu', 'Chicken spam, egg, cheese, and ketchup. Includes Rice and Nori.', 200.00, 'yoshihara-onigirazu', false, true),
  ('Ebi Tartar Onigirazu', 'Chicken spam, egg, Ebi Furai (fried shrimp), and tartar sauce. Includes Rice and Nori.', 275.00, 'yoshihara-onigirazu', false, true);

-- Insert PAWFECT MENU items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Paw-sagna', 'Layers of lean ground beef, dog-friendly cheese, and fresh veggies. No salt or harmful additives.', 290.00, 'yoshihara-pawfect', false, true),
  ('Paw-getti & Muttballs', 'Dog-safe pasta with "muttballs" made from meat and veggie bits.', 290.00, 'yoshihara-pawfect', false, true),
  ('Pawget Nuggets', 'Oven-baked (not fried) nuggets made with chicken breast, veggies, and oats.', 150.00, 'yoshihara-pawfect', false, true),
  ('Chick-N-Joy for Doggos', 'A dog-safe spin on fried chicken; oven-baked for a crispy texture.', 165.00, 'yoshihara-pawfect', false, true),
  ('Chicki Maki', 'Pup-safe sushi rolls with chicken, carrots, bell peppers, activated charcoal, and black sesame.', 200.00, 'yoshihara-pawfect', false, true),
  ('Dognuts', 'Pup-safe donuts with no sugar or harmful ingredients.', 125.00, 'yoshihara-pawfect', false, true),
  ('Pupsicles', 'A cold, frozen treat for dogs.', 105.00, 'yoshihara-pawfect', false, true);
