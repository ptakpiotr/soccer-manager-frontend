import Globals from "../../Globals";
import { ISoccerLogo, SoccerShirtType } from "../../Types";

interface IProps {
  logoSetup: ISoccerLogo;
  additionalClasses?: string[];
}

function SoccerLogoDisplay({ logoSetup, additionalClasses }: IProps) {
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
  const chosenLogo = Globals.availableLogoIcons.find(
    (i) => i.id === logoSetup.iconId
  )?.icon;
  return (
    <div className="soccer-logo-designer">
      <div
        className={`soccer-logo-bg ${
          additionalClasses ? additionalClasses.join(" ") : ""
        }`}
        style={{
          ...getColorsPattern(),
        }}
      >
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
        <div className="soccer-logo-name">{logoSetup.name}</div>
      </div>
    </div>
  );
}

export default SoccerLogoDisplay;
