import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import MY_SERVICES from "../services/index";

function Ledger() {
  const { user } = useContext(Context);
  const [concepts, setConcepts] = useState([]);

  useEffect(() => {
    async function fetchConcepts() {}
    fetchConcepts();
    return () => {
      return null;
    };
  }, []);
  return user ? <div></div> : <Redirect to="/login"></Redirect>;
}

export default Ledger;
