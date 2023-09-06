import { useQuery } from "react-query";
import { MenuBar } from "../../components/MenuBar"
import { rotaSSRUsuariosAutenticados } from "../../utils/rotaSSRUsuariosAutenticados"
import { api } from "../../services/apiClient";
import { useGetCategoryProducts, useGetProducts, useGetProductsCategory } from "../../services/reactQuery";
import styles from './styles.module.css'
import Image from "next/image";
import CardProducts from "../../components/CardProducts";
import Head from 'next/head'
import Carrinho from "../../components/Cart";

export default function Produtos(){
  const { data: products } = useGetProducts();
  const { data: categoryProducts } = useGetProductsCategory('jewelery')
  // console.log(products)

  return (
    <div className={styles.containerProducts}>
      <Head>
        <title>Produtos</title>
      </Head>
      <Carrinho />
      <MenuBar />
     
      <div className={styles.productList}>
        <CardProducts products={products} />
      </div>
    </div>
  )
}


export const getServerSideProps = rotaSSRUsuariosAutenticados(async (contexto) => {
  return {
    props: {}
  }
})