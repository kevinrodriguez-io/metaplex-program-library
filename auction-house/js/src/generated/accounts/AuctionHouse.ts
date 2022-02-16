import * as web3 from '@solana/web3.js';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import * as beet from '@metaplex-foundation/beet';

/**
 * Arguments used to create {@link AuctionHouse}
 */
export type AuctionHouseArgs = {
  auctionHouseFeeAccount: web3.PublicKey;
  auctionHouseTreasury: web3.PublicKey;
  treasuryWithdrawalDestination: web3.PublicKey;
  feeWithdrawalDestination: web3.PublicKey;
  treasuryMint: web3.PublicKey;
  authority: web3.PublicKey;
  creator: web3.PublicKey;
  bump: number;
  treasuryBump: number;
  feePayerBump: number;
  sellerFeeBasisPoints: number;
  requiresSignOff: boolean;
  canChangeSalePrice: boolean;
};

const auctionHouseDiscriminator = [40, 108, 215, 107, 213, 85, 245, 48];
/**
 * Holds the data for the {@link AuctionHouse} Account and provides de/serialization
 * functionality for that data
 */
export class AuctionHouse implements AuctionHouseArgs {
  private constructor(
    readonly auctionHouseFeeAccount: web3.PublicKey,
    readonly auctionHouseTreasury: web3.PublicKey,
    readonly treasuryWithdrawalDestination: web3.PublicKey,
    readonly feeWithdrawalDestination: web3.PublicKey,
    readonly treasuryMint: web3.PublicKey,
    readonly authority: web3.PublicKey,
    readonly creator: web3.PublicKey,
    readonly bump: number,
    readonly treasuryBump: number,
    readonly feePayerBump: number,
    readonly sellerFeeBasisPoints: number,
    readonly requiresSignOff: boolean,
    readonly canChangeSalePrice: boolean,
  ) {}

  /**
   * Creates a {@link AuctionHouse} instance from the provided args.
   */
  static fromArgs(args: AuctionHouseArgs) {
    return new AuctionHouse(
      args.auctionHouseFeeAccount,
      args.auctionHouseTreasury,
      args.treasuryWithdrawalDestination,
      args.feeWithdrawalDestination,
      args.treasuryMint,
      args.authority,
      args.creator,
      args.bump,
      args.treasuryBump,
      args.feePayerBump,
      args.sellerFeeBasisPoints,
      args.requiresSignOff,
      args.canChangeSalePrice,
    );
  }

  /**
   * Deserializes the {@link AuctionHouse} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0,
  ): [AuctionHouse, number] {
    return AuctionHouse.deserialize(accountInfo.data, offset);
  }

  /**
   * Deserializes the {@link AuctionHouse} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [AuctionHouse, number] {
    return auctionHouseBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link AuctionHouse} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return auctionHouseBeet.serialize({
      accountDiscriminator: auctionHouseDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link AuctionHouse}
   */
  static get byteSize() {
    return auctionHouseBeet.byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link AuctionHouse} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment,
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(AuctionHouse.byteSize, commitment);
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link AuctionHouse} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === AuctionHouse.byteSize;
  }

  /**
   * Returns a readable version of {@link AuctionHouse} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      auctionHouseFeeAccount: this.auctionHouseFeeAccount.toBase58(),
      auctionHouseTreasury: this.auctionHouseTreasury.toBase58(),
      treasuryWithdrawalDestination: this.treasuryWithdrawalDestination.toBase58(),
      feeWithdrawalDestination: this.feeWithdrawalDestination.toBase58(),
      treasuryMint: this.treasuryMint.toBase58(),
      authority: this.authority.toBase58(),
      creator: this.creator.toBase58(),
      bump: this.bump,
      treasuryBump: this.treasuryBump,
      feePayerBump: this.feePayerBump,
      sellerFeeBasisPoints: this.sellerFeeBasisPoints,
      requiresSignOff: this.requiresSignOff,
      canChangeSalePrice: this.canChangeSalePrice,
    };
  }
}

export const auctionHouseBeet = new beet.BeetStruct<
  AuctionHouse,
  AuctionHouseArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['auctionHouseFeeAccount', beetSolana.publicKey],
    ['auctionHouseTreasury', beetSolana.publicKey],
    ['treasuryWithdrawalDestination', beetSolana.publicKey],
    ['feeWithdrawalDestination', beetSolana.publicKey],
    ['treasuryMint', beetSolana.publicKey],
    ['authority', beetSolana.publicKey],
    ['creator', beetSolana.publicKey],
    ['bump', beet.u8],
    ['treasuryBump', beet.u8],
    ['feePayerBump', beet.u8],
    ['sellerFeeBasisPoints', beet.u16],
    ['requiresSignOff', beet.bool],
    ['canChangeSalePrice', beet.bool],
  ],
  AuctionHouse.fromArgs,
  'AuctionHouse',
);
