import { createContext } from "react";

// Define the type of your context value
type ContextValueType = {
  // Define your context value properties and their types here
};

// Pass the type parameter to createContext
export const AppContext = createContext<ContextValueType | undefined>(undefined);