import React, { useState, useEffect } from "react";
import { PageHOC, CustomeButton, CustomeInput, GameLoad } from "../components";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";
import styles from "../styles";

const CreateBattle = () => {
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();
  const { battleName, setBattleName, contract, gameData } = useGlobalContext();
  console.log(gameData)

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomeInput
          label={"Battle"}
          placeholder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <CustomeButton
          title={"Create Battle"}
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
        Or join already existing battles
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create
    <br />a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
