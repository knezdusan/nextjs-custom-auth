// Generate password function that satisfies these criteria:
// Password must be at least 8 characters long.
// Password must be at most 20 characters long.
// Password must contain at least one uppercase letter.
// Password must contain at least one number.
// Password must contain at least one special character: @$!%*?&

export function generatePassword(length = 12) {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "@$!%*?&";

  const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

  let password = "";

  while (true) {
    password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    for (let i = 0; i < length - 3; i++) {
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    if (/[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) {
      break;
    }
  }

  return password;
}
