import jwt, { SignOptions } from 'jsonwebtoken';

export class JsonWebToken<T extends object> {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string = 'secret', expiresIn: string = '1h') {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  async sign(payload: T): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    } as SignOptions);
  }

  async verify(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as T;
  }
}
