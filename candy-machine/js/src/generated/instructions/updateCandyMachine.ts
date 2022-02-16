import * as definedTypes from '../types';
import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

export type UpdateCandyMachineInstructionArgs = {
  data: definedTypes.CandyMachineData;
};
const updateCandyMachineStruct = new beet.FixableBeetArgsStruct<
  UpdateCandyMachineInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['data', definedTypes.candyMachineDataBeet],
  ],
  'UpdateCandyMachineInstructionArgs',
);
/**
 * Accounts required by the _updateCandyMachine_ instruction
 */
export type UpdateCandyMachineInstructionAccounts = {
  candyMachine: web3.PublicKey;
  authority: web3.PublicKey;
  wallet: web3.PublicKey;
};

const updateCandyMachineInstructionDiscriminator = [243, 251, 124, 156, 211, 211, 118, 239];

/**
 * Creates a _UpdateCandyMachine_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createUpdateCandyMachineInstruction(
  accounts: UpdateCandyMachineInstructionAccounts,
  args: UpdateCandyMachineInstructionArgs,
) {
  const { candyMachine, authority, wallet } = accounts;

  const [data] = updateCandyMachineStruct.serialize({
    instructionDiscriminator: updateCandyMachineInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: wallet,
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
