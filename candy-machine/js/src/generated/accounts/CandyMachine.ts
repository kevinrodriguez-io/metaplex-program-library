import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as definedTypes from '../types';
import * as beetSolana from '@metaplex-foundation/beet-solana';

/**
 * Arguments used to create {@link CandyMachine}
 */
export type CandyMachineArgs = {
  authority: web3.PublicKey;
  wallet: web3.PublicKey;
  tokenMint: beet.COption<web3.PublicKey>;
  itemsRedeemed: beet.bignum;
  data: definedTypes.CandyMachineData;
};

const candyMachineDiscriminator = [51, 173, 177, 113, 25, 241, 109, 189];
/**
 * Holds the data for the {@link CandyMachine} Account and provides de/serialization
 * functionality for that data
 */
export class CandyMachine implements CandyMachineArgs {
  private constructor(
    readonly authority: web3.PublicKey,
    readonly wallet: web3.PublicKey,
    readonly tokenMint: beet.COption<web3.PublicKey>,
    readonly itemsRedeemed: beet.bignum,
    readonly data: definedTypes.CandyMachineData,
  ) {}

  /**
   * Creates a {@link CandyMachine} instance from the provided args.
   */
  static fromArgs(args: CandyMachineArgs) {
    return new CandyMachine(
      args.authority,
      args.wallet,
      args.tokenMint,
      args.itemsRedeemed,
      args.data,
    );
  }

  /**
   * Deserializes the {@link CandyMachine} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [CandyMachine, number] {
    return CandyMachine.deserialize(accountInfo.data, offset);
  }

  /**
   * Deserializes the {@link CandyMachine} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [CandyMachine, number] {
    return candyMachineBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link CandyMachine} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return candyMachineBeet.serialize({
      accountDiscriminator: candyMachineDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link CandyMachine} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: CandyMachineArgs) {
    const instance = CandyMachine.fromArgs(args);
    return candyMachineBeet.toFixedFromValue({
      accountDiscriminator: candyMachineDiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link CandyMachine} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: CandyMachineArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(CandyMachine.byteSize(args), commitment);
  }

  /**
   * Returns a readable version of {@link CandyMachine} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      authority: this.authority.toBase58(),
      wallet: this.wallet.toBase58(),
      tokenMint: this.tokenMint,
      itemsRedeemed: this.itemsRedeemed,
      data: this.data,
    };
  }
}

export const candyMachineBeet = new beet.FixableBeetStruct<
  CandyMachine,
  CandyMachineArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['authority', beetSolana.publicKey],
    ['wallet', beetSolana.publicKey],
    ['tokenMint', beet.coption(beetSolana.publicKey)],
    ['itemsRedeemed', beet.u64],
    ['data', definedTypes.candyMachineDataBeet],
  ],
  CandyMachine.fromArgs,
  'CandyMachine',
);
