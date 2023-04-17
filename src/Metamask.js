import React, { useState,useEffect } from "react";
import abi from "./abi.json";
import * as dotenv from 'dotenv'; 
dotenv.config()
const ethers = require("ethers");

function Metamask() {


  

  const contract_address = process.env.contract_address;
  const [errMsg, seterrMsg] = useState("");
  const [defaultAccount, setdefaultAccount] = useState("null");
  const [provider, setprovider] = useState(null);
  const [connectBtn, setconnectBtn] = useState("Connect Wallet");
  const [name, setname] = useState("");
  const [To, setTo] = useState("")
  const [Amount, setAmount] = useState(0)


  const [signer, setsigner] = useState(null);
  const [contract, setcontract] = useState(null);


 
  function handleBtn() {
    console.log("hello");
  }
  const accountHandler = (setAccount) => {
    setdefaultAccount(setAccount);
    send()
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
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setprovider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setsigner(tempSigner);

    const tempContract = new ethers.Contract(contract_address, abi, tempSigner);
    setcontract(tempContract);


  };

  const getName=async()=>{
    let name=await contract.name()
    setname(name)

  }
  const transfer=async()=>{
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tx=await contract.connect(tempSigner).transfer(To,Amount)
    console.log(tx);

  }

  const handleTransfer=async(e)=>{
    e.preventDefault();
    setTo(e.target.to.value)
    console.log(To);
    setAmount(e.target.amount.value)
    console.log(Amount);
    console.log("transfer calling.....");
    transfer()
   
   

  }

  return (
    <>
      <center>
        <h4>{}</h4>
        <h3>Interact with contract</h3>
        <button onClick={ConnectWalletHandler}>{connectBtn}</button>
        <h4>Account Address:{defaultAccount}</h4>
        <button onClick={getName}>Get Name</button>
        <h4>Get Token Name:{name}</h4>

        <form onSubmit={handleTransfer} >
            <input id="to" placeholder="to"/>
            <input id="amount" placeholder="amount"/>
            <button type={"submit"}>Transfer</button>
        </form>
      </center>
    </>
  );
}

export default Metamask;
