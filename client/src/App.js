import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Ipfs from 'ipfs-core';

import "./App.css";
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import WriteAPost from './pages/WriteAPost';
import PersonalPosts from './pages/PersonalPosts';
import Stats from './pages/PersonalStats';
// import Sidebar from './components/Sidebar';
import MyMenu from './components/Menu';
import SinglePost from "./pages/SinglePost";
import { Container } from "semantic-ui-react";


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      storageValue:0,
      web3: null,
      accounts: null,
      contract: null,
      ipfs: null,
      isOpen: false
    };
  }

  toggle = async () => {
    this.setState({ isOpen: !(this.state.isOpen) });
    this.state.isOpen? console.log('Open'): console.log('Close');
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }/*, this.runExample*/);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    if (!this.state.ipfs) {
      const ipfsNode = await Ipfs.create()
      this.setState({ipfs: ipfsNode})
      console.log('Init Ipfs')
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    const { storageValue, web3, accounts, contract, ipfs, isOpen} = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if (!ipfs) {
      return <div>Loading Ipfs...</div>;
    }
    
   return (
     <BrowserRouter>
        <div className="App">
          <MyMenu/>
          <Container style={{ marginTop: '20px' }}>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/new-post'>
                <WriteAPost web3={web3} accounts={accounts} contract={contract} ipfs={ipfs} />
              </Route>
              <Route path='/posts' component={PersonalPosts} />
              <Route path='/stats' component={Stats} />
              <Route path='/singlepost/:id' component={SinglePost} />
            </Switch>
          </Container>
        </div>
     </BrowserRouter>
     
   );
  }
}

export default App;
