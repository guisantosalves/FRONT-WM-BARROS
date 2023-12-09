import * as React from "react";
import styles from "./styles.module.css";

interface keyValueIdName {
  id: string;
  name: string;
}

type Props = {
  data: keyValueIdName[];
  label: string;
};

export default function ComboBox(props: Props) {
  return (
    <select>
      {props.data.map((itemIterator, index) => (
        <option>{itemIterator.name}</option>
      ))}
    </select>
  );
}
