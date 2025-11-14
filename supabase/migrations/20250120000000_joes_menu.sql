/*
  # Joe's Menu - Complete Menu Items Insertion
  
  This migration adds all menu items from Joe's Menu including:
  - Food items (Pork, Silog, Fish, Beef, Seafood, Pasta, Chicken, Sandwich, Sides)
  - Drinks (Milk Tea, Yogurt, Matcha, Coffee, Soda, Shaken, Fruit Teas, Sweet Latte)
  - Variations for size options
  - Add-ons for customizable items
*/

-- First, ensure all categories exist
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('pork', 'Pork', '🥓', 1, true),
  ('silog', 'Joe''s Silog', '🍳', 2, true),
  ('fish', 'Fish', '🐟', 3, true),
  ('beef', 'Beef', '🥩', 4, true),
  ('seafood', 'Seafood', '🦐', 5, true),
  ('pasta', 'Platter Pasta', '🍝', 6, true),
  ('chicken', 'Chicken', '🍗', 7, true),
  ('sandwich', 'Sandwich w/ Fries', '🥪', 8, true),
  ('sides', 'Sides & Rice', '🍚', 9, true),
  ('milk-tea', 'Milk Tea', '🧋', 10, true),
  ('yogurt', 'Yogurt Series', '🥤', 11, true),
  ('matcha', 'Joe''s Matcha''raps', '🍵', 12, true),
  ('coffee', 'Ice & Hot Coffee', '☕', 13, true),
  ('soda', 'Ice Cream Soda', '🥤', 14, true),
  ('shaken', 'Iced Shaken', '🧊', 15, true),
  ('fruit-tea', 'Fruit Teas', '🍹', 16, true),
  ('sweet-latte', 'Sweet Latte', '🥛', 17, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Insert Pork items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Lechon Kawali', 'Crispy fried pork belly', 300.00, 'pork', false, true),
  ('Chicharong Bulaklak', 'Crispy pork intestines', 150.00, 'pork', false, true),
  ('Sweet and Sour Pork', 'Tender pork in sweet and sour sauce', 200.00, 'pork', false, true),
  ('Pork Adobo', 'Classic Filipino pork adobo', 200.00, 'pork', true, true),
  ('Sisig', 'Sizzling chopped pork with onions and chili', 200.00, 'pork', true, true),
  ('Grilled Liempo', 'Grilled pork belly', 250.00, 'pork', false, true),
  ('Sinigang na Baboy', 'Sour pork soup', 250.00, 'pork', false, true),
  ('Nilagang Baboy', 'Boiled pork soup', 250.00, 'pork', false, true),
  ('Pork Shanghai', 'Pork spring rolls (12pcs)', 180.00, 'pork', false, true);

-- Insert Joe's Silog items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Tapsilog', 'Tapa, sinangag, and itlog', 110.00, 'silog', true, true),
  ('Tocilog', 'Tocino, sinangag, and itlog', 110.00, 'silog', true, true),
  ('Bangsilog', 'Bangus, sinangag, and itlog', 110.00, 'silog', false, true),
  ('Hotsilog', 'Hotdog, sinangag, and itlog', 90.00, 'silog', false, true),
  ('Spamsilog', 'Spam, sinangag, and itlog', 110.00, 'silog', false, true),
  ('Chicksilog', 'Chicken, sinangag, and itlog', 110.00, 'silog', false, true),
  ('Porksilog', 'Pork, sinangag, and itlog', 110.00, 'silog', false, true),
  ('Cornsilog', 'Corned beef, sinangag, and itlog', 90.00, 'silog', false, true),
  ('Longsilog', 'Longganisa, sinangag, and itlog', 110.00, 'silog', false, true);

-- Insert Fish items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Fish Fillet', 'Breaded fish fillet', 150.00, 'fish', false, true),
  ('Crispy Hito', 'Crispy fried catfish', 190.00, 'fish', false, true),
  ('Fried Boneless Bangus', 'Fried boneless milkfish', 205.00, 'fish', false, true),
  ('Kilawing Bangus', 'Raw milkfish in vinegar', 235.00, 'fish', false, true),
  ('Sisig Bangus', 'Sizzling milkfish sisig', 235.00, 'fish', false, true);

-- Insert Beef items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Pigar-Pigar', 'Stir-fried beef with vegetables', 200.00, 'beef', false, true),
  ('Bulalo', 'Beef shank soup', 350.00, 'beef', true, true),
  ('Sinigang Na Baka', 'Sour beef soup', 350.00, 'beef', false, true),
  ('Nilagang Baka', 'Boiled beef soup', 350.00, 'beef', false, true),
  ('Beef Broccoli', 'Beef with broccoli in savory sauce', 300.00, 'beef', false, true),
  ('Beef Mushroom', 'Beef with mushrooms', 300.00, 'beef', false, true),
  ('Beef Kare-Kare', 'Beef in peanut sauce', 350.00, 'beef', false, true);

-- Insert Seafood items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Spicy Mix Seafood', 'Mixed seafood in spicy sauce', 550.00, 'seafood', false, true),
  ('Buttered Shrimp', 'Shrimp in butter sauce', 350.00, 'seafood', false, true),
  ('Sinigang Na Hipon', 'Sour shrimp soup', 350.00, 'seafood', false, true),
  ('Tempura', 'Battered and fried shrimp', 350.00, 'seafood', false, true),
  ('Calamar(e)s', 'Fried squid rings', 220.00, 'seafood', false, true),
  ('Seafood Kare-Kare', 'Mixed seafood in peanut sauce', 350.00, 'seafood', false, true);

-- Insert Platter Pasta items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Spaghetti Platter', 'Classic spaghetti in tomato sauce', 250.00, 'pasta', false, true),
  ('Carbonara Platter', 'Creamy carbonara pasta', 350.00, 'pasta', false, true),
  ('Pancit Sisig', 'Noodles with sisig', 350.00, 'pasta', false, true),
  ('Pancit Seafood Curry', 'Noodles with seafood in curry sauce', 450.00, 'pasta', false, true),
  ('Palabok', 'Rice noodles with shrimp sauce', 250.00, 'pasta', false, true),
  ('Pancit Bihon Platter', 'Rice vermicelli noodles', 180.00, 'pasta', false, true),
  ('Pancit Bihon Canton Mix', 'Mixed rice and egg noodles', 200.00, 'pasta', false, true),
  ('Pancit Canton Platter', 'Egg noodles', 200.00, 'pasta', false, true),
  ('Pancit Sotanghon', 'Glass noodles', 250.00, 'pasta', false, true),
  ('Pancit Sotanghon Canton Mix', 'Mixed glass and egg noodles', 250.00, 'pasta', false, true);

-- Insert Chicken items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Fried Chicken', 'Crispy fried chicken', 180.00, 'chicken', true, true),
  ('Chicken Adobo', 'Classic Filipino chicken adobo', 180.00, 'chicken', true, true),
  ('Tinolang Manok', 'Chicken ginger soup', 190.00, 'chicken', false, true),
  ('Chicken Fillet', 'Breaded chicken fillet', 170.00, 'chicken', false, true),
  ('Creamy Chicken Mushroom', 'Chicken in creamy mushroom sauce', 190.00, 'chicken', false, true),
  ('Buttered Chicken', 'Chicken in butter sauce', 180.00, 'chicken', false, true),
  ('Fried Chicken W/ Salted Egg', 'Crispy fried chicken with salted egg', 205.00, 'chicken', false, true);

-- Insert Sandwich w/ Fries items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Clubhouse', 'Clubhouse sandwich with fries', 180.00, 'sandwich', false, true),
  ('Chicken Sandwich', 'Chicken sandwich with fries', 180.00, 'sandwich', false, true),
  ('Tuna Sandwich', 'Tuna sandwich with fries', 180.00, 'sandwich', false, true),
  ('Burger', 'Classic burger with fries', 100.00, 'sandwich', false, true),
  ('Burger W/ Cheese', 'Cheeseburger with fries', 120.00, 'sandwich', false, true),
  ('Chicken Burger', 'Chicken burger with fries', 120.00, 'sandwich', false, true);

-- Insert Sides & Rice items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Fries', 'Crispy french fries', 110.00, 'sides', false, true),
  ('Plain Nachos', 'Plain nachos', 185.00, 'sides', false, true),
  ('Rice Platter', 'Rice platter', 180.00, 'sides', false, true),
  ('Rice Cup', 'Single cup of rice', 30.00, 'sides', false, true);

-- Add add-ons for Fries (Cheese, BBQ, Sour cream)
DO $$
DECLARE
  fries_id uuid;
BEGIN
  SELECT id INTO fries_id FROM menu_items WHERE name = 'Fries' LIMIT 1;
  
  IF fries_id IS NOT NULL THEN
    INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
      (fries_id, 'Cheese', 0.00, 'flavor'),
      (fries_id, 'BBQ', 0.00, 'flavor'),
      (fries_id, 'Sour Cream', 0.00, 'flavor')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- Insert Milk Tea items (base price is 16oz, variations for 22oz)
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Milk Tea', 'Classic milk tea', 60.00, 'milk-tea', true, true),
  ('Wintermelon', 'Wintermelon milk tea', 60.00, 'milk-tea', false, true),
  ('Okinawa', 'Okinawa milk tea', 60.00, 'milk-tea', false, true),
  ('Chocolate', 'Chocolate milk tea', 60.00, 'milk-tea', false, true),
  ('Cheese Cake', 'Cheesecake milk tea', 60.00, 'milk-tea', false, true),
  ('Dark Choco', 'Dark chocolate milk tea', 65.00, 'milk-tea', false, true),
  ('Ube Taro', 'Ube taro milk tea', 60.00, 'milk-tea', false, true),
  ('Cookies & Cream', 'Cookies and cream milk tea', 60.00, 'milk-tea', false, true),
  ('K Cookies & Cream', 'K cookies and cream milk tea', 65.00, 'milk-tea', false, true),
  ('(Matcha) Choco Vanilla', 'Matcha chocolate vanilla milk tea', 65.00, 'milk-tea', false, true),
  ('Choco Hazelnut', 'Chocolate hazelnut milk tea', 65.00, 'milk-tea', false, true);

-- Add variations for Milk Tea (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, name, base_price FROM menu_items WHERE category = 'milk-tea' LOOP
    INSERT INTO variations (menu_item_id, name, price) VALUES
      (item.id, '22oz', 10.00)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- Insert Yogurt Series items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Sakura', 'Sakura yogurt drink', 95.00, 'yogurt', false, true),
  ('Blueberry', 'Blueberry yogurt drink', 80.00, 'yogurt', false, true),
  ('Lychee', 'Lychee yogurt drink', 80.00, 'yogurt', false, true),
  ('Strawberry', 'Strawberry yogurt drink', 80.00, 'yogurt', false, true),
  ('Passion', 'Passion fruit yogurt drink', 80.00, 'yogurt', false, true),
  ('Kiwi', 'Kiwi yogurt drink', 80.00, 'yogurt', false, true),
  ('Green Apple', 'Green apple yogurt drink', 80.00, 'yogurt', false, true);

-- Add variations for Yogurt Series (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, name, base_price FROM menu_items WHERE category = 'yogurt' LOOP
    IF item.name = 'Sakura' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 15.00)
      ON CONFLICT DO NOTHING;
    ELSE
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 15.00)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- Insert Joe's Matcha'raps items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Matcha Milktea', 'Matcha milk tea', 70.00, 'matcha', false, true),
  ('Matcha Latte', 'Matcha latte', 95.00, 'matcha', false, true),
  ('(Americano Meets Tokyo)', 'Americano meets Tokyo matcha', 115.00, 'matcha', false, true),
  ('Matcha Frappe', 'Matcha frappe', 120.00, 'matcha', false, true),
  ('Matcha Oreo Frappe', 'Matcha oreo frappe', 125.00, 'matcha', false, true),
  ('Matcha Manga', 'Matcha mango', 125.00, 'matcha', false, true);

-- Add variations for Matcha'raps (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, name, base_price FROM menu_items WHERE category = 'matcha' LOOP
    IF item.name = 'Matcha Milktea' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.name = 'Matcha Latte' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 20.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.name = '(Americano Meets Tokyo)' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.name = 'Matcha Frappe' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.name = 'Matcha Oreo Frappe' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.name = 'Matcha Manga' THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- Insert Ice & Hot Coffee items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Americano', 'Espresso with hot water', 65.00, 'coffee', true, true),
  ('Latte', 'Espresso with steamed milk', 75.00, 'coffee', true, true),
  ('Cappuccino', 'Espresso with frothed milk', 75.00, 'coffee', false, true),
  ('Caramel Macchiatto', 'Espresso with caramel and milk', 110.00, 'coffee', false, true),
  ('Vanillatte', 'Espresso with vanilla and milk', 110.00, 'coffee', false, true),
  ('Hazelnut', 'Espresso with hazelnut and milk', 110.00, 'coffee', false, true),
  ('Mocha', 'Espresso with chocolate and milk', 110.00, 'coffee', false, true),
  ('Salted Caramel', 'Espresso with salted caramel and milk', 110.00, 'coffee', false, true),
  ('White Mocha', 'Espresso with white chocolate and milk', 110.00, 'coffee', false, true),
  ('Spanish', 'Spanish latte', 110.00, 'coffee', false, true);

-- Add variations for Coffee (22oz ice, 12oz hot)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, name, base_price FROM menu_items WHERE category = 'coffee' LOOP
    IF item.base_price = 65.00 THEN
      -- Americano: 65/75/70
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00),
        (item.id, '12oz Hot', 5.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.base_price = 75.00 THEN
      -- Latte/Cappuccino: 75/85/80
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 10.00),
        (item.id, '12oz Hot', 5.00)
      ON CONFLICT DO NOTHING;
    ELSIF item.base_price = 110.00 THEN
      -- Flavored coffees: 110/125/115
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 15.00),
        (item.id, '12oz Hot', 5.00)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- Insert Ice Cream Soda items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Mango', 'Mango ice cream soda', 70.00, 'soda', false, true),
  ('Passion', 'Passion fruit ice cream soda', 70.00, 'soda', false, true),
  ('Blueberry', 'Blueberry ice cream soda', 70.00, 'soda', false, true),
  ('Strawberry', 'Strawberry ice cream soda', 70.00, 'soda', false, true),
  ('Lychee', 'Lychee ice cream soda', 70.00, 'soda', false, true),
  ('Green Apple', 'Green apple ice cream soda', 70.00, 'soda', false, true),
  ('Kiwi', 'Kiwi ice cream soda', 70.00, 'soda', false, true);

-- Add variations for Ice Cream Soda (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id FROM menu_items WHERE category = 'soda' LOOP
    INSERT INTO variations (menu_item_id, name, price) VALUES
      (item.id, '22oz', 15.00)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- Insert Iced Shaken items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Classic', 'Classic iced shaken', 100.00, 'shaken', false, true),
  ('Mocha', 'Mocha iced shaken', 125.00, 'shaken', false, true),
  ('White Mocha', 'White mocha iced shaken', 125.00, 'shaken', false, true),
  ('Vanilla', 'Vanilla iced shaken', 125.00, 'shaken', false, true),
  ('Hazelnut', 'Hazelnut iced shaken', 125.00, 'shaken', false, true);

-- Add variations for Iced Shaken (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, base_price FROM menu_items WHERE category = 'shaken' LOOP
    IF item.base_price = 100.00 THEN
      -- Classic: 100/130
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 30.00)
      ON CONFLICT DO NOTHING;
    ELSE
      -- Others: 125/155
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 30.00)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

-- Insert Fruit Teas items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Passion', 'Passion fruit tea', 70.00, 'fruit-tea', false, true),
  ('Blueberry', 'Blueberry fruit tea', 70.00, 'fruit-tea', false, true),
  ('Strawberry', 'Strawberry fruit tea', 70.00, 'fruit-tea', false, true),
  ('Lychee', 'Lychee fruit tea', 70.00, 'fruit-tea', false, true),
  ('Green Apple', 'Green apple fruit tea', 70.00, 'fruit-tea', false, true),
  ('Kiwi', 'Kiwi fruit tea', 70.00, 'fruit-tea', false, true);

-- Add variations for Fruit Teas (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id FROM menu_items WHERE category = 'fruit-tea' LOOP
    INSERT INTO variations (menu_item_id, name, price) VALUES
      (item.id, '22oz', 10.00)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- Insert Sweet Latte items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Chocolate', 'Chocolate sweet latte', 100.00, 'sweet-latte', false, true),
  ('Strawberry', 'Strawberry sweet latte', 100.00, 'sweet-latte', false, true),
  ('Choco Berry', 'Chocolate berry sweet latte', 100.00, 'sweet-latte', false, true),
  ('Oatside', 'Oatside sweet latte', 100.00, 'sweet-latte', false, true),
  ('Sweet Milk', 'Sweet milk latte', 90.00, 'sweet-latte', false, true);

-- Add variations for Sweet Latte (22oz)
DO $$
DECLARE
  item RECORD;
BEGIN
  FOR item IN SELECT id, base_price FROM menu_items WHERE category = 'sweet-latte' LOOP
    IF item.base_price = 100.00 THEN
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 15.00)
      ON CONFLICT DO NOTHING;
    ELSE
      -- Sweet Milk: 90/105
      INSERT INTO variations (menu_item_id, name, price) VALUES
        (item.id, '22oz', 15.00)
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
END $$;

