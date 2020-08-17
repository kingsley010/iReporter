export const userTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    othernames VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(50) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    registered date NOT NULL DEFAULT CURRENT_DATE,
    isadmin boolean  NOT NULL DEFAULT 'false'
  );

  `;

export const recordTable = `
  CREATE TABLE IF NOT EXISTS records (
    id SERIAL PRIMARY KEY,
    createdon date NOT NULL DEFAULT CURRENT_DATE,
    createdby int NOT NULL,
    type VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    images text[][] NOT NULL,
    videos text[][] NOT NULL,
    comment VARCHAR(2000) NOT NULL
  );

  `;
