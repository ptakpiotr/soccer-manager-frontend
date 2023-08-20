import RegisterView from "../components/Account/RegisterView";
import SoccerKitDesinger from "../components/misc/SoccerKitDesinger";
import SoccerLogoDesigner from "../components/misc/SoccerLogoDesigner";

function Register() {
  return (
    <main>
      <div className="register-page-container">
        <div className="first-row-container">
          <div className="register-view-container">
            <RegisterView />
          </div>
          <div className="soccer-logo-designer-container">
            <SoccerLogoDesigner />
          </div>
        </div>
        <div className="second-row-container">
          <div className="soccer-kit-designer-container">
            <SoccerKitDesinger />
          </div>
          <div className="soccer-kit-designer-container">
            <SoccerKitDesinger />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
