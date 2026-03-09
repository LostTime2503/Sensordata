CREATE DATABASE IF NOT EXISTS sensor_demo;
USE sensor_demo;

CREATE TABLE IF NOT EXISTS sensor_readings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_type VARCHAR(50),
    value FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO sensor_readings (sensor_type, value, created_at) VALUES
('temperature', 21.2, NOW() - INTERVAL 150 MINUTE),
('temperature', 21.4, NOW() - INTERVAL 140 MINUTE),
('temperature', 21.6, NOW() - INTERVAL 130 MINUTE),
('temperature', 21.7, NOW() - INTERVAL 120 MINUTE),
('temperature', 21.9, NOW() - INTERVAL 110 MINUTE),
('temperature', 22.0, NOW() - INTERVAL 100 MINUTE),
('temperature', 22.1, NOW() - INTERVAL 90 MINUTE),
('temperature', 22.3, NOW() - INTERVAL 80 MINUTE),
('temperature', 22.5, NOW() - INTERVAL 70 MINUTE),
('temperature', 22.7, NOW() - INTERVAL 60 MINUTE),
('temperature', 22.9, NOW() - INTERVAL 50 MINUTE),
('temperature', 23.0, NOW() - INTERVAL 40 MINUTE),
('temperature', 23.1, NOW() - INTERVAL 30 MINUTE),
('temperature', 23.3, NOW() - INTERVAL 20 MINUTE),
('temperature', 23.4, NOW() - INTERVAL 10 MINUTE);
