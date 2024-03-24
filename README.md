## Rifaai
# A rifa que ressignifica o ReFi

Plataforma de Rifas na blockchain Scroll.

Tudo será feito de maneira justa e transparente para manter a confiança da comunidade e fortalecer o "protocolo cultural web3 regenerativo". A ideia é que ele funcione a longo prazo hidratando a organização com fluxo de recursos recorrentes.

## Etapas:

### Criação do Smart Contract

O contrato deve ser capaz de receber pagamentos em ETH na rede Scroll, registrar os endereços das carteiras dos participantes e realizar o sorteio. Será utilizado Solidity para criar este contrato.

### Distribuição dos recursos

O Smart Contract enviará automaticamente, em ETH:

- 88% do valor arrecadado para a carteira de quem disponibilizou o item para a rifa;
- 10% do valor arrecadado para a carteira multisig do coletivo;
- ~2% (residual) pode ser sacado pelo manager do contrato.

### Entrega do prêmio

A entrega do prêmio será feita via Correios ou Transportadora.

### Replicação do processo

Uma vez que tenhamos sucesso com a primeira rifa, poderemos replicar o processo para vender outros itens.

## PRINCIPAIS COMPONENTES DO CONTRATO

### Gerente

O contrato possui um endereço de gerente, que é a pessoa que implanta o contrato e somente ela pode executar o sorteio.

### Provedor / Patrocinador

Quem disponibiliza o item a ser rifado e recebe o maior montante das vendas(88%).

### Jogadores

Uma série de jogadores que podem assinar o contrato enviando Ether e participar do sorteio.

### Últimos Vencedores

Uma matriz para armazenar os endereços dos últimos vencedores.

### Vencedor escolhido

Uma variável booleana para verificar se um vencedor foi escolhido.

## Principais funções do contrato

- `enter()`: Permite que um jogador assine o contrato enviando um valor pré determinado de Ether(o valor é definido pelo manager).
- `random()`: Um gerador simples de números aleatórios. Precisamos usar uma fonte de aleatoriedade mais segura para contratos de produção.(Chainlink VRF)
- `pickWinner()`: Escolhe um vencedor entre os jogadores, transfere 90% do saldo do contrato para o técnico.

## TODO

- [x] Ajustar a função `pickWinner()`. A função `pickWinner` está atualmente com mais de uma responsabilidade. Além de escolher o vencedor ela está também fazendo a transferência dos recursos.
- [x] Fazer deploy na rede Scroll Sepolia
- [x] Aprimorar o UI/UX do frontend

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
