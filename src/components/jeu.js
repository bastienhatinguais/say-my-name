import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { gm } from "../gm";

export default function Game() {
  return (
    <Button
      onClick={() => {
        gm.commencer();
      }}
    >
      Commencer
    </Button>
  );
}
