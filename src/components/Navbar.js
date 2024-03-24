import React from 'react';

const NavBar = () => {
 // Estilos definidos diretamente no componente
 const navBarStyle = {
    display: 'flex',
    justifyContent: 'center', // Centraliza o conteúdo horizontalmente
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: '10px',
    marginBottom: '20px', // Reduzido para não ocupar muito espaço
    position: 'fixed',
    top: 0,
    width: '100%', // Corrigido para '100%' para ocupar toda a largura
    zIndex: 1000,
 };

 const logoStyle = {
    display: 'flex',
    alignItems: 'center',
 };

 const titleStyle = {
    fontSize: '50px', // Reduzido para se adequar melhor ao layout
    fontWeight: 'bold',
 };
 

 return (
    <nav style={navBarStyle}>
      <div style={logoStyle}>
        {/* <img src="/caminho/para/o/logo.png" alt="Logo Rifai" style={logoImageStyle} /> */}
        <span style={titleStyle}>Rifaí</span>
      </div>
      {/* Aqui você pode adicionar links de navegação ou outros elementos conforme necessário */}
    </nav>
 );
};

export default NavBar;
