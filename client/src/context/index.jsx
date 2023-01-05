import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";

// contract ABI
import { ABI, ADDRESS } from "../contract";

// this package allow us to intract with contract
import { ethers } from "ethers";

import Web3Modal from "web3modal";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAllert, setShowAllert] = useState({
    status: false,
    type: "info",
    message: "",
  });

  console.log(contract);

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_requestAccounts",
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    // updateCurrentWalletAddress();

    window?.ethereum?.on("accountsChanged", updateCurrentWalletAddress);
  }, []);

  // set the smart contract to the state

  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
      console.log(
        `smart contract sucessfully set to state ${(contract, provider)}`
      );
    };

    setSmartContractAndProvider();
  }, []);

  useEffect(() => {
    if (showAllert?.status) {
      const timer = setTimeout(() => {
        setShowAllert({
          status: false,
          type: "info",
          message: "",
        });
      }, [5000]);
      return () => clearTimeout(timer);
    }
  }, [showAllert]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        showAllert,
        setShowAllert,
        updateCurrentWalletAddress
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
