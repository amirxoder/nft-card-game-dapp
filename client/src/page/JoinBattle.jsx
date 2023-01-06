import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { PageHOC, CustomeButton } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className={styles.joinBattleTitle}>Availible Battles:</h2>
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
