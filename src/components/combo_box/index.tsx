import * as React from "react";
import styles from "./styles.module.css";
import { genericCombo } from "../modal";
import { MdArrowDropDown } from "react-icons/md";

type Props = {
  data: genericCombo[];
  label: string;
  stateToGetId: React.Dispatch<React.SetStateAction<string>>;
  currentValue?: string;
};

export default function ComboBox(props: Props) {
  const [chooseData, setChooseData] = React.useState<string>("");

  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      <div className={styles.containerSelect}>
        <select
          value={
            props.data.find((item) => item.id === props.currentValue)?.nome
          }
          onChange={(e) => {
            props.stateToGetId(e.target.value);
          }}
        >
          <option selected disabled hidden>
            Choose
          </option>
          {props.data.map((itemIterator, index) => (
            <option key={index} value={itemIterator.id}>
              {itemIterator.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
