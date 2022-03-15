
// Keys that have been added to an account can be revoked using revoke() function. 
// Revoke function only marks the key at the given index as revoked, but never deletes it.
transaction(keyIndex: Int) {
    prepare(signer: AuthAccount) {
        // Get a key from an auth account.
        let keyA = signer.keys.revoke(keyIndex: keyIndex)
    }
}
 