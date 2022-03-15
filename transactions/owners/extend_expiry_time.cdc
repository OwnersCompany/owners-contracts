import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Owners from "../../contracts/Owners.cdc"

/// This transaction extend the expiry time of an existing NFT 
/// by admin or operator has minter capability

transaction(owner: Address, itemID: UInt64) {
    // local variable for storing the minter reference
    let minter: &Owners.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&Owners.NFTMinter>(from: Owners.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // Extend the expiry time of NFT by 1 year
        self.minter.extendExpiryTime(owner, itemID: itemID)
    }
}
