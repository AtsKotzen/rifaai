import React from 'react';

const NavBar = () => {
  // Estilos definidos diretamente no componente
  const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9fa',
    padding: '10px',
    position: 'fixed',
    top:  0,
    width: '100%',
    zIndex:  1000,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  // const logoImageStyle = {
  //   height: '30px',
  //   marginRight: '10px',
  // };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };

  return (
    <nav style={navBarStyle}>
      <div style={logoStyle}>
        {/* <img src="/caminho/para/o/logo.png" alt="Logo Rifai" style={logoImageStyle} /> */}
        <span style={titleStyle}>Rifaai</span>
      </div>
      {/* Aqui você pode adicionar links de navegação ou outros elementos conforme necessário */}
    </nav>
  );
};

export default NavBar;
