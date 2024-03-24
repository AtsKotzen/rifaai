import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import guit1 from "./assets/guit1.PNG";
import Navbar from "./components/Navbar";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const valueInEther = 0.001;
  const [message, setMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balanceWei = await web3.eth.getBalance(lottery.options.address);
      const balance = web3.utils.fromWei(balanceWei, "ether");

      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);

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
        gasPrice: web3.utils.toWei("1", "gwei"), // Configuração de gasPrice
      });

      setMessage("You have been entered!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setMessage(
        "Transaction failed. Please check your account and try again."
      );
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
      setMessage(
        "Transaction failed. Please check your account and try again."
      );
    }
  }
  return (
    <>
      <Navbar />
      <div class="card">        
        <p class="description">Rifa criada por Athus Oliveira</p>
        <p class="description">Manager: {manager}</p>
        <h2 class="description">Participantes: {players.length}</h2>
        <h2 class="description">Total: {balance} ETH</h2>

        <hr />

        <h4 class="subtitle">Prêmio</h4>
        <p class="description">Guitarra Gibson Les Paul</p>
        
        <div class="image-container">
          <img src={guit1} width="200" alt="imagem do premio" />
          
        </div>

        <hr />

        <h4 class="subtitle">Contribuição</h4>
        <p class="description">
          10% da arrecadação será enviada
          automaticamente para a Piscina Comum de Recursos Compartilhados. Isso
          vai ajudar diversos projetos ReFi no Brasil.
        </p>

        <hr />
        {currentAccount !== manager && (
        <form onSubmit={handleSubmit}>
          <h4 class="subtitle">Vai tentar a sorte?</h4>
          <div>
            <label class="description">
              Valor do bilhete: 0.001 ETH + taxas de rede
            </label>
          </div>
          <button class="button">Participar</button>
        </form>
        )}
        <hr />
          
        {currentAccount === manager && (
          <div>
            <h4 class="subtitle">Sortear vencedor</h4>
            <button class="button" onClick={handleClick}>
              Iniciar sorteio!
            </button>
          </div>
        )}
        <hr />

        <h1 class="message">{message}</h1>
      </div>
    </>
  );
}

export default App;
