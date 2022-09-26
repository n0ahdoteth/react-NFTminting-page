import React from 'react'

const MintButtons = ({mint, mintCount, addMint, subMint}) => {
  return (
    <div>
        <button onClick={mint} className="cta-button connect-wallet-button">
            Mint {mintCount} 
        </button> 
        <br />
        <button onClick={subMint}>-</button>
        <button onClick={addMint}>+</button>
    </div>
  )
}

export default MintButtons