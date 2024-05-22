import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserProps = {
  id: number;
  name: string;
  phone: number;
}

type AuthContextProps = {
  user: UserProps | null;
  saveUser: (user: UserProps) => void;
  checkUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const storageKey = "user";

  const saveUser = async (user: UserProps) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(user));
  }

  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem('user');
    if (userJson) {
      setUser(JSON.parse(userJson).user);
    };
  }

  return (
    <AuthContext.Provider value={{
      user,
      checkUser,
      saveUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
