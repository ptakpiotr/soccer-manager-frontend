import { ChangeEvent } from "react";
import "./soccer_kit_designer.scss";
import { ISoccerShirt, SoccerShirtType } from "../../Types";
import KitDesignerPanel from "./KitDesignerPanel";
import { SelectChangeEvent } from "@mui/material";
import SoccerKitDisplay from "./SoccerKitDisplay";
import { defaultKitSetup } from "../../Globals";

interface IProps {
  kitSetup: ISoccerShirt;
  setKitSetup: React.Dispatch<React.SetStateAction<ISoccerShirt>>;
}

//inspired with: https://codepen.io/richhastings/pen/LbZrxo
function SoccerKitDesinger({ kitSetup, setKitSetup }: IProps) {
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
            handleRestore={handleRestore}
          />
        }
      </div>
    </div>
  );
}

export default SoccerKitDesinger;
