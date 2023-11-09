import { ChangeEvent } from "react";
import LogoDesignerPanel from "./LogoDesignerPanel";
import { ISoccerLogo, SoccerShirtType } from "../../Types";
import { SelectChangeEvent } from "@mui/material";
import SoccerLogoDisplay from "./SoccerLogoDisplay";
import "./soccer_logo_designer.scss";
import { defaultLogoSetup } from "../../Globals";

interface IProps {
  logoSetup: ISoccerLogo;
  setLogoSetup: React.Dispatch<React.SetStateAction<ISoccerLogo>>;
}

function SoccerLogoDesigner({ logoSetup, setLogoSetup }: IProps) {
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

  const handleAccept = () => {};

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
