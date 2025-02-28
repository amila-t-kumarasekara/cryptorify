import Cryptorify from './index';

describe('Cryptorify Tests', () => {
    const secretKey = 'testSecretKey';
    const cryptorify = new Cryptorify(secretKey, {
        algorithm: 'aes-256-gcm',
        encoding: 'base64',
        saltLength: 16,
        pbkdf2Iterations: 10000,
    });

    const testValue = 'TestValue';
    let encryptedValue: string;

    test('encrypt() should encrypt a value', () => {
        encryptedValue = cryptorify.encrypt(testValue);
        expect(typeof encryptedValue).toBe('string');
        expect(encryptedValue).not.toBe(testValue);
    });

    test('decrypt() should decrypt the value correctly', () => {
        const decryptedValue = cryptorify.decrypt(encryptedValue);
        expect(decryptedValue).toBe(testValue);
    });

    test('decrypt() should throw an error for invalid data', () => {
        const invalidData = 'invalidEncryptedValue';
        expect(() => cryptorify.decrypt(invalidData)).toThrow();
    });

    test('encrypt() should throw an error for null or undefined value', () => {
        expect(() => cryptorify.encrypt(null)).toThrow('value must not be null or undefined');
        expect(() => cryptorify.encrypt(undefined)).toThrow('value must not be null or undefined');
    });

    test('decrypt() should throw an error for null or undefined value', () => {
        expect(() => cryptorify.decrypt(null)).toThrow('value must not be null or undefined');
        expect(() => cryptorify.decrypt(undefined)).toThrow('value must not be null or undefined');
    });
});
