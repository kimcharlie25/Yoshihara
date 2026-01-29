/*
  # Yoshihara Japanese Restaurant Menu
  
  Adds the complete menu for Yoshihara Japanese Restaurant including:
  - Uramaki, Hosomaki, Sashimi, Specialty Sushi
  - Donburi, Teishoku, Menrui
  - Rice Burgers, Sides & Appetizers, Dessert
*/

-- 1. Insert Yoshihara Categories
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('yoshihara-uramaki', 'Uramaki [Inside Out Rolls]', '🍣', 20, true),
  ('yoshihara-hosomaki', 'Hosomaki [Thin Rolls]', '🍱', 21, true),
  ('yoshihara-sashimi', 'Sashimi', '🐟', 22, true),
  ('yoshihara-specialty-sushi', 'Specialty Sushi', '🍙', 23, true),
  ('yoshihara-donburi', 'Donburi [Rice Bowls]', '🍜', 24, true),
  ('yoshihara-teishoku', 'Teishoku [Rice Set Meals]', '🍱', 25, true),
  ('yoshihara-menrui', 'Menrui [Noodles]', '🍜', 26, true),
  ('yoshihara-rice-burgers', 'Rice Burgers', '🍔', 27, true),
  ('yoshihara-sides', 'Sides & Appetizers', '🍟', 28, true),
  ('yoshihara-dessert', 'Dessert', '🍦', 29, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- 2. Insert Uramaki items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Spicy Salmon Maki', 'Fresh salmon with spicy mayo and cucumber', 545.00, 'yoshihara-uramaki', false, true),
  ('Spicy Tuna Maki', 'Fresh tuna with spicy mayo and cucumber', 485.00, 'yoshihara-uramaki', false, true),
  ('California Maki', 'Crabsticks, mango, cucumber, and tobiko', 380.00, 'yoshihara-uramaki', true, true),
  ('Spicy Crunchy Kani Mayo Maki', 'Spicy kani salad with crunchy bits', 345.00, 'yoshihara-uramaki', false, true),
  ('Crunchy Kani Mayo Maki', 'Kani salad with crunchy bits', 325.00, 'yoshihara-uramaki', false, true),
  ('Aburi Ebi Maki', 'Torched shrimp maki with special sauce', 675.00, 'yoshihara-uramaki', false, true),
  ('Assorted Maki Platter', 'California Maki, Crunchy Kani Mayo & Spicy Crunchy Roll', 1045.00, 'yoshihara-uramaki', false, true);

-- Add variations for Kani Maki (Without Tobiko)
DO $$
DECLARE
  spicy_id uuid;
  crunchy_id uuid;
BEGIN
  SELECT id INTO spicy_id FROM menu_items WHERE name = 'Spicy Crunchy Kani Mayo Maki' LIMIT 1;
  SELECT id INTO crunchy_id FROM menu_items WHERE name = 'Crunchy Kani Mayo Maki' LIMIT 1;
  
  IF spicy_id IS NOT NULL THEN
    INSERT INTO variations (menu_item_id, name, price) VALUES (spicy_id, 'Without Tobiko', -45.00) ON CONFLICT DO NOTHING;
  END IF;
  IF crunchy_id IS NOT NULL THEN
    INSERT INTO variations (menu_item_id, name, price) VALUES (crunchy_id, 'Without Tobiko', -45.00) ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- 3. Insert Hosomaki items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Kappa Maki', 'Cucumber thin roll', 150.00, 'yoshihara-hosomaki', false, true),
  ('Takuan Maki', 'Pickled radish thin roll', 155.00, 'yoshihara-hosomaki', false, true),
  ('Kanpyo Maki', 'Dried gourd thin roll', 180.00, 'yoshihara-hosomaki', false, true),
  ('Tuna Mayo Maki', 'Tuna mayo with cucumber thin roll', 230.00, 'yoshihara-hosomaki', false, true),
  ('Kanikama Maki', 'Crabsticks and mayo thin roll', 215.00, 'yoshihara-hosomaki', false, true),
  ('Salmon Hosomaki', 'Fresh salmon thin roll', 270.00, 'yoshihara-hosomaki', false, true),
  ('Tekka Maki', 'Fresh tuna thin roll', 235.00, 'yoshihara-hosomaki', false, true);

-- 4. Insert Sashimi items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Salmon Sashimi [100g]', 'Freshly sliced premium salmon', 355.00, 'yoshihara-sashimi', true, true),
  ('Tuna Sashimi [100g]', 'Freshly sliced premium tuna', 325.00, 'yoshihara-sashimi', false, true),
  ('Mixed Sashimi [200g]', 'Freshly sliced salmon and tuna', 675.00, 'yoshihara-sashimi', false, true),
  ('Uni [100g]', 'Fresh sea urchin', 320.00, 'yoshihara-sashimi', false, true);

-- 5. Insert Specialty Sushi
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Aburi Open Inari', 'Torched tofu pouch sushi with assorted toppings', 785.00, 'yoshihara-specialty-sushi', false, true);

-- 6. Insert Donburi items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Buta Kimchi Don', 'Stir-fried Pork & Kimchi, with Onsen Egg', 280.00, 'yoshihara-donburi', false, true),
  ('Pork Garlic Pepper Rice Bowl', 'Savory pork with garlic and pepper', 275.00, 'yoshihara-donburi', true, true),
  ('Shougayaki Don', 'Pork ginger saute bowl', 280.00, 'yoshihara-donburi', false, true),
  ('Hoikoro Don', 'Stir-fried Pork belly, Cabbage and Bell Pepper', 275.00, 'yoshihara-donburi', false, true),
  ('Katsudon', 'Pork cutlet with eggs and onions', 335.00, 'yoshihara-donburi', true, true),
  ('Tendon', '3pcs. Shrimp and Veggie Tempura', 355.00, 'yoshihara-donburi', false, true),
  ('Jo Tendon', '3pcs. Shrimp and veggie overload Tempura', 625.00, 'yoshihara-donburi', false, true),
  ('Unadon', 'Grilled Unagi with Kabayaki sauce', 580.00, 'yoshihara-donburi', false, true),
  ('Bara Chirashi Don', 'Salmon, Tuna, Tamago, Cucumber, Crabsticks, Tobiko', 355.00, 'yoshihara-donburi', true, true),
  ('Noriben', 'Classic Nori Bento (Exclusive for Take-out Only)', 290.00, 'yoshihara-donburi', false, true);

-- Add Set Meal add-on and Onsen Egg to Donburi
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, name FROM menu_items WHERE category = 'yoshihara-donburi' LOOP
    -- Add generic Set Meal add-on
    INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
      (item.id, 'Set Meal (Miso Soup, Salad, Pickles)', 80.00, 'meal-set')
    ON CONFLICT DO NOTHING;
    
    -- Add specific Onsen Egg add-on to Pork Garlic Pepper Rice Bowl
    IF item.name = 'Pork Garlic Pepper Rice Bowl' THEN
      INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
        (item.id, 'Onsen Egg', 25.00, 'extra')
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- 7. Insert Teishoku items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Oroshi Chicken Tatsuta', 'Chicken fillet in grated radish Sauce (Includes Soup/Pickles)', 425.00, 'yoshihara-teishoku', false, true),
  ('Chicken Nanban', 'Crispy Chicken with tangy sauce and tartar (Includes Soup/Pickles)', 425.00, 'yoshihara-teishoku', true, true),
  ('Mabo Dofu', 'Japanese Style Mapo Tofu (Includes Soup/Pickles)', 320.00, 'yoshihara-teishoku', false, true),
  ('Chicken Karaage', '4pcs. Japanese Style Fried Chicken (Includes Soup/Pickles)', 365.00, 'yoshihara-teishoku', false, true),
  ('Garlic Pork Saute', 'Pork loin sauteed in garlic & butter (Includes Soup/Pickles)', 430.00, 'yoshihara-teishoku', false, true),
  ('Tonkatsu', 'Japanese Style Pork Cutlet (Includes Soup/Pickles)', 465.00, 'yoshihara-teishoku', false, true);

-- Add variation for Teishoku (Solo - Deduct 70)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id FROM menu_items WHERE category = 'yoshihara-teishoku' LOOP
    INSERT INTO variations (menu_item_id, name, price) VALUES
      (item.id, 'Solo (No Miso Soup/Pickles)', -70.00)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- 8. Insert Menrui items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Yakisoba', 'Stir-fried Soba Noodles', 275.00, 'yoshihara-menrui', false, true),
  ('Yakiudon', 'Stir-fried Udon Noodles', 285.00, 'yoshihara-menrui', false, true),
  ('Beef Curry Udon', 'Udon noodles in beef curry sauce', 345.00, 'yoshihara-menrui', false, true),
  ('Beef Ontama Udon', 'Udon topped with thinly sliced Beef and onsen egg', 325.00, 'yoshihara-menrui', true, true),
  ('Tempura Udon', 'Udon topped with Ebi Tempura', 355.00, 'yoshihara-menrui', false, true),
  ('Kitsune Udon', 'Udon topped with seasoned tofu pouches', 295.00, 'yoshihara-menrui', false, true),
  ('Cha Zaru Soba Set', 'Cold Green Tea Soba with Tempura set', 545.00, 'yoshihara-menrui', false, true),
  ('Soumen', 'Cold thin white Japanese Noodles', 250.00, 'yoshihara-menrui', false, true);

-- 9. Insert Rice Burger items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Yakiniku Rice Burger', 'Beef yakiniku between grilled rice patties', 200.00, 'yoshihara-rice-burgers', true, true),
  ('Kimchi Yakiniku Rice Burger', 'Beef yakiniku and kimchi rice burger', 225.00, 'yoshihara-rice-burgers', false, true),
  ('Tsukimi Rice Burger', 'Rice burger with egg', 230.00, 'yoshihara-rice-burgers', false, true),
  ('Yakiniku Cheese Rice Burger', 'Beef yakiniku and cheese rice burger', 230.00, 'yoshihara-rice-burgers', false, true);

-- 10. Insert Sides & Appetizers
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Takoyaki', 'Japanese octopus snacks', 150.00, 'yoshihara-sides', true, true),
  ('Yasai Stick', 'Cucumber, Radish, and Carrots sticks', 195.00, 'yoshihara-sides', false, true),
  ('French Fries', 'Crispy fries with choice of powders', 125.00, 'yoshihara-sides', false, true);

-- Add variations for Takoyaki (8pcs +100) and flavoring for Fries
DO $$
DECLARE
  tako_id uuid;
  fries_id uuid;
BEGIN
  SELECT id INTO tako_id FROM menu_items WHERE name = 'Takoyaki' LIMIT 1;
  SELECT id INTO fries_id FROM menu_items WHERE name = 'French Fries' AND category = 'yoshihara-sides' LIMIT 1;
  
  IF tako_id IS NOT NULL THEN
    INSERT INTO variations (menu_item_id, name, price) VALUES (tako_id, '8pcs', 100.00) ON CONFLICT DO NOTHING;
    INSERT INTO variations (menu_item_id, name, price) VALUES (tako_id, '4pcs', 0.00) ON CONFLICT DO NOTHING;
  END IF;
  
  IF fries_id IS NOT NULL THEN
    INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
      (fries_id, 'Nori Shio', 0.00, 'flavor'),
      (fries_id, 'Corn Potage', 0.00, 'flavor'),
      (fries_id, 'Takoyaki Flavor', 0.00, 'flavor'),
      (fries_id, 'Curry powder', 0.00, 'flavor'),
      (fries_id, 'Soy Butter', 0.00, 'flavor')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- 11. Insert Dessert
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Taiyaki', 'Fish-shaped cake with filling', 155.00, 'yoshihara-dessert', true, true);

-- Add flavor variations for Taiyaki
DO $$
DECLARE
  taiyaki_id uuid;
BEGIN
  SELECT id INTO taiyaki_id FROM menu_items WHERE name = 'Taiyaki' LIMIT 1;
  
  IF taiyaki_id IS NOT NULL THEN
    INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
      (taiyaki_id, 'Custard Filling', 0.00, 'flavor'),
      (taiyaki_id, 'Red Bean Filling', 0.00, 'flavor')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
