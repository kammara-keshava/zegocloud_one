import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate(`/room/${Date.now()}`);
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      alignItems: "center",
      justifyContent: "center",
      background: "#d8dbdfff",
      color: "#fff",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px",
        borderRadius: "16px",
        background: "#504f52ff",
        boxShadow: "0 0 40px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Create a Meeting Room
        </h1>

        <p style={{ opacity: 0.8, marginBottom: "30px" }}>
          Click the button below to instantly generate a new room link.
        </p>

        <button
          onClick={handleCreateRoom}
          style={{
            background: "#2563eb",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            fontSize: "18px",
            color: "white",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseOver={e => e.target.style.background = "#1d4ed8"}
          onMouseOut={e => e.target.style.background = "#2563eb"}
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Home;
