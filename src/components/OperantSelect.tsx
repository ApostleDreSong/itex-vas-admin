import InputLabel from "@material-ui/core/InputLabel";
import React, { SelectHTMLAttributes } from "react";
import styles from "./OperantSelect.module.scss";

interface OperantSelectType extends SelectHTMLAttributes<HTMLSelectElement> {
  values: {
    value: any;
    text: string;
  }[];
}

export default function OperantSelect({
  name,
  value,
  values,
  onChange,
  style,
}: OperantSelectType) {
  return (
    <>
      <InputLabel
        id="demo-simple-select-label"
        style={{ marginBottom: "10px" }}
      >
        {name}
      </InputLabel>
      <select
        onChange={onChange ? (e) => onChange(e) : undefined}
        name={name}
        value={value}
        className={`${styles.main} app-font`}
        style={{ ...style }}
      >
        {values.map((each, index) => (
          <option key={index} value={each.value}>
            {each.text}
          </option>
        ))}
      </select>
    </>
  );
}
