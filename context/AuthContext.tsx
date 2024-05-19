import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserProps = {
  id: number;
  name: string;
  phone: string;
}

type AuthContext = {
  user: UserProps | null;
  saveUser: (user: UserProps) => void;
  checkUser: () => void;
}

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const storageKey = "user";

  const saveUser = async (user) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(user));
  }

  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem('user');
    if (userJson) {
      setUser(JSON.parse(userJson));
    };
  }

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}
