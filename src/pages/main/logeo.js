import state from "../../state.js";
import google from "../../resources/images/google.png";
import auth from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useState } from "react";
import SweetAlert from "sweetalert";
import { Navigate,useNavigate } from "react-router-dom";


export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Registro = async () => {
    state.isAdmin = false;
    
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        state.islogged = true;
        SweetAlert({
          title: "Registrado con éxito",
          text: "Cuenta registrada, ahora puedes iniciar",
          icon: "success",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          SweetAlert({
            title: "Error al registrarse",
            text: "Contraseña insegura, debe ser de al menos 6 caracteres.",
            icon: "error",
          });
        }
        if (errorCode === "auth/email-already-in-use") {
          SweetAlert({
            title: "Error al registrarse",
            text: "El correo ya se encuentra registrado.",
            icon: "error",
          });
        }
      });
  };

  const Ingreso = async() => {
    setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        state.islogged = true;
        state.isAdmin = true;
        
        SweetAlert({
          title: "Inicio de sesión",
          text: "Sesión iniciada",
          icon: "success",
        });
        navigate('/welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        //console.log(errorCode);
        if (errorCode === "auth/wrong-password") {
          SweetAlert({
            title: "Error al iniciar sesión",
            text: "Correo y/o contraseña incorrecta.",
            icon: "error",
          });
        }
        if (errorCode === "auth/user-not-found") {
          SweetAlert({
            title: "Error al iniciar sesión",
            text: "Correo no registrado.",
            icon: "error",
          });
        }
      });

  };

  const ingresoGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        state.isAdmin = false;
        navigate('/welcome');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });

  };

  return (
    <div>
      <h1>Bienvenido, por favor, inicie sesión.</h1>
    <section className="login">
      <h3>Iniciar sesión</h3>
      <div className="contenedor contenidos-log">
        <input
          className="controll"
          type="email"
          name="email"
          placeholder="Usuario"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="controll"
          type="password"
          name="password"
          minLength="8"
          placeholder="Contraseña"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          onClick={Ingreso}
          className="boton"
          type="submit"
          name=""
          value="Iniciar Sesión"
        />
        <button title="butonGoogle" className="correo" onClick={ingresoGoogle}>
          <img src={google} alt="" height="18" weight="18" />
        </button>
      </div>
    </section>
    </div>
  );
};
