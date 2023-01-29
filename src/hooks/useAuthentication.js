import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const useAuthentication = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [agentId, setAgentId] = useState("");
  const [websitelink, setWebsitelink] = useState("");
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
      "www.",
      ""
    )}`;
    // let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=demo.flyfarint.com`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWebsitelink(data?.websitelink);
        setAgentId(data?.agentId);
      });
  }, []);

  //  sub Agent login
  const loginUser = (loginData, location, navigate) => {
    setIsLoading(false);
    secureLocalStorage.setItem("state", loginData);
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/Auth/login.php`;
    let body = JSON.stringify({
      email: loginData.email.trim(),
      password: loginData.password.trim(),
      websitelink: websitelink.trim(),
      agentId,
    });
    // console.log(body);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Sub Agent", data);
        setIsLoading(true);
        if (data.status === "success") {
          secureLocalStorage.setItem("user-info", data);
          const destination =
            location?.state?.from || "/userdashboardhome/mystaff";
          navigate(destination);
        } else {
          secureLocalStorage.removeItem("user-info");
          // console.log(data.message);
          setError(data.message);
        }
      })
      .finally(() => setIsLoading(true));
  };

  // Admin login
  const adminLogin = (loginData, location, navigate) => {
    setIsLoading(false);
    secureLocalStorage.setItem("state", loginData);
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/Auth/adminLogin.php`;
    let body = JSON.stringify({
      email: loginData.email.trim(),
      password: loginData.password.trim(),
      websitelink: websitelink.trim(),
    });

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Admin", data);
        setIsLoading(true);
        if (data.status === "success") {
          secureLocalStorage.setItem("admin-info", data);
          const destination = location?.state?.from || "/admin/dashboard";
          navigate(destination);
        } else {
          secureLocalStorage.removeItem("admin-info");
          // console.log(data.message);
          setError(data.message);
        }
      })
      .finally(() => setIsLoading(true));
  };

  const logout = () => {
    secureLocalStorage.removeItem("user-info");
    secureLocalStorage.removeItem("admin-info");
    secureLocalStorage.removeItem("commissionData");
    secureLocalStorage.removeItem("state");
    navigate("/");
  };

  return {
    adminLogin,
    loginUser,
    logout,
    isLoading,
    error,
  };
};

export default useAuthentication;
