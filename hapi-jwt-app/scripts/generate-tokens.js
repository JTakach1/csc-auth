require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error('JWT_SECRET is not set in .env');
  process.exit(1);
}

const tokens = {
  userOnly: jwt.sign(
    { name: 'Alice', roles: ['user'] },
    secret,
    { algorithm: 'HS256', expiresIn: '20m' }
  ),
  adminOnly: jwt.sign(
    { name: 'Bob', roles: ['admin'] },
    secret,
    { algorithm: 'HS256', expiresIn: '20m' }
  ),
  userAndAdmin: jwt.sign(
    { name: 'Carol', roles: ['user', 'admin'] },
    secret,
    { algorithm: 'HS256', expiresIn: '20m' }
  )
};

console.log('\n--- Generated Tokens (valid 20 min) ---\n');
Object.entries(tokens).forEach(([label, token]) => {
  console.log(`${label}:\n${token}\n`);
});