// The `opentimestamps` package ships no TypeScript types. This is a
// minimal shape covering only what src/app/api/notarize/route.ts uses.
declare module 'opentimestamps' {
  class OpSHA256 {}

  class DetachedTimestampFile {
    static fromHash(op: OpSHA256, hash: Buffer): DetachedTimestampFile;
    serializeToBytes(): Uint8Array;
  }

  const OpenTimestamps: {
    DetachedTimestampFile: typeof DetachedTimestampFile;
    Ops: { OpSHA256: typeof OpSHA256 };
    stamp: (detached: DetachedTimestampFile) => Promise<void>;
  };

  export default OpenTimestamps;
}
