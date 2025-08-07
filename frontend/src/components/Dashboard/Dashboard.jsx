import React from "react";

const Dashboard = () => (
  <div>
    <style>{`
      .dashboard-container {
        padding: 40px;
        text-align: center;
        font-family: Arial, sans-serif;
        background-color: #f0f2f5;
        min-height: 100vh;
      }

      .dashboard-title {
        font-size: 36px;
        color: #333;
        margin-bottom: 20px;
      }

      .dashboard-message {
        font-size: 18px;
        color: #555;
      }
    `}</style>

    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-message">Welcome to your dashboard.</p>
    </div>
  </div>
);

export default Dashboard;
