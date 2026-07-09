// GET instead of HEAD so the response body is actually transferred,
// making network throttling (e.g. DevTools 3G) produce realistic timings.
export async function GET() {
  // ~4KB payload — small enough to be cheap, large enough that 3G latency is noticeable
  const payload = JSON.stringify({ ok: true, t: Date.now(), pad: 'x'.repeat(4000) });

  return new Response(payload, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
