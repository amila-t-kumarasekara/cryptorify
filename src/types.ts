import * as crypto from 'crypto';

export interface CryptorifyOptions {
    algorithm?: SecureEncryptionAlgorithm;
    encoding?: BufferEncoding;
    saltLength?: number;
    pbkdf2Iterations?: number;
}

export type SecureEncryptionAlgorithm = 
  | 'aes-256-gcm'
  | 'aes-192-gcm'

export interface GCMCipher extends crypto.Cipher {
    getAuthTag(): Buffer;
}

export interface GCMDecipher extends crypto.Decipher {
    setAuthTag(tag: Buffer): void;
} 