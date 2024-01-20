import * as React from "react";
import Button from "../button";
import styles from "./styles.module.css";
import Image from "next/image";
import UserInfo from "./components/user_info";
import { useRouter } from "next/router";

export enum SidebarType {
  servico,
  funcionario,
  cliente,
}

type Props = {
  title: string;
  type: SidebarType;
};

export default function Sidebar(props: Props) {
  const [clicked, setClicked] = React.useState<boolean>(true);
  const router = useRouter();

  const navigateToInit = () => {
    router.push("/dashboard");
  };

  const navigateToFuncionario = () => {
    router.push("/dashboard/funcionario");
  };

  const navigateToCliente = () => {
    router.push("/dashboard/cliente");
  };

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
            onClick={() => navigateToInit()}
            backgroundColor={
              props.type === SidebarType.servico ? "#081225" : ""
            }
            padding={[8, 75, 8, 75]}
            borderRadius
            color={props.type === SidebarType.servico ? "#B5C2CA" : ""}
            fontSize={19}
            fontWeight={500}
          >
            Início
          </Button>
          <Button
            onClick={() => navigateToFuncionario()}
            padding={[8, 50, 8, 50]}
            borderRadius
            color={props.type === SidebarType.funcionario ? "#B5C2CA" : ""}
            fontSize={19}
            fontWeight={500}
            backgroundColor={
              props.type === SidebarType.funcionario ? "#081225" : ""
            }
          >
            Funcionários
          </Button>
          <Button
            onClick={() => navigateToCliente()}
            padding={[8, 75, 8, 75]}
            borderRadius
            color={props.type === SidebarType.cliente ? "#B5C2CA" : ""}
            fontSize={19}
            fontWeight={500}
            backgroundColor={
              props.type === SidebarType.cliente ? "#081225" : ""
            }
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
