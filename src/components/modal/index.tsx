import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";

type Props = {
  setIsOpen: (param: boolean) => void;
};

export default function Modal(props: Props) {
  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => props.setIsOpen(false)}
          >
            <IoMdClose style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>hello</div>
        </div>
      </div>
    </>
  );
}
