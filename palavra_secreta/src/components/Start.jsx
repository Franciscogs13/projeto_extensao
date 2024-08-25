// @ts-nocheck
import React from 'react'
import styles from './Start.module.css';


const Start = ({iniciarJogo}) => {
  return (
    <div className={styles.inicio}>
      <h1 className={styles.palavra}>Palavra</h1>
      <h1 className={styles.secreta}>SECRETA</h1>
      <button onClick={iniciarJogo} className={styles.comecar}>COMEÇAR</button>
    </div>
  )
}

export default Start