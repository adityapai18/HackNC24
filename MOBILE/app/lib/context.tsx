import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_url } from "@/constants/Urls";

interface AuthCon {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}
const appContext = createContext<AuthCon | null>(null);
export function ContextProvider({ children }: any) {
  const context = useContextProvided();
  return <appContext.Provider value={context}>{children}</appContext.Provider>;
}

export const useAppContext = () => {
  return useContext(appContext);
};

function useContextProvided() {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      const res = await axios.post(base_url + "/auth/login", {
        email,
        password,
      });
      setUser(res.data);
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    user,

    login,
  };
}
