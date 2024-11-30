### `Cryptorify` - Secure Encryption and Decryption Utility

`Cryptorify` is a lightweight utility for securely encrypting and decrypting data using the AES-GCM algorithm. It ensures data integrity and confidentiality with robust encryption techniques.

---

### Features

- Uses **AES-256-GCM** for encryption, a secure and widely trusted algorithm.
- Supports customizable encryption options such as encoding type, salt length, and PBKDF2 iterations.
- Ensures integrity with GCM's authentication tag.
- Easy-to-use API for encryption and decryption.

---

### Installation

```bash
npm i cryptorify
```

---

### Usage

#### Importing the Cryptorify Class

```javascript
const Cryptorify = require('cryptorify');
```

#### Encrypting Data

```javascript
const cryptorify = new Cryptorify('mySecretKey');

const encrypted = cryptorify.encrypt('Hello, World!');
console.log('Encrypted:', encrypted);
```

#### Decrypting Data

```javascript
const decrypted = cryptorify.decrypt(encrypted);
console.log('Decrypted:', decrypted);
```

---

### Constructor

The `Cryptorify` constructor initializes the class with a secret and optional configuration.

```javascript
const cryptorify = new Cryptorify(secret, options);
```

#### Parameters:

- `secret` *(string, required)*: A non-empty string used as the encryption key.
- `options` *(object, optional)*:
  - `algorithm` *(string)*: The encryption algorithm. Default: `aes-256-gcm`.
  - `encoding` *(string)*: The encoding for encrypted output. Default: `hex`.
  - `saltLength` *(number)*: The length of the salt (in bytes). Default: `64`.
  - `pbkdf2Iterations` *(number)*: The number of iterations for PBKDF2 key derivation. Default: `100,000`.

---

### Methods

#### `encrypt(value)`

Encrypts the given value.

- **Parameters**:
  - `value` *(string | number | Buffer, required)*: The value to encrypt.

- **Returns**:
  - `string`: The encrypted data encoded in the specified encoding format.

- **Example**:
  ```javascript
  const encrypted = cryptorify.encrypt('Sensitive Data');
  console.log('Encrypted:', encrypted);
  ```

---

#### `decrypt(value)`

Decrypts the given encrypted value.

- **Parameters**:
  - `value` *(string, required)*: The encrypted data to decrypt.

- **Returns**:
  - `string`: The original value after decryption.

- **Example**:
  ```javascript
  const decrypted = cryptorify.decrypt(encrypted);
  console.log('Decrypted:', decrypted);
  ```

---

### Example Code

```javascript
const Cryptorify = require('Cryptorify');

// Initialize Cryptorify with a secret key
const cryptorify = new Cryptorify('mySuperSecretKey', {
    algorithm: 'aes-256-gcm',
    encoding: 'hex',
    saltLength: 64,
    pbkdf2Iterations: 100000
});

// Encrypt a message
const encrypted = cryptorify.encrypt('Hello, Encryption!');
console.log('Encrypted:', encrypted);

// Decrypt the message
const decrypted = cryptorify.decrypt(encrypted);
console.log('Decrypted:', decrypted);
```

---

### Error Handling

#### Encryption Errors
- Throws an error if the value to encrypt is `null` or `undefined`.

#### Decryption Errors
- Throws an error if the value to decrypt is `null`, `undefined`, or invalid.

#### Initialization Errors
- Throws an error if the `secret` is not a non-empty string.
- Throws an error if the algorithm is not supported or doesn't include `GCM`.

---

### Security Considerations

- **Key Management**: Use a strong, unique secret key for each application.
- **Algorithm**: This utility supports only AES algorithms in GCM mode for added integrity checks.
- **PBKDF2**: The number of iterations (default: 100,000) can be increased for additional security.

---

### License

`Cryptorify` is released under the [MIT License](https://opensource.org/licenses/MIT).