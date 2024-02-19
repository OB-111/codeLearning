import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeBlockPage from "../CodeBlockPage/CodeBlockPage";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const URL = "http://localhost:3000/";
const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [selectedCodeBlock, setSelectedCodeBlock] = useState(null);
  const [role, setRole] = useState("mentor");
  const navigate = useNavigate();

  //fetches all CodeBlock onLoad..
  useEffect(() => {
    const fetchCodeBlocks = async () => {
      const { data } = await axios.get(`${URL}/api/getAll`);
      setCodeBlocks(data);
      if (role === "student") {
        const found = data.find((codeBlock) => codeBlock.isSelected === true);
        setSelectedCodeBlock(found);
      }
    };
    fetchCodeBlocks();
  }, [role]);

  // check for role
  useEffect(() => {
    const checkRole = async () => {
      const currentRole = await axios.get(`${URL}/checkRole`);
      setRole(currentRole.data);
    };
    checkRole();
  }, []);

  useEffect(() => {
    if (role === "mentor") {
      navigate("/mentor");
    } else {
      navigate("/student");
    }
  }, [role]);

  const setSelctedCodeBlockID = async (codeBlockId) => {
    const selectedCodeBlockID = await axios.put(`${URL}/api/${codeBlockId}`);
    const selected = codeBlocks.find(
      (codeBlock) => codeBlock._id === codeBlockId
    );
    setSelectedCodeBlock(selected);
  };

  return role === "mentor" ? (
    <div>
      <h1>Choose code block:</h1>
      <select
        className="select-menu"
        onChange={async (e) => {
          setSelctedCodeBlockID(e.target.value);
        }}
      >
        <option>-Select code block--</option>
        {codeBlocks.map((codeBlock) => (
          <option key={codeBlock._id} value={codeBlock._id}>
            {codeBlock.title}
          </option>
        ))}
      </select>
      {selectedCodeBlock && (
        <CodeBlockPage codeBlock={selectedCodeBlock} role={role} />
      )}
    </div>
  ) : (
    selectedCodeBlock && (
      <CodeBlockPage codeBlock={selectedCodeBlock} role={role} />
    )
  );
};

export default LobbyPage;
