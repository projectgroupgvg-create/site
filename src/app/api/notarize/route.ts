import { NextResponse } from 'next/server';
import OpenTimestamps from 'opentimestamps';

// Anchors a SHA-256 digest (computed client-side — the file itself is
// never uploaded) into the Bitcoin blockchain via the free, public
// OpenTimestamps calendar servers. Returns a standard .ots proof file
// that can be verified independently, forever, at opentimestamps.org or
// with the official `ots` CLI — this isn't a proprietary or in-house
// "blockchain" claim, it's the real, open protocol.
export const runtime = 'nodejs';
export const maxDuration = 30;

function isHex64(s: string) {
  return /^[a-f0-9]{64}$/i.test(s);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const hashHex = body?.hashHex;

    if (typeof hashHex !== 'string' || !isHex64(hashHex)) {
      return NextResponse.json({ error: 'invalid_hash' }, { status: 400 });
    }

    const { DetachedTimestampFile, Ops } = OpenTimestamps;
    const hashBuffer = Buffer.from(hashHex, 'hex');
    const detached = DetachedTimestampFile.fromHash(new Ops.OpSHA256(), hashBuffer);

    await OpenTimestamps.stamp(detached);

    const otsBytes = detached.serializeToBytes();
    const base64 = Buffer.from(otsBytes).toString('base64');

    return NextResponse.json({ ots: base64 });
  } catch (err) {
    console.error('notarize error', err);
    return NextResponse.json({ error: 'stamp_failed' }, { status: 502 });
  }
}
