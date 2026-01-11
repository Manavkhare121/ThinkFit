import React, { useState } from 'react'
import './Chatting.css'

const Chatting = () => {
  const [inputActive, setInputActive] = useState(false);

  return (
    <div 
      className="chatting-container"
      onClick={() => setInputActive(false)}   
    >
      <div className="chatting-layout">
        <div className="chatting-main-panel">
          
          <div 
            className={`chatting-input-box ${inputActive ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();            
              setInputActive(true);
            }}
          >
            <div className="chatting-input-field">
              <input 
                type="text" 
                placeholder="How Can I Help You..."
              />
            </div>

            <div className="chatting-send-icon">
              <i className="ri-send-plane-fill"></i>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Chatting;
