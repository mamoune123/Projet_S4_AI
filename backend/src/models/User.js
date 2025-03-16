const pool = require("../config/database");

class User {
  static async createUser(username, email, password, role) {
    const query = `
      INSERT INTO users (username, email, password, role) 
      VALUES ($1, $2, $3, $4) RETURNING id, username, email, role;
    `;
    const values = [username, email, password, role];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
}

module.exports = User;
