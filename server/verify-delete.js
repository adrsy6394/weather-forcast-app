const axios = require('axios');

const API_URL = 'http://localhost:5000/api/v1/auth';

const runTest = async () => {
    const email = `verify_${Date.now()}@example.com`;
    const password = 'Password123!'; // Stronger password just in case

    try {
        console.log('--- Phase 1: Registration ---');
        const regRes = await axios.post(`${API_URL}/register`, {
            name: 'Verification User',
            email,
            password
        });
        const token = regRes.data.token;
        console.log('✅ Registered:', email);

        console.log('\n--- Phase 2: Profile Access ---');
        const profileRes = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Profile Accessed:', profileRes.data.email);

        console.log('\n--- Phase 3: Account Deletion ---');
        const deleteRes = await axios.delete(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Delete Response:', deleteRes.data.message);

        console.log('\n--- Phase 4: Post-Deletion Verification ---');
        try {
            await axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.error('❌ FAIL: Account still accessible after deletion');
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                console.log(`✅ SUCCESS: Account inaccessible (${error.response.status})`);
            } else {
                console.error('❌ UNEXPECTED ERROR STATUS:', error.response ? error.response.status : error.message);
            }
        }

    } catch (error) {
        if (error.response) {
            console.error('❌ TEST FAILED with response:', error.response.status, error.response.data);
        } else {
            console.error('❌ TEST FAILED:', error.message);
        }
    }
};

runTest();
