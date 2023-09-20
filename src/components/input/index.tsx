import * as React from "react";
import styles from "./styles.module.css";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  alt: string;
  onChange: (currentVal: string) => void;
  labelColor?: string;
  width?: number;
  height?: number;
};

export default function Input(props: Props) {
  return (
    <div
      className={styles.containerInput}
      style={{ width: props.width, height: props.height }}
    >
      {props.label ? (
        <label
          style={{
            color: props.labelColor ?? "#081225",
          }}
          className={styles.label}
        >
          {props.label}
        </label>
      ) : (
        <></>
      )}
      <input
        type={props.type ? props.type : "text"}
        value={props.value}
        alt={props.alt}
        onChange={(ev) => props.onChange(ev.target.value)}
        className={styles.input}
        placeholder={props.placeholder ?? ""}
      />
    </div>
  );
}
