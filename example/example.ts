import Cryptorify from 'cryptorify';

const cryptorify = new Cryptorify('your-secure-secret-key', {
    algorithm: 'aes-256-gcm',
    encoding: 'base64',
    saltLength: 32,
    pbkdf2Iterations: 100000
});

interface UserData {
    id: number;
    username: string;
    email: string;
    metadata: {
        lastLogin: Date;
        isActive: boolean;
    };
}

const userData: UserData = {
    id: 12345,
    username: "johndoe",
    email: "john@example.com",
    metadata: {
        lastLogin: new Date(),
        isActive: true
    }
};

try {
    console.log('Original data:', userData);
    
    const encrypted = cryptorify.encrypt(JSON.stringify(userData));
    console.log('Encrypted data:', encrypted);
    
    const decrypted = cryptorify.decrypt(encrypted);
    console.log('Decrypted data:', JSON.parse(decrypted));
    
    const isMatch = JSON.stringify(userData) === JSON.stringify(JSON.parse(decrypted));
    console.log('Data match:', isMatch);

} catch (error) {
    console.error('Encryption/Decryption error:', error);
} 