// This transaction add public key to an existing flow account
// You must generate a new key pair using flow-cli first
// and then pass the generated key as the argument to flow-cli transaction builder
// The detail instruction about building and signing transaction was writted in README.md in this directory
// Find out more about weight, see https://docs.onflow.org/concepts/accounts-and-keys/#weighted-keys
transaction(publicKey: [UInt8], weight: UFix64) {
    prepare(signer: AuthAccount) {
        let key = PublicKey(
            publicKey: publicKey,
            signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
        )

        signer.keys.add(
            publicKey: key,
            hashAlgorithm: HashAlgorithm.SHA3_256,
            weight: weight
        )
    }
}