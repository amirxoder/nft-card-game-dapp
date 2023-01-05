import React from "react";
import { PageHOC } from "../components";
import { useGlobalContext } from "../context";

const CreateBattle = () => {
  const {} = useGlobalContext();

  return <h1>{}</h1>;
};

export default PageHOC(
  CreateBattle,
  <>
    Create
    <br />a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
