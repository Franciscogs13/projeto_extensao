// @ts-nocheck
import React from 'react'
import styles from './FimDeJogo.module.css';

const FimDeJogo = ({resetarJogo, pontuacao}) => {
  return (
    <div className={styles.conteiner}>
      <h1 className={styles.fim}>FIM DE JOGO</h1>
      <p className={styles.sua}>Sua pontuação final foi: <span className={styles.pontuacao}>{pontuacao}</span></p>
      <button onClick={resetarJogo} className={styles.resetar}>RESETAR JOGO</button>
    </div>
  )
}

export default FimDeJogo