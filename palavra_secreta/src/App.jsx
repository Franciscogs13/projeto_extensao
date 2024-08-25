// @ts-nocheck
import React from 'react';
import './App.css';

import { useCallback, useEffect, useState } from 'react';

//Dados
import { Palavras } from './data/Palavras';

//Componentes
import Start from './components/Start';
import Jogo from './components/Jogo';
import FimDeJogo from './components/FimDeJogo';

const estagios = [
  { id: 1, name: 'inicio' },
  { id: 2, name: 'jogo' },
  { id: 3, name: 'fim' },
];

function App() {
  const [estagioAtual, setEstagioAtual] = useState(estagios[0].name);
  const [palavras] = useState(Palavras);

  const [palavraEscolhida, setPalavraEscolhida] = useState('');
  const [categoriaEscolhida, setCategoriaEscolhida] = useState('');
  const [letras, setLetras] = useState([]);

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [chances, setChances] = useState(6);
  const [pontuacao, setPontuacao] = useState(0);

  const letraECategoriaEscolhidas = useCallback(() => {
    //escolha de categoria aleatória
    const categorias = Object.keys(Palavras);
    const categoria =
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    //escolha de palavra aleatória
    const palavra =
      Palavras[categoria][
        Math.floor(Math.random() * Palavras[categoria].length)
      ];

    return { palavra, categoria };
  }, [Palavras]);

  const iniciarJogo = useCallback(() => {
    //limpar todas as letrars
    limparEstados();

    //escolha de palavra e categoria
    const { palavra, categoria } = letraECategoriaEscolhidas();

    let letraDasPalavras = palavra.split('');
    letraDasPalavras = letraDasPalavras.map((letra) => letra.toLowerCase());

    //preenchendo os estados
    setPalavraEscolhida(palavra);
    setCategoriaEscolhida(categoria);
    setLetras(letraDasPalavras);

    setEstagioAtual(estagios[1].name);
  }, [letraECategoriaEscolhidas]);

  const verificarLetra = (letra) => {
    const letrasPadronizadas = letra.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
    // Checar se a letra já foi usada
    if (
      letrasAdivinhadas.includes(letrasPadronizadas) ||
      letrasErradas.includes(letrasPadronizadas)
    ) {
      return;
    }
  
    const letrasCoincidem = letras.filter((letraDaPalavra) => {
      const letraDaPalavraPadronizada = letraDaPalavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      return letraDaPalavraPadronizada.includes(letrasPadronizadas);
    });
  
    if (letrasCoincidem.length > 0) {
      setLetrasAdivinhadas((letraAdivinhadaAtual) => [
        ...letraAdivinhadaAtual,
        ...letrasCoincidem,
      ]);
    } else {
      setLetrasErradas((letrasErradasAtual) => [
        ...letrasErradasAtual,
        letrasPadronizadas,
      ]);
      setChances((chancesAtuais) => chancesAtuais - 1);
    }
  };

  const limparEstados = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  };

  useEffect(() => {
    if (chances <= 0) {
      limparEstados();

      setEstagioAtual(estagios[2].name);
    }
  }, [chances]);

  //condição de vitória
  useEffect(() => {
    const letrasUnicas = [...new Set(letras)];

    if (
      letrasAdivinhadas.length === letrasUnicas.length &&
      estagioAtual === estagios[1].name
    ) {
      //atualiza pontuação
      setPontuacao((pontuacaoAtual) => (pontuacaoAtual += 10));

      //Recomça o jogo
      iniciarJogo();
      setChances(6);
    }
  }, [letrasAdivinhadas, letras, iniciarJogo, setChances, estagioAtual]);

  //resetar o jogo
  const resetarJogo = () => {
    setPontuacao(0);
    setChances(6);
    setEstagioAtual(estagios[0].name);
  };

  return (
    <div className="App">
      {estagioAtual === 'inicio' && <Start iniciarJogo={iniciarJogo} />}
      {estagioAtual === 'jogo' && (
        <Jogo
          verificarLetra={verificarLetra}
          palavraEscolhida={palavraEscolhida}
          categoriaEscolhida={categoriaEscolhida}
          letras={letras}
          letrasAdivinhadas={letrasAdivinhadas}
          letrasErradas={letrasErradas}
          chances={chances}
          pontuacao={pontuacao}
        />
      )}
      {estagioAtual === 'fim' && (
        <FimDeJogo resetarJogo={resetarJogo} pontuacao={pontuacao} />
      )}
    </div>
  );
}

export default App;
