

export class PinGeneratorService {
  static readonly PIN_LENGTH = 6;
  static generatePin(): string {
    const max = Math.pow(10, this.PIN_LENGTH) - 1;
    const min = Math.pow(10, this.PIN_LENGTH - 1);
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber.toString();
  }
}
