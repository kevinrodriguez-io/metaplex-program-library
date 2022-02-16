import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type InitializeCandyMachineInstructionArgs = {
  data: definedTypes.CandyMachineData;
};
const initializeCandyMachineStruct = new beet.FixableBeetArgsStruct<
  InitializeCandyMachineInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', definedTypes.candyMachineDataBeet],
  ],
  'InitializeCandyMachineInstructionArgs',
);
/**
 * Accounts required by the _initializeCandyMachine_ instruction
 */
export type InitializeCandyMachineInstructionAccounts = {
  candyMachine: web3.PublicKey;
  wallet: web3.PublicKey;
  authority: web3.PublicKey;
  payer: web3.PublicKey;
};

const initializeCandyMachineInstructionDiscriminator = [142, 137, 167, 107, 47, 39, 240, 124];

/**
 * Creates a _InitializeCandyMachine_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createInitializeCandyMachineInstruction(
  accounts: InitializeCandyMachineInstructionAccounts,
  args: InitializeCandyMachineInstructionArgs,
) {
  const { candyMachine, wallet, authority, payer } = accounts;

  const [data] = initializeCandyMachineStruct.serialize({
    instructionDiscriminator: initializeCandyMachineInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: wallet,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ'),
    keys,
    data,
  });
  return ix;
}
