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
  login: (email: string, password: string) => Promise<User>;
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

      console.log("yaha", res.data);
      setUser(res.data.user);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("user");
      console.log(data)
      const user = JSON.parse(data);
      setUser(user)
    })();
  }, []);

  return {
    user,

    login,
  };
}
