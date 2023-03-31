import React, { useState } from "react";
import abi from './abi.json';
const ethers=require('ethers')

function Metamask() {

   const contract_address="0x1bA8d4167E095C38343c115C004ca86a329eFfD0"
  const [errMsg, seterrMsg] = useState("");
  const [defaultAccount, setdefaultAccount] = useState("null");
  const [provider, setprovider] = useState(null);
  const [connectBtn, setconnectBtn] = useState("Connect Wallet");
  const [name, setname] = useState(null);

  const [signer, setsigner] = useState(null);
  const [contract, setcontract] = useState(null);

  function handleBtn() {
    console.log("hello");
  }
  const accountHandler = (setAccount) => {
    setdefaultAccount(setAccount);
  };
  const ConnectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountHandler(result[0]);
          setconnectBtn("Connected");
        });
    } else {
      seterrMsg("Please Install Metamask Extention");
    }
  };

  const send = () => {

    let tempProvider=new ethers.providers.Web3Provider(window.ethereum);
    setprovider(tempProvider)

    let tempSigner=tempProvider.getSigner();
    setsigner(tempSigner)

    const tempContract=new ethers.Contract(contract_address,abi,tempSigner)
    setcontract(tempContract);


  };
  return (
    <>
      <center>
        <h4>{}</h4>
        <h3>Interact with contract</h3>
        <button onClick={ConnectWalletHandler}>{connectBtn}</button>
        <h4>Account Address:{defaultAccount}</h4>

        <h4>Get Token Name:</h4>
      </center>
    </>
  );
}

export default Metamask;
