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
  labelVersion?: number;
};

export default function Input(props: Props) {
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

  const convertBase64 = async (file: File) => {
    const base64 = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    base64.then((result) => {
      if (typeof result === "string") {
        props.onChange(result);
      }
    });
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
        onChange={
          props.type !== "file"
            ? (ev) => props.onChange(ev.target.value)
            : (ev) => convertBase64(ev.target.files![0])
        }
        className={styles.input}
        style={{ backgroundColor: props.backgroundColor }}
        placeholder={props.placeholder ?? ""}
      />
    </div>
  );
}
