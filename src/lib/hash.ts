import crypto from 'crypto';

// Encrypt the data string + secret key
export function encryptDataString(dataString: string, secretKey = process.env.SECRET_KEY) {
  if (typeof secretKey !== 'string') {
    throw new Error('Secret key is missing or invalid');
  }
  const algorithm = 'aes-256-cbc'; // AES encryption algorithm
  const iv = crypto.randomBytes(16); // Initialization vector
  const key = crypto.scryptSync(secretKey, 'salt', 32); // Derive key from secretKey

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(dataString, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`; // Include IV with the encrypted data
}

// Decrypt the data string + secret key
export function decryptDataString(hash: string, secretKey = process.env.SECRET_KEY) {
  if (typeof secretKey !== 'string') {
    throw new Error('Secret key is missing or invalid');
  }
  const algorithm = 'aes-256-cbc';
  const [ivHex, encrypted] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.scryptSync(secretKey, 'salt', 32); // Derive key from secretKey

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted; // This will be the original data string
}