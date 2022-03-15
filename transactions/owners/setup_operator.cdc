import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Owners from "../../contracts/Owners.cdc"

transaction {
    prepare(operator: AuthAccount) {

        let nftOperator <- Owners.createNFTOperator()

        operator.save(
            <-nftOperator,
            to: Owners.OperatorStoragePath,
        )
            
        // create new receiver that marks received tokens as unlocked
        operator.link<&Owners.NFTOperator{Owners.NFTOperatorPublic}>(
            Owners.OperatorPublicPath,
            target: Owners.OperatorStoragePath
        )
    }
}