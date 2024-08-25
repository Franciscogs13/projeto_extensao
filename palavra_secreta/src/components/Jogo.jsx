// @ts-nocheck
import React from 'react';
import { useState, useRef } from 'react';
import styles from './Jogo.module.css';

const Jogo = ({
  verificarLetra,
  palavraEscolhida,
  categoriaEscolhida,
  letras,
  letrasAdivinhadas,
  letrasErradas,
  chances,
  pontuacao,
}) => {
  const [letra, setLetra] = useState('');
  const letraInputRef = useRef(null);
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const letraInput = letra.trim().toLocaleLowerCase();

    if (!/^[a-zA-ZÀ-úÇç]$/.test(letraInput)) {
      setErro('Por favor, insira apenas letras.');
      return;
    }

    verificarLetra(letraInput);
    setLetra('');
    setErro('');
    letraInputRef.current.focus();
  };

  return (
    <div className={styles.jogo}>
      <p className={styles.pontuacao}>
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className={styles.dica}>
        Dica: <span>{categoriaEscolhida}</span>
      </h3>
      <p>Você ainda tem {chances} tentativas</p>
      <div className={styles.containerPalavras}>
        {letras.map((letra, i) =>
          letrasAdivinhadas.includes(letra) ? (
            <span key={i} className={styles.letra}>
              {letra}
            </span>
          ) : (
            <span key={i} className={styles.espacoBranco}></span>
          ),
        )}
      </div>
      <div className={styles.containerLetras}>
        <p>Tente adivinhar uma letra da palavra</p>
        <p className={styles.erro}>{erro}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letra"
            maxLength={1}
            required
            onChange={(e) => setLetra(e.target.value)}
            value={letra}
            ref={letraInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="containerLetrasErradas">
        <p>Letras já utilizadas:</p>
        {letrasErradas.map((letra, i) => (
          <span key={i}>{letra}, </span>
        ))}
      </div>
    </div>
  );
};

export default Jogo;
