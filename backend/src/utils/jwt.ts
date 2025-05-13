import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'c8c66f811db274a348af59f846f00e750be832734845380e7a03b2abc7136ae9';

export interface JwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

export const generateToken = (user: { id: string; email: string; isAdmin: boolean }) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};