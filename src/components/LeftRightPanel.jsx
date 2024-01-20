import React from "react";
import "./LeftRightPanel.css";
import { Link, useNavigate } from "react-router-dom";

export default function LeftRightPanel({ leftChild, rightChild }) {
  return (
    <div className="panelWrapper">
      <div className="leftPanel">{leftChild && leftChild}</div>
      <div className="rightPanel">{rightChild}</div>
    </div>
  );
}
