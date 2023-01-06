import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { CustomeButton } from "./";
import { player01, player02 } from "../assets";
import styles from "../styles";

const GameLoad = () => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomeButton
          title={"Choose Battle Ground"}
          handleClick={() => navigate("/battle-ground")}
          restStyles="mt-6"
        />
      </div>

      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          Waiting for a <br />
          worthy opponent...
        </h1>
        <p className={styles.gameLoadText}>
          Protip: while you are waiting, choose your preferred battle ground
        </p>

        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player01} className={styles.playerImg} />
            <p className={styles.gameLoadPlayerText}>
              {walletAddress.slice(0, 30)}
            </p>
          </div>

          <h2 className={styles.gameLoadVS}>VS</h2>

          <div className={`${styles.flexCenter} flex-col`}>
            <img src={player02} className={styles.playerImg} />
            <p className={styles.gameLoadPlayerText}>????????????????????????</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
