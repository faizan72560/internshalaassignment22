import React from 'react'
import { useState,useRef,useEffect } from 'react';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  
  const handleClick = () => {
    setShowPopup(true);
    setOtp(['', '', '', '', '', '']);
    alert("verified")
  };
  
  const handleInput = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    
    // Only allow numeric characters and limit to 1 digit
    if (/^[0-9]{0,1}$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move focus to the next input box
      if (index < inputRefs.current.length - 1 && value) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };
  
  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'Backspace':
        e.preventDefault();
        setOtp([...otp.slice(0, index), '', ...otp.slice(index + 1)]);
        if (index > 0) {
          inputRefs.current[index - 1].current.focus();
        }
        break;
      case 'ArrowLeft':
        if (inputRefs.current[index].current.selectionStart === 0 && index > 0) {
          inputRefs.current[index - 1].current.focus();
        }
        break;
      case 'ArrowRight':
        if (inputRefs.current[index].current.selectionStart === 1 && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].current.focus();
        }
        break;
      default:
        break;
    }
  };
  
  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text');
    
    // Only use the first 6 numeric characters from the clipboard
    const newOtp = pastedData.replace(/[^0-9]/g, '').slice(0, 6).split('');
    setOtp([...newOtp, ...otp.slice(newOtp.length)]);
  };
  
  const handlePopupClose = () => {
    setShowPopup(false);
    setOtp(['', '', '', '', '', '']);
  };
  
  const handlePopupSubmit = () => {
    // Validate the entered OTP and submit it
    // ...
    handlePopupClose();
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",height:"100vh",width:"100vw",alignItems:"center"}}>

      <div style={{height:"300px",width:"500px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", borderLeft: '3px solid grey',color:"grey",
    borderRight: '1px solid black',
   }}>
        <h2>Phone Verification</h2>
        <p>Enter otp You Received on 89206-6XXXX</p>
<div style={{display:"flex"}}>
        {otp.map((digit, index) => (
              <input
              
                type="text"
                maxLength="1"
                value={digit}
                ref={inputRefs.current[index]}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                key={index}
                // style={{width:"70px"}}
                style={{
                  marginLeft:"8px",
                  border: 'none',
                  width:"70px",
                  borderBottom: '1px solid black',
                  outline: 'none',
                }}
              />
            ))}
            </div>



        <button onClick={handleClick} style={{cursor:'pointer',width:"300px",borderRadius:"40px",marginTop:"10px",height:"60px",backgroundColor:"green",color:"white"}}>Verify Phone Number</button>


      </div>

    </div>
  )
}

export default App