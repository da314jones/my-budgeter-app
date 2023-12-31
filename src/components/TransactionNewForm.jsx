import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionNewForm.css";
const API = import.meta.env.VITE_BASE_URL;

export default function TransactionNewForm() {
  const [newTransaction, setNewTransaction] = useState({
    category: "",
    type: "",
    description: "",
    amount: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.id]: e.target.value });
  };

  const createTransaction = () => {
    const httpOptions = {
      method: "POST",
      body: JSON.stringify(newTransaction),
      headers: {
        "Content-type": "application/json",
      },
    };
    fetch(`${API}/transactions`, httpOptions)
      .then((res) => res.json())
      .then((createdTransaction) => {
        alert(
          `Transaction labeled ${newTransaction.category} was added to the database!`
        );
        navigate(`/transactions/${createdTransaction.id}`);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTransaction();
  };

  return (
    <div className="detail-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="new-form-body">
        <div className="form-input-container">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={newTransaction.category}
            onChange={handleTextChange}
          />
        </div>

        <div className="new-type-input form-input-container">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={newTransaction.type}
            onChange={handleTextChange}
          >
            <option value="Deposit">Deposit</option>
            <option value="Payment">Payment</option>
            <option value="Invoice">Invoice</option>
            <option value="Withdrawal">Withdrawal</option>
          </select>
        </div>

        <div className="form-input-container">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newTransaction.description}
            onChange={handleTextChange}
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            value={newTransaction.amount}
            onChange={handleTextChange}
          />
        </div>

        <div className="new-date-input form-input-container">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newTransaction.date}
            onChange={handleTextChange}
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}
