export class CustomerAlreadyExistsError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
