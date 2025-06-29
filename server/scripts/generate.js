const secp = require("ethereum-cryptography/secp256k1");   // Ethereum Cryptography v1.2.0 (secp256k1)
const { toHex } = require("ethereum-cryptography/utils");   // Ethereum Cryptography v1.2.0 (utils)
const { keccak256 } = require("ethereum-cryptography/keccak");   // Ethereum Cryptography v1.2.0 (keccak)
const privateKey = secp.utils.randomPrivateKey();   // Generate a random private key.
const publicKey = secp.getPublicKey(privateKey);   // Get a public key of a private key.
const keccakPublicKey = keccak256(publicKey.slice(1)).slice(-20);   // Get a public key "Ethereum-like". 

console.log("Private key:", toHex(privateKey));   // Convert the private key into hex and show it in the console.
console.log("Public key:", toHex(keccakPublicKey));   // Convert the public key into hex and show it in the console.