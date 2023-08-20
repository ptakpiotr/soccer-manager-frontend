import { ChangeEvent, useState } from "react";
import "./soccer_kit_designer.scss";
import { ISoccerShirt, SoccerShirtType } from "../../Types";
import KitDesignerPanel from "./KitDesignerPanel";
import { SelectChangeEvent } from "@mui/material";

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

  const getKitPattern = () => {
    const { mainColor, secondaryColor, type } = kitSetup;

    switch (type) {
      case SoccerShirtType.STRIPES_SIMPLE:
        return {
          background: `linear-gradient(90deg, ${mainColor} 50%, ${secondaryColor} 50%)`,
        };
      case SoccerShirtType.STRIPES_45:
        return {
          background: `linear-gradient(45deg, ${mainColor} 50%, ${secondaryColor} 50%)`,
        };
      case SoccerShirtType.STRIPES_180:
        return {
          background: `linear-gradient(180deg, ${mainColor} 50%, ${secondaryColor} 50%)`,
        };
      case SoccerShirtType.CIRCLE:
        return {
          background: `radial-gradient(circle, ${mainColor} 50%, ${secondaryColor} 50%)`,
        };
      case SoccerShirtType.PLAIN:
      default:
        return {
          background: mainColor,
        };
    }
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
        <div className="soccer-kit-shirt">
          <div className="soccer-kit-triangle"></div>
          <div
            className="soccer-kit-plain"
            style={{
              ...getKitPattern(),
            }}
          >
            <div
              className="soccer-kit-sleeve"
              style={{
                background: kitSetup.mainColor,
              }}
            ></div>
            <div
              className="soccer-kit-sleeve"
              style={{
                background: kitSetup.mainColor,
              }}
            ></div>
          </div>
        </div>
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
