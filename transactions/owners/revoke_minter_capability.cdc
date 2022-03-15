import NonFungibleToken from "../../contracts/NonFungibleToken.cdc" 
import Owners from "../../contracts/Owners.cdc"

/// The admin signs this transaction to revoke capability which was transfered to operator account

transaction() {

    prepare(admin: AuthAccount) {
        let minterPrivatePath = /private/OwnersMinterV1

        admin.unlink(minterPrivatePath)
    }

}