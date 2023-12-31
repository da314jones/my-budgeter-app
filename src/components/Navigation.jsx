import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import "./Navigation.css";

export default function Navigation({
  transactions,
  setFilteredTransactions,
  user,
  setUser,
}) {
  const navigate = useNavigate();

  const handleManageTransactions = () => {
    if (user.userName) {
      navigate("/transactions");
    }
  };

  return (
    <nav className="navbar-container">
      <div>
        <Link to="/">
      <img src="/budgetLogo.png" alt="logo" />
                </Link>
      </div>
      <div className="navbar-navlinks">

      <span onClick={handleManageTransactions}>Manage Transactions</span>
      {user.userName ? (
        <Link to="/transactions/new">Add Transaction</Link>
      ) : null}
      <Link to="/enroll-now">
      <button className="enroll">Get Balanced</button>
      </Link>
      </div>
    </nav>
  );
}