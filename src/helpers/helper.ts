const bcrypt = require("bcrypt");

export async function hashPassword(password) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
