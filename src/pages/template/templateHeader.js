import {React,useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "./templateHeader.css";
import state from "../../state.js"
import { Auth, getAuth, signOut } from "firebase/auth";

const TemplateHeader = () => {

  const auth = getAuth();
  const [showButton,setshowButton] = useState(auth.currentUser);
  const navigate = useNavigate();
  const clickHandler = () => {
    signOut(auth).then(() => {
      setshowButton(false);
      navigate("/");
      }).catch((error) => {
    });
  }
  useEffect(() => {}, [showButton]);

  return (
    <div>
      <div className="headerglobal">  
        <h1>Institución Educativa BOTICOL</h1>
        <nav>
        <ul>
{!auth.currentUser ? null : <Link to="/welcome">Inicio</Link>}
          </ul>
          {!auth.currentUser ?   null :<button onClick={clickHandler}>Cerrar sesión</button>}
        </nav>
      </div>
    </div>
  );
};

export default TemplateHeader;
