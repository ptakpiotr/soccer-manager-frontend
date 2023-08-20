import { ChangeEvent, useState } from "react";
import LogoDesignerPanel from "./LogoDesignerPanel";
import { ISoccerLogo, SoccerShirtType } from "../../Types";
import { SelectChangeEvent } from "@mui/material";
import "./soccer_logo_designer.scss";
import Globals from "../../Globals";

const defaultLogoSetup: ISoccerLogo = {
  mainColor: "#0000FF",
  secondaryColor: "#FF0000",
  type: SoccerShirtType.STRIPES_SIMPLE,
  name: "",
  iconId: "gi-chicken",
};

function SoccerLogoDesigner() {
  const [logoSetup, setLogoSetup] = useState<ISoccerLogo>(defaultLogoSetup);

  const handleMainColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoSetup((prev) => ({
      ...prev,
      mainColor: e.target.value,
    }));
  };

  const handleSecondaryColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoSetup((prev) => ({
      ...prev,
      secondaryColor: e.target.value,
    }));
  };

  const getColorsPattern = () => {
    const { mainColor, secondaryColor, type } = logoSetup;

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
    setLogoSetup((prev) => ({
      ...prev,
      type: e.target.value as SoccerShirtType,
    }));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogoSetup((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleChosenIconIdChange = (iconId: string) => {
    setLogoSetup((prev) => ({
      ...prev,
      iconId,
    }));
  };

  const handleAccept = () => {
    //TODO: implement this
  };

  const handleRestore = () => {
    setLogoSetup({ ...defaultLogoSetup });
  };

  const chosenLogo = Globals.availableLogoIcons.find(
    (i) => i.id === logoSetup.iconId
  )?.icon;

  return (
    <div className="soccer-logo-obj">
      <div className="soccer-logo-designer">
        <div
          className="soccer-logo-bg"
          style={{
            ...getColorsPattern(),
          }}
        >
          <div className="soccer-logo-name">{logoSetup.name}</div>
          <div className="soccer-logo-icon">
            {chosenLogo ? (
              chosenLogo({
                fontSize: "3rem",
                color: "white",
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <LogoDesignerPanel
        logoSetup={logoSetup}
        handleMainColorChange={handleMainColorChange}
        handleSecondaryColorChange={handleSecondaryColorChange}
        handleShirtTypeChange={handleShirtTypeChange}
        handleAccept={handleAccept}
        handleRestore={handleRestore}
        handleNameChange={handleNameChange}
        handleChosenIconIdChange={handleChosenIconIdChange}
      />
    </div>
  );
}

export default SoccerLogoDesigner;
