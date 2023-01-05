import React, { useState } from "react";
import { CustomeButton, CustomeInput, PageHOC } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAllert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  if (walletAddress) console.log(walletAddress);
  if (contract) console.log(contract);

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);
        setShowAllert({
          status: true,
          type: "info",
          message: `${playerName} is being summond!`,
        });
      }
    } catch (err) {
      setShowAllert({
        status: true,
        type: "failure",
        message: "something went",
      });
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col">
      <CustomeInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomeButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods
    <br />a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br />
    the ultimate web3 Battle Card Game
  </>
);
