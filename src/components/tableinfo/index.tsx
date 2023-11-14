import * as React from "react";
import styles from "./styles.module.css";
import Button from "../button";
import TableServico from "./components/table_servico";

export enum typeTable {
  servico = "servico",
  funcionario = "funcionario",
  cliente = "cliente",
}

type Props = {
  type: typeTable;
};

export default function TableInfo(props: Props) {
  switch (props.type) {
    case typeTable.servico:
      // passar os dados de servico para o table service
      const handleAddServico = () => {};
      return (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div>
              <p className={styles.title}>Serviços cadastrados</p>
              <p>117 cadastrados</p>
            </div>
            <Button
              onClick={handleAddServico}
              backgroundColor={"#081225"}
              padding={[8, 50, 8, 50]}
              borderRadius
              color="#B5C2CA"
              fontSize={19}
              fontWeight={500}
            >
              Cadastrar Serviço
            </Button>
          </div>
          <TableServico data={""} />
        </div>
      );
    case typeTable.cliente:
      return <div></div>;
    case typeTable.funcionario:
      return <div></div>;
  }
}
