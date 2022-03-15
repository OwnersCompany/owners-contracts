import NonFungibleToken from "../../contracts/NonFungibleToken.cdc" 
import Owners from "../../contracts/Owners.cdc"

/// token admin signs this transaction to deposit a capability
/// into a operator's account that allows them to mint nft
/// and entend the expiry time of an existing NFT

transaction(operatorAddress: Address) {

    prepare(admin: AuthAccount) {

        let operator = getAccount(operatorAddress)
        // Private Path to link minter capacitiy for operator
        // If you need to revoke minter capability from old operator, 
        // unlink issued paths and manually hard-code this path and submit the new transaction 
        // The old paths should be added to a blacklist and must not be reused forever
        let minterPrivatePath = /private/OwnersMinterV1
        let transferPrivatePath = /private/OwnersTransferV1
            
        let capabilityReceiver = operator.getCapability
            <&Owners.NFTOperator{Owners.NFTOperatorPublic}>
            (Owners.OperatorPublicPath)
            .borrow() ?? panic("Could not borrow capability receiver reference")

        admin.link<&Owners.NFTMinter>(minterPrivatePath, target: Owners.MinterStoragePath)
        admin.link<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(transferPrivatePath, target: Owners.CollectionStoragePath)

        let nftMinterCapability = admin
            .getCapability<&Owners.NFTMinter>(minterPrivatePath)

        let nftTransferCapability = admin
            .getCapability<&{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(transferPrivatePath)

        capabilityReceiver.addMinterCapability(cap: nftMinterCapability)
        capabilityReceiver.addTransferCapability(cap: nftTransferCapability)
    }
}
