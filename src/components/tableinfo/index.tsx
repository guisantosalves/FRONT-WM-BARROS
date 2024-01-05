import * as React from "react";
import styles from "./styles.module.css";
import Button from "../button";
import TableServico from "./components/table_servico";
import Modal from "../modal";
import { useSelector } from "react-redux";
import { getLayoutDisposition } from "@/redux/dataSlice";

export enum typeTable {
  servico = "servico",
  funcionario = "funcionario",
  cliente = "cliente",
}

type Props = {
  type: typeTable;
};

export default function TableInfo(props: Props) {
  const [openModal, setOpenModal] = React.useState<boolean>();
  const currentLayoutState: any = useSelector(getLayoutDisposition);

  const [clienteData, setClienteData] = React.useState<ClienteType[]>([]);
  const [FucionarioData, setFucionarioData] = React.useState<UserType[]>([]);
  const [ServicoData, setServicoData] = React.useState<ServicoType[]>([]);

  React.useEffect(() => {
    switch (props.type) {
      case typeTable.servico:
        // buscar do servico
        // set no state
        break;
      case typeTable.cliente:
        // buscar do cliente
        // set no state
        break;
      case typeTable.funcionario:
        // buscar do funcionario
        // set no state
        break;
    }
  }, []);

  switch (props.type) {
    case typeTable.servico:
      // passar os dados de servico para o table service
      const handleAddServico = (value: boolean) => {
        setOpenModal(value);
      };
      return (
        <>
          {openModal ? <Modal setIsOpen={handleAddServico} /> : <></>}
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div>
                <p className={styles.title}>Serviços cadastrados</p>
                <p>117 cadastrados</p>
              </div>
              <Button
                onClick={() => handleAddServico(true)}
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
            {currentLayoutState ? <TableServico data={ServicoData} /> : <></>}
          </div>
        </>
      );
    case typeTable.cliente:
      return <div></div>;
    case typeTable.funcionario:
      return <div></div>;
  }
}
