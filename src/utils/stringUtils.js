export function generateRandomString() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet.charAt(randomIndex);
  }

  return randomString;
}
