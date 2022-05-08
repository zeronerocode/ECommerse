CREATE TYPE roles_table AS ENUM (
    'costumer',
    'seller',
    'admin'
);

CREATE TYPE status_table AS ENUM (
    'pending',
    'paid',
    'completed'
);
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE ,
    password VARCHAR(128),
    roles VARCHAR(10) DEFAULT 'costumer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE products(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(128) NULL,
    stock INT DEFAULT 0,
    price INT DEFAULT 0,
    id_category INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE category(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(64) NOT NULL
);

CREATE TABLE transaction(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_user INT,
    id_products INT,
    status VARCHAR(10) DEFAULT 'customer'
);

INSERT INTO category(name)VALUES('high heels'),('wristwatch'),('handbag'),('bagback'),('socks'),('glasses'),('cap'),('tie'),('dress'),('formalsuit'),('accessories');