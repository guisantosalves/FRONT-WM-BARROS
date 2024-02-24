import styles from "./styles.module.css";
import Image from "next/image";

type Props = {
  photo?: string;
};

export default function UserAvatar(props: Props) {
  return (
    <div className={styles.avatar}>
      {props.photo && (
        <Image
          src={props.photo}
          width={250}
          height={250}
          alt="photo"
          style={{ width: "inherit", height: "inherit" }}
        />
      )}
    </div>
  );
}
