import { MenuBar } from "../../components/MenuBar"
import { rotaSSRUsuariosAutenticados } from "../../utils/rotaSSRUsuariosAutenticados"
import Head from 'next/head'
import styles from './styles.module.css'
import CardPainel from "../../components/CardPainel"

export default function Dashboard(){
  
  return (
    <div className={styles.containerDashboard}>
      <Head>
        <title>Painel - PDV</title>
      </Head>
      <MenuBar />
      <div>
        <h1>Painel</h1>
      </div>
      <main>
        <section className={styles.sectionPainel}>
            <CardPainel title="Caixa" content='$10,000'/>
            <CardPainel title="Vendas" content='$10,000'/>
            <CardPainel title="Saque" content='$10,000'/>
        </section>

        <section  className={styles.pedidos}>
            <h2>Pedidos Recentes</h2>
            <ul>
                <li>
                    <span>Pedido #123</span>
                    <span>Data: 01/09/2023</span>
                    <span>Total: $100</span>
                </li>
                <li>
                    <span>Pedido #124</span>
                    <span>Data: 02/09/2023</span>
                    <span>Total: $150</span>
                </li>
            </ul>
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps = rotaSSRUsuariosAutenticados(async (contexto) => {
  return {
    props: {}
  }
})