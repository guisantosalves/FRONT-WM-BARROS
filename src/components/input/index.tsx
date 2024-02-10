import * as React from "react";
import styles from "./styles.module.css";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  type?: React.HTMLInputTypeAttribute;
  alt: string;
  onChange: (currentVal: string | File) => void;
  labelColor?: string;
  width?: number;
  height?: number;
  labelWeight?: number;
  backgroundColor?: string;
  customStyle?: React.CSSProperties | undefined;
  labelVersion?: number;
};

export default function Input(props: Props) {
  // const [photo, setPhoto] = React.useState<string>("");
  const style = {
    width: props.width,
    height: props.height,
    ...props.customStyle,
  };

  const decideLabel = (labelVersion: number): string | undefined => {
    switch (labelVersion) {
      case 1:
        return styles.versionOne;
      case 2:
        return styles.versionTwo;
      default:
        return "";
    }
  };

  const toBase64 = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    // console.log(file);
    if (!file) return "";
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result;
        props.onChange(base64);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.containerInput} style={{ ...style }}>
      {props.label ? (
        <label
          style={
            props.labelVersion
              ? {}
              : {
                  color: props.labelColor ?? "#081225",
                  fontWeight: props.labelWeight ?? "normal",
                }
          }
          className={
            props.labelVersion ? decideLabel(props.labelVersion) : styles.label
          }
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
        onChange={(ev) => {
          if (props.type === "file") {
            toBase64(ev);
          } else {
            props.onChange(ev.target.value);
          }
        }}
        className={styles.input}
        style={{ backgroundColor: props.backgroundColor }}
        placeholder={props.placeholder ?? ""}
      />
    </div>
  );
}
