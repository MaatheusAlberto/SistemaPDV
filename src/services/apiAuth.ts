
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext';


export function configAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${cookies['@nextauth.token']}`,
    };
  
    return fetch(`https://fakestoreapi.com${url}`, { ...options, headers })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            if (typeof window !== 'undefined') {
              signOut();
            } else {
              throw new AuthTokenError();
            }
          }
          
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => Promise.reject(error));
  };

  return api;
}
