const http = require('http');

// Helper to make requests
const request = (method, path, data = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body) }));
        });

        req.on('error', reject);
        if (Object.keys(data).length > 0) req.write(JSON.stringify(data));
        req.end();
    });
};

const run = async () => {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';

    console.log(`Creating user: ${email}...`);
    // Signup
    await request('POST', '/auth/signup', {
        name: 'Test User',
        email,
        password
    });
    console.log('User created.');

    console.log('Logging in...');
    // Login
    const loginRes = await request('POST', '/auth/login', {
        email,
        password
    });

    const token = loginRes.body.jwtToken;
    console.log('Token received:', !!token);

    if (!token) {
        console.error('Login failed:', loginRes.body);
        return;
    }

    console.log('Getting products...');
    // Get Products
    const productsRes = await request('GET', '/products', {}, {
        'Authorization': token
    });

    console.log('Response Status:', productsRes.statusCode);
    console.log('Products:', productsRes.body);
};

run().catch(console.error);
