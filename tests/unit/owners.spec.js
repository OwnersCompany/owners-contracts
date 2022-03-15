/* eslint-disable max-len */
import path from 'path';
import {
  emulator, getAccountAddress,
  init, shallPass, shallResolve, shallRevert, shallThrow } from 'flow-js-testing';
import {
  deployOwners,
  getOwnersCount,
  getOwnersSupply,
  mintOwners,
  mintOwnersByOperator,
  revokeMinterCapability,
  revokeTransferCapability,
  setOperatorCapability,
  setupOwnersOnAccount,
  setupOwnersOperator,
  transferOwners,
  transferOwnersByOperator } from '../src/owners';
import { getOwnersAdminAddress, getOwnersOperatorAddress } from '../src/common';

// Increase timeout if your tests failing due to timeout
jest.setTimeout(10000);

describe('Owners contract', () => {
  beforeEach(async () => {
    const basePath = path.resolve(__dirname, '../../');
    // You can specify different port to parallelize execution of describe blocks
    const port = 7070;
    // Setting logging flag to true will pipe emulator output to console
    const logging = false;

    await init(basePath, { port });

    return emulator.start(port, logging);
  });

  // Stop emulator, so it could be restarted
  afterEach(async () => {
    return emulator.stop();
  });

  test('should deploy Owners contract', async () => {
    await deployOwners();
  });

  it('supply shall be 0 after contract is deployed', async () => {
    // Setup
    await deployOwners();
    const adminAddress = await getOwnersAdminAddress();
    await shallPass(setupOwnersOnAccount(adminAddress));

    await shallResolve(async () => {
      const supply = await getOwnersSupply();
      expect(supply[0]).toBe(0);
    });
  });

  it('shall be able to mint a twitterAccount NFT', async () => {
    // Setup
    await deployOwners();
    const Alice = await getAccountAddress('Alice');
    await setupOwnersOnAccount(Alice);

    // Mint instruction for Alice account shall be resolved
    await shallPass(mintOwners(Alice, 123456));
  });

  it('shall be able to create a new empty NFT Collection', async () => {
    // Setup
    await deployOwners();
    const Alice = await getAccountAddress('Alice');
    await setupOwnersOnAccount(Alice);

    // shall be able te read Alice collection and ensure it's empty
    await shallResolve(async () => {
      const itemCount = await getOwnersCount(Alice);
      expect(itemCount[0]).toBe(0);
    });
  });

  it('shall not be able to withdraw an NFT that doesn\'t exist in a collection', async () => {
    // Setup
    await deployOwners();
    const Alice = await getAccountAddress('Alice');
    const Bob = await getAccountAddress('Bob');
    await setupOwnersOnAccount(Alice);
    await setupOwnersOnAccount(Bob);

    // Transfer transaction shall fail for non-existent item
    await shallRevert(transferOwners(Alice, Bob, 1337));
  });

  it('shall be able to withdraw an NFT and deposit to another accounts collection', async () => {
    await deployOwners();
    const Alice = await getAccountAddress('Alice');
    const Bob = await getAccountAddress('Bob');
    await setupOwnersOnAccount(Alice);
    await setupOwnersOnAccount(Bob);

    // Mint instruction for Alice account shall be resolved
    await shallPass(mintOwners(Alice, 123456));

    // Transfer transaction shall pass
    await shallPass(transferOwners(Alice, Bob, 0));
  });

  it('shall be able to mint NFT by operator account', async () => {
    await deployOwners();
    const AdminAccount = await getOwnersAdminAddress();
    await setupOwnersOnAccount(AdminAccount);
    const Operator = await getOwnersOperatorAddress();
    await shallPass(setupOwnersOperator(Operator));
    await await shallPass(setOperatorCapability(Operator));

    await shallPass(mintOwnersByOperator(AdminAccount, 123456));
  });

  it('shall be able to transfer NFT from admin account by operator account', async () => {
    await deployOwners();
    const AdminAccount = await getOwnersAdminAddress();
    await setupOwnersOnAccount(AdminAccount);
    const Operator = await getOwnersOperatorAddress();
    await shallPass(setupOwnersOperator(Operator));
    await shallPass(setOperatorCapability(Operator));
    await shallPass(mintOwnersByOperator(AdminAccount, 123456));

    const Alice = await getAccountAddress('Alice');
    await setupOwnersOnAccount(Alice);
    await shallPass(transferOwnersByOperator(Alice, 0));
  });

  it('shall be able to revoke minter capability', async () => {
    await deployOwners();
    const AdminAccount = await getOwnersAdminAddress();
    await setupOwnersOnAccount(AdminAccount);
    const Operator = await getOwnersOperatorAddress();
    await shallPass(setupOwnersOperator(Operator));
    await shallPass(setOperatorCapability(Operator));
    await shallPass(revokeMinterCapability());

    const Alice = await getAccountAddress('Alice');
    await setupOwnersOnAccount(Alice);

    await shallThrow(mintOwnersByOperator(Alice, 123456));
  });

  it('shall be able to revoke transfer from admin capability', async () => {
    await deployOwners();
    const AdminAccount = await getOwnersAdminAddress();
    await setupOwnersOnAccount(AdminAccount);
    const Operator = await getOwnersOperatorAddress();
    await shallPass(setupOwnersOperator(Operator));
    await shallPass(setOperatorCapability(Operator));
    await shallPass(mintOwnersByOperator(AdminAccount, 123456));
    await shallPass(revokeTransferCapability());

    const Alice = await getAccountAddress('Alice');
    await setupOwnersOnAccount(Alice);
    await shallThrow(transferOwnersByOperator(Alice, 0));
  });
});
