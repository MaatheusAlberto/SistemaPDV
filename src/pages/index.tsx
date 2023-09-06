import React, { FormEvent, useContext, useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import styles from '../../styles/home.module.css'
import Head from 'next/head'

import logoImg from '../../public/caixaRegistradora.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

import { AuthContext } from '../contexts/AuthContext'

import { useForm, useController } from 'react-hook-form';
import { rotaSSRNaoLogados } from '../utils/rotaSSRNaoLogados'



export default function Home() {
  const { signIn } = useContext(AuthContext)
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      nome: '', 
      password: '',
    },
    shouldUnregister: false,
    resolver: async (data) => {
      const errors: Record<string, string> = {};
  
      if (!data.nome) {
        errors.nome = 'Campo Nome é obrigatório';
      }
      if (!data.password) {
        errors.password = 'Campo Senha é obrigatório';
      }
  
      return {
        values: data,
        errors,
      };
    },
  });
  const { errors, isDirty } = formState;
  const { field: nomeField } = useController({
    control,
    name: 'nome',
    defaultValue: '',
  });
  const { field: passwordField} = useController({
    control,
    name: 'password',
    defaultValue: '',
  });

  const onSubmit = async (data: { nome: string; password: string }) => {
    try {
      if (!isDirty) {
        return;
      }
      await signIn(data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Head>
        <title>Sistema PDV - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo PDV' />
        <h1 className={styles.titleText}>Sistema PDV</h1>
        <div className={styles.login}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder='Digite seu login'
              type='text'
              {...nomeField}
            />
            {errors.nome && typeof errors.nome === 'string' && (
              <p className={styles.errorMessage}>{errors.nome}</p>
            )}
            <Input
              placeholder='Digite sua senha'
              type='password'
              {...passwordField}
            />
            {errors.password && typeof errors.password === 'string' && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}
            <Button type='submit' >
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = rotaSSRNaoLogados( async (contexto) => {
  return {
    props: {}
  }
})