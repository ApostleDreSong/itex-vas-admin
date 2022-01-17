import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const BackArrow = () => {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "none",
        color: "grey",
        padding: "2px 12px 0 14px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      onClick={() => history.goBack()}
      onKeyPress={() => history.goBack()}
      role="presentation"
    >
      <ArrowBack />
    </div>
  );
};

export default BackArrow;
