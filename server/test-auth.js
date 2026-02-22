const axios = require('axios');

const testAuth = async () => {
    const API_URL = 'http://localhost:5000/api/v1/auth';
    const uniqueEmail = `test_${Date.now()}@example.com`;

    try {
        console.log('1. Testing Register...');
        const registerRes = await axios.post(`${API_URL}/register`, {
            name: 'Test Setup',
            email: uniqueEmail,
            password: 'password123'
        });
        console.log('✅ Register Success:', registerRes.data.email);
        const token = registerRes.data.token;

        console.log('\n2. Testing Get Profile (Me)...');
        const meRes = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Get Me Success:', meRes.data.email);

        console.log('\n3. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/login`, {
            email: uniqueEmail,
            password: 'password123'
        });
        console.log('✅ Login Success:', loginRes.data.email);

        console.log('\n4. Testing Delete Account (Me)...');
        const deleteRes = await axios.delete(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Delete Me Success:', deleteRes.data.message);

        console.log('\n5. Verifying Account Deletion (Auth check should fail)...');
        try {
            await axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.error('❌ Error: Account still exists after deletion!');
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                console.log('✅ Verification Success: Account correctly unauthorized/not found after deletion.');
            } else {
                throw error;
            }
        }

    } catch (error) {
        console.error('❌ Error Details:', error.response ? { status: error.response.status, data: error.response.data } : error.message);
    }
};

testAuth();
