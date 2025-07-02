const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

// La única fuente de verdad es tu clave privada
const PRIVATE_KEY = "990efb41f39d7752e1f3bde92f2c993edf586476a25cf10b3e6302f10344cd17";

// Derivamos la clave pública a partir de la privada para asegurar que coincidan
const PUBLIC_KEY = secp.getPublicKey(PRIVATE_KEY);
const PUBLIC_KEY_ETH = keccak256(PUBLIC_KEY.slice(1)).slice(-20);

const message = "Hello world!";
const hashedMessage = keccak256(utf8ToBytes(message));

// Usamos una función anónima async para poder usar await
(async () => {
    // 1. Llama directamente a secp.sign y usa await
    const [signature, recoveryBit] = await secp.sign(hashedMessage, PRIVATE_KEY, { recovered: true });

    // 2. Recupera la clave pública usando la firma y el recovery bit
    const recoveredKey = secp.recoverPublicKey(hashedMessage, signature, recoveryBit);
    const recoveredKeyEth = keccak256(recoveredKey.slice(1)).slice(-20);

    console.log("Clave Pública Original (derivada):", toHex(PUBLIC_KEY));
    console.log("Clave Pública Recuperada:", toHex(recoveredKey));
    console.log("Clave Pública Original ETH:", toHex(PUBLIC_KEY_ETH));
    console.log("Clave Pública Recuperada ETH:", toHex(recoveredKeyEth));
})();