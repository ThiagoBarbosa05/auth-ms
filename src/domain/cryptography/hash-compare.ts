export interface HashCompare {
  compare(passwordRaw: string, passwordHashed: string): Promise<boolean>;
}
