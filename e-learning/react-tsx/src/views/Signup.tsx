import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";

export default function Signup (){
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setError] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    // console.log(payload);

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        console.log(err);
        const response = err.response;
        if (response && response.status === 422) {
          // console.log(response.data.errors);
          setError(response.data.errors);
        }
      });
  };

  return (
    <>
      <h1 className="title">Sign up</h1>
      {errors && 
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p> // Accessing the first error message
          ))}
        </div>
      }

      <form onSubmit={onSubmit}>
        <input placeholder="Full name" type="text" ref={nameRef} />
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <input
          placeholder="Password Confirmation"
          type="password"
          ref={passwordConfirmationRef}
        />
        <button className="btn btn-block">Signup</button>
        <p className="message">
          Already Registered?
          <Link to="/login">Sign in</Link>
        </p>
      </form>
    </>
  );
};

