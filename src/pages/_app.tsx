import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import '../../styles/globals.css'

import { AuthProvider } from '../contexts/AuthContext'
import { CarrinhoProvider } from '../contexts/CarrinhoContext'

const queryCliente = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <QueryClientProvider client={queryCliente}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </CarrinhoProvider>
    </AuthProvider>
  )
}

export default MyApp