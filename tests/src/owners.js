import {
  deployContractByName,
  executeScript, mintFlow, sendTransaction } from 'flow-js-testing';
import { getOwnersAdminAddress, getOwnersOperatorAddress } from './common';


/*
 * Deploys NonFungibleToken and TwitterNFT contracts to TwitterNftAdmin.
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
export const deployOwners = async () => {
  const OwnersAdmin = await getOwnersAdminAddress();
  await mintFlow(OwnersAdmin, '10.0');

  await deployContractByName({ to: OwnersAdmin, name: 'NonFungibleToken' });

  const addressMap = { NonFungibleToken: OwnersAdmin };
  return deployContractByName({
    to: OwnersAdmin,
    name: 'Owners',
    addressMap,
  });
};

/*
 * Setups Owners collection on account and exposes public capability.
 * @param {string} account - account address
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
export const setupOwnersOnAccount = async (account) => {
  const name = 'owners/setup_account';
  const signers = [account];

  return sendTransaction({ name, signers });
};

/*
 * Setups Owners operator resource and exposes public capability.
 * @param {string} account - account address
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
export const setupOwnersOperator = async (account) => {
  const name = 'owners/setup_operator';
  const signers = [account];

  return sendTransaction({ name, signers });
};

/*
 * Returns TwitterNFT supply.
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64} - number of NFT minted so far
 * */
export const getOwnersSupply = async () => {
  const name = 'owners/get_owners_supply';

  return executeScript({ name });
};

/*
 * set minter capability to operator by admin account .
 * @param {string} operator - operator account address
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const setOperatorCapability = async (operatorAddress) => {
  const operator = operatorAddress || await getOwnersOperatorAddress();
  const admin = await getOwnersAdminAddress();
  const name = 'owners/create_operator_capability';
  const args = [operator];
  const signers = [admin];

  return sendTransaction({ name, args, signers });
};

/*
 * revoke minter capability from operator by admin account .
 * @param {string} operator - operator account address
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const revokeMinterCapability = async () => {
  const admin = await getOwnersAdminAddress();

  const name = 'owners/revoke_minter_capability';
  const signers = [admin];

  return sendTransaction({ name, signers });
};

/*
 * revoke transfer capability from operator
 * @param {string} operator - operator account address
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const revokeTransferCapability = async () => {
  const admin = await getOwnersAdminAddress();

  const name = 'owners/revoke_transfer_capability';
  const signers = [admin];

  return sendTransaction({ name, signers });
};

/*
 * Mints Owners by twitterID and sends it to **recipient**.
 * @param {string} recipient - recipient account address
 * @param {UInt64} twitterId - account ID of twitter account to mint
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const mintOwners = async (recipient, twitterId) => {
  const admin = await getOwnersAdminAddress();

  const name = 'owners/mint_owners';
  const args = [recipient, twitterId];
  const signers = [admin];

  return sendTransaction({ name, args, signers });
};

/*
 * Mints Owners by operator and sends it to **recipient**.
 * @param {string} recipient - recipient account address
 * @param {UInt64} twitterId - account ID of twitter account to mint
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const mintOwnersByOperator = async (recipient, twitterId, operatorAddress) => {
  const operator = operatorAddress || await getOwnersOperatorAddress();

  const name = 'owners/operator_mint_owners';
  const args = [recipient, twitterId];
  const signers = [operator];

  return sendTransaction({ name, args, signers });
};

/*
 * Transfer Owners from Admin wallet by operator.
 * @param {string} recipient - recipient account address
 * @param {UInt64} withdrawId - withdraw ID of twitter account to transfer
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const transferOwnersByOperator = async (recipient, withdrawId, operatorAddress) => {
  const operator = operatorAddress || await getOwnersOperatorAddress();

  const name = 'owners/operator_transfer_owners';
  const args = [recipient, withdrawId];
  const signers = [operator];

  return sendTransaction({ name, args, signers });
};

/*
 * Transfers twitter NFT with id equal **itemId**
 * from **sender** account to **recipient**.
 * @param {string} sender - sender address
 * @param {string} recipient - recipient address
 * @param {UInt64} itemId - id of the item to transfer
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */
export const transferOwners = async (sender, recipient, itemId) => {
  const name = 'owners/transfer_owners';
  const args = [recipient, itemId];
  const signers = [sender];

  return sendTransaction({ name, args, signers });
};

/*
 * Returns the Owners NFT with the provided **id** from an account collection.
 * @param {string} account - account address
 * @param {UInt64} itemID - NFT id
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64}
 * */
export const getOwners = async (account, itemID) => {
  const name = 'owners/get_owners';
  const args = [account, itemID];

  return executeScript({ name, args });
};

/*
 * Returns the number of Kitty Items in an account's collection.
 * @param {string} account - account address
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64}
 * */
export const getOwnersCount = async (account) => {
  const name = 'owners/get_collection_length';
  const args = [account];

  return executeScript({ name, args });
};
