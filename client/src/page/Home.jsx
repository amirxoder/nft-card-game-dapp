import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomeButton, CustomeInput, PageHOC } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAllert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate("/create-battle");
    };

    if (contract) checkForPlayerToken();
  }, []);

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
