import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const hexRegex = /^[a-fA-F0-9]{64}$/;

    // Replace all values that not match with hexadecimal pattern.
    privateKey = (evt.target.value).replace(/[^a-fA-F0-9]/g, "");
    setPrivateKey(privateKey);

    // Check if privateKey is 32 bytes (64 characters) long and is hexadecimal.
    if (hexRegex.test(privateKey)) {
      const publicKey = secp.getPublicKey(privateKey);
      const keccakPublicKey = keccak256(publicKey.slice(1)).slice(-20);
      address = toHex(keccakPublicKey);
      setAddress(address);
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type in a private key" maxLength={64} value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
