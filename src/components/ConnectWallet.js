import React from 'react'

const ConnectWallet = ({connect, account}) => {
  return (
      <button onClick={connect}>{account ? account : "Connect Wallet"}</button>
      
  )
}

export default ConnectWallet