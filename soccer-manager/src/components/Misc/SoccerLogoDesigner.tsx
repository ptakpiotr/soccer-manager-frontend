import { ChangeEvent, useState } from "react";
import LogoDesignerPanel from "./LogoDesignerPanel";
import { ISoccerLogo, SoccerShirtType } from "../../Types";
import { SelectChangeEvent } from "@mui/material";
import "./soccer_logo_designer.scss";
import SoccerLogoDisplay from "./SoccerLogoDisplay";

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

  return (
    <div className="soccer-logo-obj">
      <SoccerLogoDisplay logoSetup={logoSetup} />

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
