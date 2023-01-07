import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { PageHOC, CustomeButton } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  const navigate = useNavigate();
  const { contract, gameData, setShowAllert, setBattleName, walletAddress } =
    useGlobalContext();

  const handleClick = async (battleName) => {
    setBattleName(battleName);
    try {
      await contract.joinBattle(battleName);
      setShowAllert({
        status: true,
        type: "success",
        message: `Joining ${battleName}`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2 className={styles.joinBattleTitle}>Availible Battles:</h2>

      <div className={styles.joinContainer}>
        {gameData?.pendingBattles.length > 0 ? (
          gameData.pendingBattles
            .filter((battle) => !battle.players.includes(walletAddress))
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>
                  {index + 1}. {battle.name}
                </p>
                <CustomeButton
                  title={"Join"}
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>
            Relaod the page to see new battles
          </p>
        )}
      </div>

      <p className={styles.infoText} onClick={() => navigate("/create-battle")}>
        Or create a new Battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br />a Battle
  </>,
  <>Join already existing battles</>
);
