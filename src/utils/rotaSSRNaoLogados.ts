import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

//funcao para paginas que só pode ser acessadas por visitantes
export function rotaSSRNaoLogados<P>(fn: GetServerSideProps<P>) {
  return async (contexto: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(contexto);

    // Se o usuario tentar acessar a pagina porem tendo já um login salvo redirecionamos
    if(cookies['@nextauth.token']){
      return {
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(contexto);
  }

}