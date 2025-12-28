// Sanitize input (remove extra spaces, dangerous chars)
export const sanitizeInput = (value) => {
  return value.replace(/[<>]/g, "").trim();
};

//  Validate full name
export const validateFullName = (name) => {
  if (!name) return "Full name is required.";
  if (!/^[A-Za-z\s]+$/.test(name))
    return "Name can only contain alphabets and spaces.";
  if (name.length < 3)
    return "Full name must be at least 3 characters long.";
  return "";
};

//  Validate email format
export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Please enter a valid email address.";
  return "";
};

// ✅ Validate password strength
export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 8)
    return "Password must be at least 8 characters long.";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";
  if (!/[@$!%*?&]/.test(password))
    return "Password must contain at least one special character (@, $, !, %, *, ?, &).";
  return "";
};

// ✅ Confirm password check
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
};
