import 'server-only';
import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.SECRET_KEY!);

export async function createJwtToken(payload: Record<string, any>, expiresAt = process.env.JWT_EXPIRES_IN) {
  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret);
};

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}