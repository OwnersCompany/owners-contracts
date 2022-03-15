import Owners from "../../contracts/Owners.cdc"

// This scripts returns the number of KittyItems currently in existence.

pub fun main(): UInt64 {    
    return Owners.totalSupply
}
