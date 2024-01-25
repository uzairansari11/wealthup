const { model } = require("mongoose");

// Helper function to check if a code is expired
function isCodeExpired(existingCode) {
  const expirationTime = 60 * 1000; // 60 seconds
  const currentTime = new Date();
  return (
    existingCode.createdAt.getTime() + expirationTime < currentTime.getTime()
  );
}

// Helper function to generate a random code
function generateCode() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";

  // Add two random alphabets
  code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

  // Add two random numbers
  code += numbers.charAt(Math.floor(Math.random() * numbers.length));

  // Add two more characters (alphabets or numbers)
  for (let i = 0; i < 3; i++) {
    const randomChoice = Math.random() < 0.5 ? alphabet : numbers;
    code += randomChoice.charAt(
      Math.floor(Math.random() * randomChoice.length)
    );
  }

  return code;
}

module.exports = { generateCode, isCodeExpired };
