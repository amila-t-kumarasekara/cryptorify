import * as crypto from 'crypto';
import { 
    CryptorifyOptions, 
    SecureEncryptionAlgorithm, 
    GCMCipher, 
    GCMDecipher 
} from './types';

class Cryptorify {
    private readonly secret: string;
    private readonly algorithm: SecureEncryptionAlgorithm;
    private readonly encoding: BufferEncoding;
    private readonly saltLength: number;
    private readonly pbkdf2Iterations: number;
    private readonly ivLength: number;
    private readonly tagLength: number;
    private readonly tagPosition: number;
    private readonly encryptedPosition: number;

    constructor(secret: string, options: CryptorifyOptions = {}) {
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

    private getKey(salt: Buffer): Buffer {
        return crypto.pbkdf2Sync(this.secret, salt, this.pbkdf2Iterations, 32, 'sha512');
    }

    public encrypt(value: unknown): string {
        if (!value) {
            throw new Error('value must not be null or undefined');
        }

        const iv: Buffer = crypto.randomBytes(this.ivLength);
        const salt: Buffer = crypto.randomBytes(this.saltLength);
        const key: Buffer = this.getKey(salt);

        const cipher = crypto.createCipheriv(this.algorithm, key, iv) as GCMCipher;
        const encrypted: Buffer = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
        const tag: Buffer = cipher.getAuthTag();

        return Buffer.concat([salt, iv, tag, encrypted]).toString(this.encoding);
    }

    public decrypt(value: unknown): string {
        if (!value) {
            throw new Error('value must not be null or undefined');
        }

        const stringValue: Buffer = Buffer.from(JSON.stringify(value), this.encoding);

        const salt: Buffer = stringValue.subarray(0, this.saltLength);
        const iv: Buffer = stringValue.subarray(this.saltLength, this.tagPosition);
        const tag: Buffer = stringValue.subarray(this.tagPosition, this.encryptedPosition);
        const encrypted: Buffer = stringValue.subarray(this.encryptedPosition);

        const key: Buffer = this.getKey(salt);

        const decipher = crypto.createDecipheriv(this.algorithm, key, iv) as GCMDecipher;
        decipher.setAuthTag(tag);

        return JSON.parse(decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8'));
    }
}

export default Cryptorify; 