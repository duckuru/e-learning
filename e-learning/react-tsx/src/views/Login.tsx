import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setError] = useState(null);

  const { setUser, setToken } = useStateContext();
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // console.log(payload);
    setError(null)
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors){
            setError(response.data.errors);
          }else{
            setError({
              email: [response.data.message]
            })
          }
        }
      });
  };

  return (
    <>
      <h1 className="title">Login</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p> // Accessing the first error message
          ))}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button className="btn btn-block">Login</button>
        <p className="message">
          Not Registered?
          <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </>
  );
}
