const dummyUserDB = [
  {
    name: "Dummy admin",
    email: "admin@societyportal.com",
    password: "Society@admin",
    role: "admin",
  },
];

// Login function with validation
export const login = async ({ email, password }) => {
  const foundUser = dummyUserDB.find(
    (user) => user.email === email && user.password === password
  );

  if (!foundUser) {
    throw new Error("Invalid email or password");
  }

  // Return user without password
  const { password: _, ...userData } = foundUser;
  return userData;
};

// Signup function 
export const signup = async ({ name, email, password }) => {
  // 
  return { name, email, password, role: "admin" };
};