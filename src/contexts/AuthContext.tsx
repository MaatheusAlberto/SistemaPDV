import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient';

type AuthContextDataType = {
  user: UserPropsType;
  isAuthenticated: boolean;
  signIn: (credentials: SignInPropsType) => Promise<void>;
  signOut: () => void;
}

type UserPropsType = {
  id: string;
  nome: string;
}

type SignInPropsType = {
  nome: string;
  password: string
}

type AuthProviderPropsType = {
  children: ReactNode;
}

function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomNumber}`;
}

type UserData = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
};


export const AuthContext = createContext({} as AuthContextDataType)

export function AuthProvider({ children }: AuthProviderPropsType) {
  const [user, setUser] = useState<UserPropsType>()
  const isAuthenticated = !!user;

  function storageUser(data){
    localStorage.setItem('@UserProps', JSON.stringify(data))
}


  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
        const storageUser = localStorage.getItem('@UserProps');

        if(storageUser){
          setUser(JSON.parse(storageUser)) 
        }

      } else {
        signOut()
        console.error('Erro ao buscar dados do usuário');
    }

  },[])

  async function signIn({ nome, password }: SignInPropsType) {
    try {
      const token = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          // username: "johnd",
          // password: "m38rmF$"
          username: nome,
          password: password
        }),
      });
      
      setCookie(undefined, '@nextauth.token',  token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      const userData: UserData[] = await fetch('https://fakestoreapi.com/users').then(res => res.json());
    
      const usersWithSameName = userData?.find(item => {
        if(item.username === nome){
          return item.id
        }
      });

      const usuarioLogado: UserPropsType = {
        id: String(usersWithSameName.id),
        nome,
      };

      setUser(usuarioLogado);
      storageUser(usuarioLogado);

      Router.push('/dashboard')

      console.log('conectou!')
      
    } catch(err) {
      console.log('erro ao acessar', err)
    }
    
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('erro ao deslogar')
  }
}