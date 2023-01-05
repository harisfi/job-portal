import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getProfile } from "../services";

export default function ProtectedRoutes() {
  const [validAcc, setValidAcc] = useState(false);
  const [loop, setLoop] = useState();
  const navigate = useNavigate();

  const redirectIfLoggedIn = async () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const res = await getProfile();
        setValidAcc(true);
      } catch (error) {
        localStorage.removeItem("access_token");
        setValidAcc(false);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    setLoop(
      setInterval(() => {
        redirectIfLoggedIn();
      }, 3000)
    );

    return () => {
      clearInterval(loop);
    };
  }, []);

  return validAcc ? <Outlet /> : null;
}
