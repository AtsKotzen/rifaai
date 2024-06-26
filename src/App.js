import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import guit1 from "./assets/guit1.PNG";
import Navbar from "./components/Navbar";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [balance, setBalance] = useState("");
  const valueInEther = 0.001;
  const [message, setMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const winners = await lottery.methods.getLastWinners().call();
      const balanceWei = await web3.eth.getBalance(lottery.options.address);
      const balance = web3.utils.fromWei(balanceWei, "ether");

      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
      setWinners(winners);
    }

    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const valueInWei = web3.utils.toWei(valueInEther, "ether");
    console.log(accounts[0]);
    setMessage("Aguarde até que a rede processe sua participação...");

    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: valueInWei,
        gas: 100000, // Configuração de gas
        gasPrice: web3.utils.toWei("1", "gwei"), // Configuração de gasPrice
      });

      setMessage("Sua participação foi registrada ! Boa sorte ! Pressione F5");
    } catch (error) {
      console.error("Falha na transação: ", error);
      setMessage("Ihhhhh... Deu ruim na sua participação... Pressione F5 ");
    }
  }

  async function handleClick() {
    const accounts = await web3.eth.getAccounts();

    setMessage("Sorteando vencedor...");

    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0],
        gas: 1000000, // Configuração de gas
        gasPrice: 10000000, // Configuração de gasPrice
      });

      setMessage("Temos um vencedor! Pressione F5");
    } catch (error) {
      console.error("Falha na transação:", error);
      setMessage("Ihhh... Deu ruim na transação. Pressione F5");
    }
  }

  const cardStyle = {
    border: "2px solid green",
    borderRadius: "10px",
    padding: "20px",
    transition: "all 0.3s ease",
    marginBottom: "15px",
    width: "auto",
    maxWidth: "500px",
    hover: {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
  };

  const rowStyle = {
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: 'center',
    //backgroundColor: "#f5f5f5",
    padding: "80px",
    boxSizing: "border-box",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50", // Cor de fundo do botão
    border: "none", // Remove a borda padrão
    color: "white", // Cor do texto
    padding: "15px 32px", // Espaçamento interno
    textAlign: "center", // Alinhamento do texto
    textDecoration: "none", // Remove a decoração do texto
    display: "inline-block", // Permite que o botão seja exibido como um bloco inline
    fontSize: "16px", // Tamanho da fonte
    margin: "4px 2px", // Margem ao redor do botão
    cursor: "pointer", // Muda o cursor para um ponteiro quando o mouse passa sobre o botão
    borderRadius: "12px", // Bordas arredondadas
    transition: "background-color 0.3s ease", // Transição suave da cor de fundo
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={rowStyle}>
          <h1>Guitarra Gibson Les Paul</h1>
          <div>
            <div>
              <img src={guit1} width="200" alt="imagem do premio" />
            </div>
            <h4>
              O prêmio para a rifa atual é uma guitarra elétrica usada. Muito
              confortável e macia.
            </h4>
            <p>
              <strong>Marca: </strong>Gibson
            </p>
            <p>
              <strong>Pintura: </strong>Sunburst
            </p>
            <p>
              <strong>Modelo: </strong>Les Paul
            </p>
          </div>          

          <div style={cardStyle}>
            {currentAccount !== manager && (
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>Somente 0.001 ETH + taxas de rede !!!</h2>
                </div>
                <button style={buttonStyle}>Participar</button>
              </form>
            )}

            {currentAccount === manager && (
              <div>
                <div>
                  <h2>Sortear Vencedor</h2>
                  <button style={buttonStyle} onClick={handleClick}>
                    Iniciar sorteio
                  </button>
                </div>
              </div>
            )}

            {message && <h3>{message}</h3>}
          </div>

          <div style={cardStyle}>
            <h2>Contribuição</h2>
            <h3>
              10% da arrecadação será enviada automaticamente para a Piscina
              Comum de Recursos Compartlhados, destinada a ajudar diversos
              projetos ReFi no Brasil.
            </h3>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={cardStyle}>
            <h2>Total arrecadado em ETH</h2>
            <h2>{balance} / 1 ETH</h2>
          </div>

          <div style={cardStyle}>
            <h2>Participantes</h2>
            <h2>{players.length}</h2>
          </div>

          <div style={cardStyle}>
            <h2>Valor do bilhete</h2>
            <h2>0.001 ETH</h2>
          </div>

          <div style={cardStyle}>
            <h2>Últimos Vencedores</h2>
            {winners.map((winner, index) => (
              <p key={index}>{winner}</p>
            ))}
          </div>
          
          <div style={cardStyle}>
            <h3>Organizador da rifa</h3>
            <p>Athus Oliveira</p>
            <p>Endereço: {manager}</p>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default App;
