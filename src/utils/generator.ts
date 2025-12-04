export class Generator {
  static generateRandomPhoneNumber(length = 10): string {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static generateRandomDateString(start = 1970, end = 2020): string {
    const year = Math.floor(Math.random() * (end - start + 1)) + start;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  static generateRandomDateStringWithLimit(minAge: number = 18): string {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear - minAge;
    return this.generateRandomDateString(1970, endYear);
  }
}
