const crypto = require('crypto');

class Cryptorify {
    constructor(secret, options = {}) {
        if (!secret || typeof secret !== 'string') {
            throw new Error('Cryptorify: secret must be a non-0-length string');
        }

        this.secret = secret;
        this.algorithm = options.algorithm || 'aes-256-gcm';
        this.encoding = options.encoding || 'hex';
        this.saltLength = options.saltLength || 64;
        this.pbkdf2Iterations = options.pbkdf2Iterations || 100000;

        if (!this.algorithm.includes('gcm')) {
            throw new Error('Cryptorify: Only algorithms with GCM mode are supported');
        }

        this.ivLength = 16;
        this.tagLength = 16;
        
        this.tagPosition = this.saltLength + this.ivLength;
        this.encryptedPosition = this.tagPosition + this.tagLength;
    }

    getKey(salt) {
        return crypto.pbkdf2Sync(this.secret, salt, this.pbkdf2Iterations, 32, 'sha512');
    }

    encrypt(value) {
        if (value == null) {
            throw new Error('value must not be null or undefined');
        }

        const iv = crypto.randomBytes(this.ivLength);
        const salt = crypto.randomBytes(this.saltLength);
        const key = this.getKey(salt);

        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();

        return Buffer.concat([salt, iv, tag, encrypted]).toString(this.encoding);
    }

    decrypt(value) {
        if (value == null) {
            throw new Error('value must not be null or undefined');
        }

        const stringValue = Buffer.from(String(value), this.encoding);

        const salt = stringValue.subarray(0, this.saltLength);
        const iv = stringValue.subarray(this.saltLength, this.tagPosition);
        const tag = stringValue.subarray(this.tagPosition, this.encryptedPosition);
        const encrypted = stringValue.subarray(this.encryptedPosition);

        const key = this.getKey(salt);

        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        decipher.setAuthTag(tag);

        return decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8');
    }
}

module.exports = Cryptorify;
