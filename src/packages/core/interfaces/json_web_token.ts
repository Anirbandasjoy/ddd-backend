export interface JsonWebToken<T> {
  sign(payload: T): Promise<string>;
  verify(token: string): Promise<T>;
}
