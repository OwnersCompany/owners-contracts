import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Owners from "../../contracts/Owners.cdc"

// This transaction configures an account to hold Owners NFT.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&Owners.Collection>(from: Owners.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- Owners.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: Owners.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&Owners.Collection{NonFungibleToken.CollectionPublic, Owners.OwnersCollectionPublic}>(Owners.CollectionPublicPath, target: Owners.CollectionStoragePath)
        }
    }
}