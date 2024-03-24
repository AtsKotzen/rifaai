import React, { useState, useEffect } from 'react';
import web3 from './web3';
import lottery from './lottery';
import guit1 from './assets/guit1.jpeg';
import guit2 from './assets/guit2.jpeg';
import guit3 from './assets/guit3.jpeg';
import Navbar from './components/Navbar';


function App() {
 const [manager, setManager] = useState("");
 const [players, setPlayers] = useState([]);
 const [balance, setBalance] = useState("");
 const valueInEther = .001; 
 const [message, setMessage] = useState("");

 useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balanceWei = await web3.eth.getBalance(lottery.options.address);
      const balance = web3.utils.fromWei(balanceWei, "ether");
       
      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    }
 
    fetchData();
 }, []);

 async function handleSubmit(event) {
    event.preventDefault(); 
    const accounts = await web3.eth.getAccounts();
    const valueInWei = web3.utils.toWei(valueInEther, "ether");
    console.log(accounts[0]);
    setMessage("Waiting on transaction success...");
 
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: valueInWei,
        gas: 100000, // Configuração de gas
        gasPrice: web3.utils.toWei('1', 'gwei'), // Configuração de gasPrice
      });
 
      setMessage("You have been entered!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage("Transaction failed. Please check your account and try again.");
    }
 }

 async function handleClick() {
    const accounts = await web3.eth.getAccounts();

    setMessage("Waiting on transaction success...");
 
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0],
        gas: 1000000, // Configuração de gas
        gasPrice: 10000000, // Configuração de gasPrice
      });
 
      setMessage("A winner has been picked!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage("Transaction failed. Please check your account and try again.");
    }
 }
 return (
  <div className="card">
    <Navbar />
    <h2 className="title">Rifaai</h2>
    <p className="description">Rifa criada por Athus Oliveira</p>
    <p className="description">Carteira: {manager}</p>
    <p className="description">Atualmente existem {players.length} pessoas participando do Rifaai e ressignificando o que é ReFi</p>
    <p className="description">Total arrecadado em ETH: {balance}</p>

    <hr />

    <h4 className="subtitle">Prêmio</h4>
    <p className="description">O prêmio para a rifa atual é uma guitarra elétrica usada. Aqui estão as características da guitarra:</p>
    <ul className="list">
      <li>Muito confortável e macia</li>
      <li>Marca: Gibson Epiphone</li>
      <li>Modelo: Special</li>
      <li>Pintura: Sunburst</li>
    </ul>
    <p className="description">O preço de mercado da guitarra é R$1.000,00.</p>
    <div className="image-container">
      <img src={guit1} width="200" alt='imagem do premio'/>
      <img src={guit2} width="200" alt='imagem do premio'/>
      <img src={guit3} width="200" alt='imagem do premio'/>
    </div>

    <hr />

    <h4 className="subtitle">Contribuição</h4>
    <p className="description">É importante mencionar que 10% da arrecadação será enviada automaticamente para a piscina comum de recursos compartilhados. Isso vai ajudar diversos projetos de impacto.</p>

    <hr />

    <form onSubmit={handleSubmit}>
      <h4 className="subtitle">Vai tentar a sorte?</h4>
      <div>
        <label className="description">Valor do bilhete: 0.1 ETH + taxas de rede</label>
      </div>
      <button className="button">Participar</button>
    </form>

    <hr />

    <h4 className="subtitle">Sortear vencedor</h4>
    <button className="button" onClick={handleClick}>Iniciar sorteio!</button>

    <hr />

    <h1 className="message">{message}</h1>
  </div>
);
}

export default App;
