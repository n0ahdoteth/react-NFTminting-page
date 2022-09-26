import React from 'react'
import GIF from './GIF'

const MintPanel = ({mintCount, subMint, addMint}) => {
  return (
    <div>

        {/* <GIF/> */}
        
        <button onClick={addMint}>+</button>
            <p>{mintCount}</p>
        <button onClick={subMint}>-</button>
        
        <button>Mint</button>

    </div>
  )
}

export default MintPanel