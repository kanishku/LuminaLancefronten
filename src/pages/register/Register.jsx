import React, { useState } from "react";
import "./Register.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = file ? await upload(file) : "";
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="file">Profile Picture</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="USA"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="seller">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" id="seller" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          {user.isSeller && (
            <>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="+1 234 567 89"
                onChange={handleChange}
              />
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                name="desc"
                placeholder="A short description of yourself"
                rows="4"
                onChange={handleChange}
              ></textarea>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
