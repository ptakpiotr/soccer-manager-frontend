import { ChangeEvent, useState } from "react";
import "./soccer_kit_designer.scss";
import { ISoccerShirt, SoccerShirtType } from "../../Types";
import KitDesignerPanel from "./KitDesignerPanel";
import { SelectChangeEvent } from "@mui/material";
import SoccerKitDisplay from "./SoccerKitDisplay";

const defaultKitSetup = {
  mainColor: "#0000FF",
  secondaryColor: "#FF0000",
  type: SoccerShirtType.STRIPES_SIMPLE,
};

//inspired with: https://codepen.io/richhastings/pen/LbZrxo
function SoccerKitDesinger() {
  const [kitSetup, setKitSetup] = useState<ISoccerShirt>(defaultKitSetup);

  const handleMainColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKitSetup((prev) => ({
      ...prev,
      mainColor: e.target.value,
    }));
  };

  const handleSecondaryColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKitSetup((prev) => ({
      ...prev,
      secondaryColor: e.target.value,
    }));
  };

  const handleShirtTypeChange = (e: SelectChangeEvent<SoccerShirtType>) => {
    setKitSetup((prev) => ({
      ...prev,
      type: e.target.value as SoccerShirtType,
    }));
  };

  const handleAccept = () => {
    //TODO: implement this
  };

  const handleRestore = () => {
    setKitSetup({ ...defaultKitSetup });
  };

  return (
    <div className="soccer-kit-obj">
      <div className="soccer-kit-creator">
        <SoccerKitDisplay kitSetup={kitSetup} />
        {
          <KitDesignerPanel
            kitSetup={kitSetup}
            handleMainColorChange={handleMainColorChange}
            handleSecondaryColorChange={handleSecondaryColorChange}
            handleShirtTypeChange={handleShirtTypeChange}
            handleAccept={handleAccept}
            handleRestore={handleRestore}
          />
        }
      </div>
    </div>
  );
}

export default SoccerKitDesinger;
