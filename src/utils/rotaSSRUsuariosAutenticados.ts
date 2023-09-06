import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

//Funçao para usuarios logados

export function rotaSSRUsuariosAutenticados<P>(fn: GetServerSideProps<P>){
  return async(contexto: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(contexto)

    const token = cookies['@nextauth.token']

    if(!token){
      return {
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }

    try {
      return await fn(contexto)
    } catch (e){
      if(e instanceof AuthTokenError){
        destroyCookie(contexto, '@nextauth.token')

        return {
          redirect:{
            destination: '/',
            permanent: false,
          }
        }
      }
    }

  }

}