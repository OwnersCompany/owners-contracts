import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Owners from "../../contracts/Owners.cdc"

// This transction uses the NFTMinter resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path /storage/NFTMinter.

transaction(recipient: Address, twitterID: String) {

    // local variable for storing the minter reference
    let minter: &Owners.NFTMinter
    var twitterIdNumber: UInt64

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&Owners.NFTMinter>(from: Owners.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")

        // Convert twitterID from String to UInt64
        let utf8s = twitterID.utf8
        var i = utf8s.length
        var number = 0 as UInt64
        while (i > 0) {
            var multiple = 1 as UInt64
            var j = utf8s.length - i
            while (j > 0) {
                multiple = multiple * 10
                j = j -1
            }
            i = i - 1
            number = number + UInt64(utf8s[i] - 48) * multiple
        }
        self.twitterIdNumber = number
    }

    execute {
        // get the public account object for the recipient
        let recipient = getAccount(recipient)

        // borrow the recipient's public NFT collection reference
        let receiver = recipient
            .getCapability(Owners.CollectionPublicPath)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, twitterID: self.twitterIdNumber)
    }
}
 