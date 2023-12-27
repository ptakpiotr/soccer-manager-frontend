import { useState } from "react";
import { ISoccerLogo, ISoccerShirt } from "../Types";
import RegisterView from "../components/Account/RegisterView";
import SoccerKitDesinger from "../components/misc/SoccerKitDesinger";
import SoccerLogoDesigner from "../components/misc/SoccerLogoDesigner";
import { defaultKitSetup, defaultLogoSetup } from "../Globals";

function Register() {
  const [errors, setErrors] = useState<string>("");
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [logoSetup, setLogoSetup] = useState<ISoccerLogo>(defaultLogoSetup);
  const [firstKitSetup, setFirstKitSetup] =
    useState<ISoccerShirt>(defaultKitSetup);
  const [secondKitSetup, setSecondKitSetup] =
    useState<ISoccerShirt>(defaultKitSetup);

  return (
    <main>
      <div className="register-page-container">
        <div className="first-row-container">
          <div className="register-view-container">
            <RegisterView
              errors={errors}
              setErrors={setErrors}
              isAllValid={isAllValid}
              setIsAllValid={setIsAllValid}
              setups={{ logoSetup, firstKitSetup, secondKitSetup }}
            />
          </div>
          <div className="soccer-logo-designer-container">
            <SoccerLogoDesigner
              logoSetup={logoSetup}
              setLogoSetup={setLogoSetup}
            />
          </div>
        </div>
        <div className="second-row-container">
          <div className="soccer-kit-designer-container">
            <SoccerKitDesinger
              kitSetup={firstKitSetup}
              setKitSetup={setFirstKitSetup}
            />
          </div>
          <div className="soccer-kit-designer-container">
            <SoccerKitDesinger
              kitSetup={secondKitSetup}
              setKitSetup={setSecondKitSetup}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
