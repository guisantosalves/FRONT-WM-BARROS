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
  labelWeight?: number;
  backgroundColor?: string;
  customStyle?: React.CSSProperties | undefined;
};

export default function Input(props: Props) {
  const style = {
    width: props.width,
    height: props.height,
    ...props.customStyle,
  };
  return (
    <div className={styles.containerInput} style={{ ...style }}>
      {props.label ? (
        <label
          style={{
            color: props.labelColor ?? "#081225",
            fontWeight: props.labelWeight ?? "normal",
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
        style={{ backgroundColor: props.backgroundColor }}
        placeholder={props.placeholder ?? ""}
      />
    </div>
  );
}
