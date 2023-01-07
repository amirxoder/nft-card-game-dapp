import { Contract, ethers } from "ethers";
import { ABI } from "../contract";

const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter); // not have muliple listener for the same time

  provider.on(eventFilter, (logs) => {
    const parsLogs = new ethers.utils.Interface(ABI).parseLog(logs);
    cb(parsLogs);
  });
};

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAllert,
  setUpdataGamedata,
}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();

  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log(`New Player Created ${args}`);

    if (walletAddress === args.owner) {
      setShowAllert({
        status: true,
        type: "success",
        message: "Player has been successfully registered!",
      });
    }
  });

  const NewBattleEventFilter = contract.filters.NewBattle();

  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log(`New Battle Stated! ${args} ${walletAddress}`);

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdataGamedata((prevUpdataGameData) => prevUpdataGameData + 1);
  });
};
