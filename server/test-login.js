const fetch = require('node-fetch');

async function testLogin() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@basera.com',
        password: 'adminpassword'
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', data);
  } catch (err) {
    console.error('Fetch failed:', err.message);
    console.log('Ensure server is running on port 5000');
  }
}

testLogin();
