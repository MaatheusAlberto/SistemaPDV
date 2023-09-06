import React, { useContext } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { AuthContext } from '../../contexts/AuthContext'

export function MenuBar(){

  const { user, signOut } = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
      <span className={styles.usuarioConectado}>usuario: {user?.nome}</span>
      <div className={styles.headerContent}>
        <Link href='/dashboard'>
          <Image src="/CaixaRegistradora.svg" width={190} height={60} alt='' />
        </Link>

        <nav className={styles.nav}>
          <ul>
          <li>
              <Link href='/dashboard'>
                Painel
              </Link>
            </li>
            <li>
              <Link href='/produtos'>
                Produtos
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.logout} onClick={signOut}>
          <button>Logout</button>
        </div>

      </div>
    </header>

  )
}