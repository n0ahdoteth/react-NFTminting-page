import './App.css';
import { useState, useEffect } from 'react';import MintPanel from './components/MintPanel';
import Header from './components/Header';
import onChainNoah from './utils/OnChainNoah.json'
import {ethers} from 'ethers';
import MintButtons from './components/MintButtons';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const CONTRACT_ADDRESS = "0x7EEbAd95c7cA14238D7Bdd237220Ee92EaEA97Cb"

const App = () => {
  
  const [currentAccount, setCurrentAccount] = useState("");
  const [supplyCount, setSupplyCount] = useState(0);
  const [mintCount, setMintCount] = useState(1);
  const [error, setError] = useState();
  const [isOnGoerli, setIsOnGoerli] = useState();
  
  const {ethereum} = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, onChainNoah.abi, signer);
  const shortenedAddress = currentAccount.slice(0,5) + "..." + currentAccount.slice(35,40);

  const addMint = () => {
    if (mintCount < 5){
      setMintCount(mintCount + 1);
    }
  }

  const subMint = () => {
    if(mintCount > 1) {
      setMintCount(mintCount -1)
    }
  }
  const changeNetwork = async () => {
    try{
      
      if (!ethereum) throw new Error("No crypto wallet found");
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.toHex(5)
          }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  }

  const seeNetwork = async () => {
    const provider = await detectEthereumProvider();
    const chainIdTest = await provider.request({ method: 'eth_chainId' })
    if(chainIdTest == 5){
      setIsOnGoerli(true);
    } else {
      setIsOnGoerli(false);
    }
  }

  const handleNetworkSwitch = async () => {
    setError();
    await changeNetwork();
    seeNetwork();
  }

  const mint = async () => {
    try {
        if (ethereum) {
            let nftTxn = await connectedContract.mint(mintCount);
            await nftTxn.wait();
            console.log(`Minted, https://goerli.etherscan.io/tx/${nftTxn.hash}`);
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error)
    }
  }

  const connectWallet = async() => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!")
        seeNetwork();
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      seeNetwork();
    } catch (error) {
      console.log(error);
    }
  }

  const displaySupply = async() =>{
    try{
      if(ethereum){
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, onChainNoah.abi, signer);
        let supply = await (connectedContract.totalSupply());
        setSupplyCount(supply.toNumber());
      } else {
        console.log("Eth obj doesn't exist");
      }
    } catch (error){
      console.log(error);
    }
  }

  useEffect(()=>{
    displaySupply();
  }, [2])
   
  return (
    <div className="App">
          <Header />


        {currentAccount && !isOnGoerli ? (<button onClick={handleNetworkSwitch}>Switch to Goerli</button>) : null }
          
          
          {currentAccount === "" ? (
                <button onClick={connectWallet}>Connect to Wallet</button>
          ) : (
           <button>{shortenedAddress}</button>
          )}

          <p>{supplyCount > 0 ? `Supply Minted ${supplyCount} / 1000`  : null}</p>
          
          {currentAccount ? (
             <MintButtons 
              mint={mint} 
              addMint={addMint} 
              subMint={subMint} 
              mintCount={mintCount} 
            />
          ) : null}
    </div>
  );
};

export default App;
