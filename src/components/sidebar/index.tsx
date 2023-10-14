import * as React from "react";
import Button from "../button";
import styles from "./styles.module.css";
import Image from "next/image";
import UserInfo from "./components/user_info";

type Props = {
  title: string;
};

export default function Sidebar(props: Props) {
  const [clicked, setClicked] = React.useState<boolean>(true);

  return (
    <div className={styles.containerSidebar}>
      <div>
        <div className={styles.containerLogoTitle}>
          <Image
            src={"/logo-login.png"}
            alt={"logo mulher"}
            width={40}
            height={40}
          />
          <p className={styles.title}>{props.title}</p>
        </div>
        <div className={styles.containerLinks}>
          <Button
            onClick={() => console.log("go to init")}
            backgroundColor={clicked ? "#081225" : ""}
            padding={[8, 75, 8, 75]}
            borderRadius
            color="#B5C2CA"
            fontSize={19}
            fontWeight={500}
          >
            Início
          </Button>
          <Button
            onClick={() => console.log("go to init")}
            padding={[8, 75, 8, 75]}
            borderRadius
            color="#081225"
            fontSize={19}
            fontWeight={500}
          >
            Funcionários
          </Button>
          <Button
            onClick={() => console.log("go to init")}
            padding={[8, 75, 8, 75]}
            borderRadius
            color="#081225"
            fontSize={19}
            fontWeight={500}
          >
            Clientes
          </Button>
        </div>
      </div>
      <div className={styles.containerUser}>
        <UserInfo />
      </div>
    </div>
  );
}
