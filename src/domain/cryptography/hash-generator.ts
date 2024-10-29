export interface HashGenerator {
  generateHash(password: string): Promise<string>;
}
