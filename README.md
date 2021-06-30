# Decentralized Content Platform

# About the project

## Built with

Frontend

- [React](https://reactjs.org/)
- [Semantic UI react](https://react.semantic-ui.com/)
- [Web3](https://web3js.readthedocs.io/en/v1.3.0/)

Backend

- [Solidity](https://docs.soliditylang.org/en/v0.8.1/)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
- [Ganache](https://www.trufflesuite.com/ganache)

# Getting Start

## Prerequisite

- [NodeJS](https://nodejs.org/en/)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview)
- [Ganache](https://www.trufflesuite.com/ganache)

## Installation

```jsx
$ cd client
$ npm install
```

# Usage

Make sure you have opened ganache, check your ganache host and post, deafult host:127.0.0.1, port:8545.
If your host/port are not the same, please change truffle-config.js and client/src/getWeb3.js line 29.
After checking ganache host and port, type the following commands in the terminal.

```jsx
$ truffle compile
$ truffle migrate
```

In another terminal

```jsx
$ cd client
$ npm start
```
