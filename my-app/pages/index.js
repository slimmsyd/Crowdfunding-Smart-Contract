import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState, useEffect, useRef} from 'react';
//Import your contracts 
import { FUND_ME_ADDRESS, FUND_ME_ABI } from '../constants'
import {ethers, providers, utils, BigNumber, Contract} from 'ethers';
import Web3Modal from 'web3modal';



export default function Home() {
  const [isLoading, setLoading]  = useState(false); 
  const [isConnected, setConnected] = useState(false); 
  const [address, setAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("")
  const [contractAddress,setContractAddress] = useState("") 
  const [contractBalance, setContractBalance] = useState("") 
  const [fundAmount, setFundAmount ]= useState("")
  const web3modal = useRef();

  useEffect(() =>  { 
    if(!isConnected) { 
      web3modal.current = new Web3Modal({
        network: "rinkeby", 
        providerOptions: {},
        disableInjectedProvider: false
      })
    }
    //return the contract balance
    getContractBalanceAndAddress()

  })

function splitString(string) { 
  let firstHalf = string.substring(0,4);
  let lastHalf = string.substring(38, 42);
  const returnedString = firstHalf + "..." +lastHalf
  return returnedString;

}
const getProviderOrSigner = async(needSigner = false) =>  { 
  const provider = await web3modal.current.connect(); 
  const web3provider = new providers.Web3Provider(provider); 

  //get access of signer(account) 
  const signer = web3provider.getSigner(); 
  //get hold of address
  const accountAddress = await signer.getAddress(); 
  const subStringAddress = splitString(accountAddress);
  setAddress(subStringAddress);

  const {chainId} = await web3provider.getNetwork(); 

  if(chainId !==4) { 
    window.alert("You are connectd to the network crypotnites")
  }
  if(needSigner) { 
    const signer = web3provider.getSigner();
    return signer 
  }

  return web3provider;

    
}

const connect = async() => { 
  try { 
    await getProviderOrSigner();
    setConnected(true);
  }catch(e) { 
    console.error(e)
  }

};



const fund = async(ethAmount) => { 
  try { 
    ethAmount = fundAmount
    const signer = await getProviderOrSigner(true); 
    const fundContract  = new Contract(
      FUND_ME_ADDRESS,
      FUND_ME_ABI,
      signer
    );
    const tx = await  fundContract.fund( { 
      value: ethers.utils.parseEther(ethAmount)
    })
    setLoading(true);
    await tx.wait();
    setLoading(false); 

  }catch(e) { 
    console.error(e)
  }

}

const withdraw = async() => { 
  try { 
    const signer = await getProviderOrSigner(true);
    const fundMeContract = new Contract(
      FUND_ME_ADDRESS,
      FUND_ME_ABI,
      signer
    );
      const tx = fundMeContract.cheaperWithdraw(); 
      setLoading(true);
      await tx.wait(); 
      setLoading(false);
  }catch(e) { 
    console.error(e)
  }

};

const getContractBalanceAndAddress = async() =>  { 
  try { 
    const provider = await getProviderOrSigner(); 
    const fundMeContract = new Contract( 
      FUND_ME_ADDRESS,
      FUND_ME_ABI,
      provider
    );
    let balance = await provider.getBalance(FUND_ME_ADDRESS);
    //format balance 
    balance = ethers.utils.formatEther(balance);
    setContractBalance(balance);
    setContractAddress(FUND_ME_ADDRESS)

  }catch(e) { 
    console.error(e)
  }
}


const renderLoading = () => { 
  if(isLoading)  {
    return <button>Loading...</button>
  }
}



  return (
    <div className = {styles.main}>
      <header>Crowd Funding Contract</header>
      <div className  = {styles.container}> 
        <div>
          Contract Adresss: {contractAddress}
        </div>
        {contractBalance}
        <div>
          Your Address: {address}
        </div>
     
        <div className = {styles.buttonContainer}>
          <label >
            <input
              id = "fund"
              type = "number"
              min = "0.01"
              step = "0.01"
              placeholder='How Much Eth?'
              onChange={(e) => setFundAmount(e.target.value || "0") }
            >
            </input>
            {renderLoading()}
          <button onClick={fund} className = {styles.btn}>Fund </button>
          </label>

          <button onClick = {connect} className = {styles.btn}>Connect </button>
          <button onClick = {withdraw} className = {styles.btn}>withdraw </button>

        </div>
      
      </div>


    </div>
  )
}
