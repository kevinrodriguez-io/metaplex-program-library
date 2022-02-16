import * as beet from '@metaplex-foundation/beet';
export type ConfigLine = {
  name: string;
  uri: string;
};
export const configLineBeet = new beet.FixableBeetArgsStruct<ConfigLine>(
  [
    ['name', beet.utf8String],
    ['uri', beet.utf8String],
  ],
  'ConfigLine',
);
