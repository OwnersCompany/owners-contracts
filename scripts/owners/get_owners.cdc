import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import Owners from "../../contracts/Owners.cdc"

pub struct AccountItem {
  pub let itemID: UInt64
  pub let twitterID: UInt64
  pub let owner: Address
  pub let expiryTime: UFix64

  init(itemID: UInt64, twitterID: UInt64, owner: Address, expiryTime: UFix64) {
    self.itemID = itemID
    self.twitterID = twitterID
    self.owner = owner
    self.expiryTime = expiryTime
  }
}

pub fun main(address: Address, itemID: UInt64): AccountItem? {
  if let collection = getAccount(address).getCapability<&Owners.Collection{NonFungibleToken.CollectionPublic, Owners.OwnersCollectionPublic}>(Owners.CollectionPublicPath).borrow() {
    if let item = collection.borrowOwners(id: itemID) {
      return AccountItem(itemID: itemID, twitterID: item.twitterID, owner: address, expiryTime: item.expiryTime)
    }
  }

  return nil
}