import React, {useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import emblem from './images/emblem.svg';
import Web3 from 'web3';
import detectEtherumProvider from '@metamask/detect-provider';
import {loadContract} from './utils/loadContract';
import SuperAdmin from './components/SuperAdmin';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';


function App() {

  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null);
  let navigate = useNavigate();

  const connectToEthereum = async () => {
    const provider = await detectEtherumProvider();
    const fromAccount = process.env.SUPER_ADMIN; 
    if (provider) {
      try {
        provider.request({ method: 'eth_requestAccounts' });
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract: await loadContract('Registry', provider, fromAccount),
        });
        console.log("IF block successful");
      } catch (error) {
        console.error('Error loading contract:', error);
      }
    } else {
      console.error('Please install MetaMask!');
    }
  }
 
 
useEffect(() => {
    const getAccount = async () =>{
      const {web3, contract} = web3Api;  
      const accounts = await web3.eth.getAccounts();  // returns the list of accounts you can access.
      console.log("PRINTING ACCOUNTS");
      console.log(accounts);

      setAccount(accounts[0]);

    }
    web3Api.web3 && getAccount();
}, [web3Api]);
 
useEffect(() =>{
    
    const checkAccount = async () =>{
        const {web3, contract} = web3Api; 
        const superAdmin = await contract.superAdmin();
        console.log("printing superadmin", superAdmin);
        console.log("PRINTING ACCOUNT");
        console.log(account);
        if(account == superAdmin){
            navigate('/superadmin');
        }
        else if(await contract.isAdmin({from: account})){
            navigate('/admin');
        }
        else{
            navigate('./userprofile')
        }
        
    }
    account && checkAccount();
}, [web3Api, account])


  return (
     <div className='flex min-h-screen w-screen flex-col bg-richblack-900 font-inter'>
      <Routes>
      <Route path='/superadmin' element={<SuperAdmin myWeb3Api={web3Api} account={account} />} />
      <Route path='/admin/*' element={<Admin myWeb3Api={web3Api} account={account} />} />
      <Route path='/userprofile/*' element={<UserProfile myWeb3Api={web3Api} account={account} />} />
      <Route path='/' element= 
      {
        <div className="  flex mx-auto h-full items-center justify-center mt-48">
          <div className='p-6 bg-white rounded-lg shadow-lg'>
            <div className='text-center'>
              <img src={emblem} alt="emblem" className="emblem w-16 h-16 mx-auto mb-4 rounded-sm" />
              <h1 className="text-3xl font-bold text-richblack-900">Decentralized Land Registration</h1>
            </div>

            <p className='text-center text-richblack-800 mt-4'>
              Welcome to online Land Registration and transfer of entitlement
            </p>

            <button
              className=' flex mx-auto bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-6'
              onClick={connectToEthereum}
            >
              Connect to Ethereum
            </button>
          </div>
  </div>

}/>
</Routes>
     </div>
  );
}

export default App;
