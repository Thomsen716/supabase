function checkPasswordsAndEmail(
  emailField: string,
  passwordField: string,
  confirmPasswordField: string
): boolean {
  if (passwordField !== confirmPasswordField) {
    return false;
  }

  if (passwordField.length < 6) {
    return false;
  }

  if (emailField.length === 0) {
    return false;
  }

  if (passwordField.length === 0) {
    return false;
  }

  if (confirmPasswordField.length === 0) {
    return false;
  }

  if (!emailField.includes("@")) {
    return false;
  }
  return true;
}

export default checkPasswordsAndEmail;
