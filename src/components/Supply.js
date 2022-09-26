import React, {useEffect, useState} from 'react'
import onChainNoah from '../utils/OnChainNoah.json'
import {ethers} from 'ethers';
import Web3 from 'web3';

const Supply = () => {

    const [supply, setSupply] = useState(0);
    // console.log(supply);
    const CONTRACT_ADDRESS = "0x0B63f921cC0D656a62949e0534FeCB5A45909083";


    const getSupply = async () => {
          const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/jLX7g4_CHD0ugiMOx43PC2QCZi5cqfTl');    
          
          const connectedContract = new web3.eth.Contract(onChainNoah.abi, CONTRACT_ADDRESS);
          const totalSupply = await connectedContract.methods.totalSupply().call();
          setSupply(totalSupply);
          console.log(totalSupply);
    }

    useEffect(()=> {
        getSupply();
    }, [])

  return (
    <div>{supply}</div>
  )
}

export default Supply

