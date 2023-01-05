import React from "react";
import { useNavigate } from "react-router-dom";
import { logo, heroImg } from "../assets";
import styles from "../styles";
import { useGlobalContext } from "../context";
import { Alert } from "./";

const PageHOC = (Component, title, description) => () => {
  const { showAlert, updateCurrentWalletAddress, walletAddress } =
    useGlobalContext();
  const navigate = useNavigate();

  let newWalletAddress;
  if (walletAddress) {
    newWalletAddress = `${walletAddress.slice(0, 4)}...${walletAddress.slice(
      -3
    )}`;
  }

  return (
    <div className={styles.hocContainer}>
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <div className={styles.hocContentBox}>
        <img
          src={logo}
          alt="logo"
          className={styles.hocLogo}
          onClick={() => navigate("/")}
        />
        {walletAddress ? (
          <p className="absolute right-10 bg-blue-600 py-1 px-4 rounded-sm text-white capitalize font-bold ">
            Connected to: {newWalletAddress}
          </p>
        ) : (
          <button
            type="button"
            onClick={() => updateCurrentWalletAddress()}
            className="absolute right-10 bg-red-700 py-1 px-4 rounded-sm text-white capitalize font-bold "
          >
            Not Wallet Connected!
          </button>
        )}
        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>
          <p className={`${styles.normalText} mt-10`}>{description}</p>
          <Component />
        </div>

        <p className={styles.footerText}>
          Made with 💜 by{" "}
          <span className="text-purple-500 font-bold">AmirCodder</span>
        </p>
      </div>

      <div className="flex flex-1">
        <img
          src={heroImg}
          alt="hero-image"
          className="w-full xl:w-full object-cover"
        />
      </div>
    </div>
  );
};

export default PageHOC;
