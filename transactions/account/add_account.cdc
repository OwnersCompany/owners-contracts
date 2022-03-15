// This transaction add new account to flow network
// You must generate a new key pair using flow-cli first
// and then pass the generated key as the argument to flow-cli transaction builder
// The detail instruction about building and signing transaction was writted in README.md in this directory
// Find out more about weight, see https://docs.onflow.org/concepts/accounts-and-keys/#weighted-keys
transaction(publicKey1: [UInt8], weight1: UFix64, publicKey2: [UInt8], weight2: UFix64, publicKey3: [UInt8], weight3: UFix64) {
    prepare(signer: AuthAccount) {
        let account = AuthAccount(payer: signer)

        let key1 = PublicKey(
            publicKey: publicKey1,
            signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
        )

        account.keys.add(
            publicKey: key1,
            hashAlgorithm: HashAlgorithm.SHA3_256,
            weight: weight1
        )

        let key2 = PublicKey(
            publicKey: publicKey2,
            signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
        )

        account.keys.add(
            publicKey: key2,
            hashAlgorithm: HashAlgorithm.SHA3_256,
            weight: weight2
        )

        let key3 = PublicKey(
            publicKey: publicKey3,
            signatureAlgorithm: SignatureAlgorithm.ECDSA_P256
        )

        account.keys.add(
            publicKey: key3,
            hashAlgorithm: HashAlgorithm.SHA3_256,
            weight: weight3
        )
    }
}