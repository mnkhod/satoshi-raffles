const {
  Signer,
  SignerAsync,
  ECPairInterface,
  ECPairFactory,
  ECPairAPI,
  TinySecp256k1Interface,
} = require("ecpair");
const crypto = require("crypto");

const tinysecp = require("tiny-secp256k1");
const ECPair = ECPairFactory(tinysecp);

function main() {
  const keyPair1 = ECPair.fromWIF(
    "KynD8ZKdViVo5W82oyxvE18BbG6nZPVQ8Td8hYbwU94RmyUALUik"
  );
  const keyPair2 = ECPair.fromPrivateKey(crypto.randomBytes(32));
  console.log(keyPair2.privateKey.toString("hex"));
  const keyPair3 = ECPair.makeRandom();
  console.log(keyPair3.privateKey.toString("hex"));
  const customRandomBufferFunc = () => {
    return crypto.randomBytes(32);
  };
  const keyPair4 = ECPair.makeRandom({ rng: customRandomBufferFunc });
  console.log(keyPair4.privateKey.toString("hex"));
  // From pubkey (33 or 65 byte DER format public key)
  const keyPair5 = ECPair.fromPublicKey(keyPair1.publicKey);
  console.log(keyPair5.publicKey.toString("hex"));
}

main();
