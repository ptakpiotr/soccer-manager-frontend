import { ISoccerShirt, SoccerShirtType } from "../../Types";

interface IProps {
  kitSetup: ISoccerShirt;
  customStylesClassName?: string;
}

function SoccerKitDisplay({ kitSetup, customStylesClassName }: IProps) {
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

  return (
    <div className={customStylesClassName}>
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
    </div>
  );
}

export default SoccerKitDisplay;
