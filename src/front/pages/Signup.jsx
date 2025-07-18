// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Signup = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoData, setInfoData] = useState();
  const [infoMe, setInfoMe] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    const data = {
      "email": email,
      "password": password
    }

    try {
      const response = await fetch('https://orange-space-guacamole-pjwj9wpp6x6v374wg-3001.app.github.dev/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        setErrorMessage(dataResponse.msg || "Error al iniciar sesión");
        return;
      }

      sessionStorage.setItem("access_token", dataResponse.access_token)
      setErrorMessage(""); // Limpiar error previo
      setInfoData(dataResponse)

      window.location.href = "/private";
      // navigate("/private");

    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="container vh-100">
      <div className="row h-50 mt-5 justify-content-center align-items-center" >
        <div className="col-4 border rounded shadow p-4 mb-5 bg-white">
          <span className="mb-3 mt-2 fs-3 d-flex justify-content-center">Welcome</span>
          <span className="mb-5 text-secondary fs-6">Enter your email and password below to create your account</span>
          <form>
            <div className="mb-3 mt-4">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" />
            </div>
            {errorMessage && ( // Mensaje de alerta por si el usuario quiere registrarse con un email ya existente en la base de datos. 
              <div className="alert alert-danger text-center mt-3" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="d-grid">
              <button type="button" onClick={handleSignup} className="btn btn-warning w-100">Sign in</button>
            </div>
            <span className="mt-4 d-flex justify-content-center">
              <span>You already have an account?&nbsp;</span>
              <Link to="/login" className="text-decoration-none text-warning">Sign in</Link>
            </span>
          </form>
        </div>
      </div>
    </div >
  );
};