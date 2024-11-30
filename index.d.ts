declare module "shieldcrypt" {
    interface CryptorifyOptions {
        /**
         * Algorithm for encryption (e.g., 'aes-256-gcm').
         * Default: 'aes-256-gcm'.
         */
        algorithm?: string;

        /**
         * Encoding format for output (e.g., 'hex', 'base64').
         * Default: 'hex'.
         */
        encoding?: BufferEncoding;

        /**
         * Length of the salt in bytes.
         * Default: 64.
         */
        saltLength?: number;

        /**
         * Number of iterations for PBKDF2.
         * Default: 100,000.
         */
        pbkdf2Iterations?: number;
    }

    class Cryptorify {
        /**
         * Creates a new instance of Cryptorify.
         * @param secret - The secret key for encryption and decryption.
         * @param options - Optional configuration for the Cryptorify instance.
         */
        constructor(secret: string, options?: CryptorifyOptions);

        /**
         * Encrypts a value.
         * @param value - The value to be encrypted (string or number).
         * @returns The encrypted value as a string.
         * @throws Error if the value is null or undefined.
         */
        encrypt(value: string | number): string;

        /**
         * Decrypts a value.
         * @param value - The encrypted value to be decrypted.
         * @returns The decrypted value as a string.
         * @throws Error if the value is null or undefined.
         */
        decrypt(value: string): string;
    }

    export = Cryptorify;
}
