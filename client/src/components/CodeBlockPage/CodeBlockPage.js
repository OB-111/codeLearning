import React, { useState, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import io from "socket.io-client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "./styles.css";

const CodeBlockPage = ({ codeBlock, role }) => {
  // const [codeBlock, setCodeBlock] = useState(null);
  const [isCodeMatched, setIsCodeMatched] = useState(false); //for emoji
  const [updatedCode, setUpdatedCode] = useState(
    codeBlock ? codeBlock.code : ""
  );
  const socket = io.connect("http://localhost:3000");

  // for hilight the solution code
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  // use Socket.io to listen comming streram..
  useEffect(() => {
    socket.on("codeUpdate", (updatedCode) => {
      setUpdatedCode(updatedCode);
    });
  }, []);

  const handleCodeChange = async (e) => {
    setUpdatedCode(e);
    if (codeBlock.sol === e) {
      setIsCodeMatched(true);
    }
    socket.emit("send_updateCode", { updatedCode: e });
  };

  return codeBlock ? (
    <div>
      {role === "mentor" ? (
        <div className="mentor-page">
          <pre>
            The solution:<code className="js">{codeBlock.sol}</code>
          </pre>
          <h1>Mentor Page:</h1>{" "}
          <AceEditor
            className="text-editor"
            placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            name="blah2"
            value={updatedCode}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            readOnly={true}
          />
        </div>
      ) : (
        <div className="student-page">
          <h1>Student Page:</h1>{" "}
          <h3>{codeBlock.title} Assigment , Complete the missing..</h3>
          <pre>
            The solution:<code className="js">{codeBlock.sol}</code>
          </pre>
          <AceEditor
            className="text-editor"
            placeholder="Placeholder Text"
            mode="javascript"
            theme="monokai"
            name="blah2"
            value={updatedCode}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            onChange={handleCodeChange}
          />
          {isCodeMatched ? (
            <span role="img" aria-label="sheep">
              😃
            </span>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CodeBlockPage;
