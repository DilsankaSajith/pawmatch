import { NextRequest, NextResponse } from 'next/server';
import { getUserFromApiKey, unauthorizedResponse } from './api-key';

type Handler = (
  req: NextRequest,
  ctx: { user: { id: string; email: string; role: string } },
) => Promise<NextResponse>;

export function withApiKeyAuth(handler: Handler) {
  return async (req: NextRequest) => {
    const user = await getUserFromApiKey(req);
    if (!user) return unauthorizedResponse();
    return handler(req, { user });
  };
}
