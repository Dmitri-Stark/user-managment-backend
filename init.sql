-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  status ENUM('pending', 'active', 'blocked') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create groups table
CREATE TABLE `groups` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status ENUM('empty', 'notEmpty') DEFAULT 'empty',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_groups table to establish many-to-many relationship
CREATE TABLE user_groups (
  user_id INT,
  group_id INT,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES `groups`(id) ON DELETE CASCADE
);

-- Insert 100 users
INSERT INTO users (name, email, status) VALUES 
('John Doe', 'john@example.com', 'active'),
('Jane Smith', 'jane@example.com', 'active'),
('Alice Johnson', 'alice@example.com', 'pending'),
('Bob Wilson', 'bob@example.com', 'blocked'),
('Charlie Brown', 'charlie@example.com', 'active'),
('Diana Prince', 'diana@example.com', 'active'),
('Edward Norton', 'edward@example.com', 'pending'),
('Fiona Green', 'fiona@example.com', 'active'),
('George Miller', 'george@example.com', 'blocked'),
('Helen Davis', 'helen@example.com', 'active'),
('Ian Thompson', 'ian@example.com', 'pending'),
('Julia Roberts', 'julia@example.com', 'active'),
('Kevin Hart', 'kevin@example.com', 'active'),
('Lisa Anderson', 'lisa@example.com', 'blocked'),
('Mike Johnson', 'mike@example.com', 'active'),
('Nancy Wilson', 'nancy@example.com', 'pending'),
('Oscar Martinez', 'oscar@example.com', 'active'),
('Paula Abdul', 'paula@example.com', 'active'),
('Quinn Taylor', 'quinn@example.com', 'blocked'),
('Rachel Green', 'rachel@example.com', 'active');

-- Insert remaining 80 users
INSERT INTO users (name, email, status) 
SELECT 
  CONCAT('User', n) as name,
  CONCAT('user', n, '@example.com') as email,
  CASE 
    WHEN n % 3 = 0 THEN 'pending'
    WHEN n % 5 = 0 THEN 'blocked' 
    ELSE 'active'
  END as status
FROM (
  SELECT 21 + (a.N + b.N * 10) as n
  FROM (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a
  CROSS JOIN (SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7) b
  WHERE 21 + (a.N + b.N * 10) <= 100
) numbers;

-- Insert 20 groups
INSERT INTO `groups` (name, status) VALUES 
('Admins', 'notEmpty'),
('Users', 'notEmpty'),
('Developers', 'notEmpty'),
('Designers', 'notEmpty'),
('Marketing', 'notEmpty'),
('Sales', 'notEmpty'),
('Support', 'notEmpty'),
('HR', 'notEmpty'),
('Finance', 'notEmpty'),
('Operations', 'notEmpty'),
('QA Team', 'notEmpty'),
('DevOps', 'notEmpty'),
('Product', 'notEmpty'),
('Research', 'notEmpty'),
('Analytics', 'notEmpty'),
('Security', 'notEmpty'),
('Legal', 'notEmpty'),
('Training', 'notEmpty'),
('Consultants', 'empty'),
('Interns', 'empty');

-- Insert user-group associations (first 90 users in groups 1-18)
INSERT INTO user_groups (user_id, group_id) 
SELECT 
  user_id,
  ((user_id - 1) % 18) + 1 as group_id
FROM (
  SELECT id as user_id FROM users WHERE id <= 90
) u;