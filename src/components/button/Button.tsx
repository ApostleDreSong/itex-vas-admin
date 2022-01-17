/* eslint-disable no-unused-vars */
import React, { MouseEvent, CSSProperties } from "react";

interface ButtonType {
    value: string;
    style?: CSSProperties;
    onClick?: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
}

export default function Button({ value, style, onClick }: ButtonType) {
    return (
        <input
            onClick={onClick}
            type="button"
            value={value}
            style={{ ...permanentStyle, ...style }}
        />
    );
}

const permanentStyle = {
    padding: "15px",
    width: "auto",
    borderRadius: "4px",
    marginBottom: 0,
    border: "none",
    cursor: "pointer",
};

Button.defaultProps = {
    style: {},
    onClick: () => "",
};
