import { User } from "../../../models/user.model";

// Helper function to check if a username exists
const doesUserExist = async (username: string): Promise<boolean> => {
  const user = await User.findOne({ affiname: username });
  return !!user;
};

// Function to generate a unique username
export const generateAffiname = async (email: string): Promise<string> => {
  const atIndex = email.indexOf("@");
  let baseUsername = email.slice(0, atIndex);
  let username = baseUsername;
  let counter = 1;

  while (await doesUserExist(username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
};
