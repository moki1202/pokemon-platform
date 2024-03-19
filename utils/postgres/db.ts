// db.ts

import { Pool } from 'pg'

// Database connection configuration
const dbConfig = {
  user: 'moki1202',
  password: 'shashank@2001',
  database: 'pokemon_users',
  host: 'localhost',
  port: 5432, // Default PostgreSQL port
}

// Create a new database pool
const pool = new Pool(dbConfig)

export default pool
