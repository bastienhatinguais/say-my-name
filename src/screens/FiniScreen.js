import React, { useEffect } from "react";
import { gameManager } from "../gm";

export default function FiniScreen() {
  useEffect(() => {
    return () => {
      console.log(gameManager);
      gameManager.quitter();
    };
  }, []);

  return <h2>Félicitation vous avez un score de : {gameManager.score}</h2>;
}
