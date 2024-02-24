import * as React from "react";
import styles from "./styles.module.css";
import Button from "../button";
import TableServico from "./components/servico/table_servico";
import { useSelector } from "react-redux";
import { getLayoutDisposition } from "@/redux/dataSlice";
import { servicoService } from "@/modules/service_module/service";
import { clienteService } from "@/modules/cliente/service";
import { userService } from "@/modules/user/service";
import CardServico from "./components/servico/card_servico";
import CardFuncionario from "./components/funcionario/card_funcionario";
import ModalCliente from "../modals/modal_cliente";
import TableCliente from "./components/cliente/table_cliente";
import CardCliente from "./components/cliente/card_cliente";
import ModalServico from "../modals/modal_servico";
import ModalFuncionario from "../modals/modal_funcionario";
import Funcionario from "@/pages/dashboard/funcionario";
import TableFuncionario from "./components/funcionario/table_funcionario";

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
  const [openModalCliente, setOpenModalCliente] = React.useState<boolean>();
  const [openModalFuncionario, setOpenModalFuncionario] =
    React.useState<boolean>();
  const currentLayoutState: any = useSelector(getLayoutDisposition);

  const [clienteData, setClienteData] = React.useState<ClienteType[]>([]);
  const [FucionarioData, setFucionarioData] = React.useState<UserType[]>([]);
  const [ServicoData, setServicoData] = React.useState<ServicoTypeReturned[]>(
    []
  );
  const [atualizar, setAtualizar] = React.useState<boolean>(false);

  const getService = async () => {
    const servico = await servicoService.getAllService();

    if (servico && servico.length > 0) {
      servico.reverse();
      setServicoData(servico);
    }
  };

  const getCliente = async () => {
    const cliente = await clienteService.findAll();

    if (cliente && cliente.length > 0) {
      setClienteData(cliente);
    }
  };

  const getUser = async () => {
    const user = await userService.findAll();

    if (user && user.length > 0) {
      setFucionarioData(user);
    }
  };

  React.useEffect(() => {
    switch (props.type) {
      case typeTable.servico:
        // buscar do servico
        // set no state
        getService();
        break;
      case typeTable.cliente:
        // buscar do cliente
        // set no state
        getCliente();
        break;
      case typeTable.funcionario:
        // buscar do funcionario
        // set no state
        getUser();
        break;
    }
  }, [atualizar]);

  const atualizandoRender = () => {
    setAtualizar(!atualizar);
  };

  switch (props.type) {
    case typeTable.servico:
      // passar os dados de servico para o table service
      const handleAddServico = (value: boolean) => {
        setOpenModal(value);
      };
      return (
        <>
          {openModal ? (
            <ModalServico
              setIsOpen={handleAddServico}
              atualizar={atualizandoRender}
            />
          ) : (
            <></>
          )}
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div>
                <p className={styles.title}>Serviços cadastrados</p>
                <p>{ServicoData.length} cadastrados</p>
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
            {currentLayoutState ? (
              <TableServico data={ServicoData} atualizar={atualizandoRender} />
            ) : (
              <CardServico data={ServicoData} atualizar={atualizandoRender} />
            )}
          </div>
        </>
      );
    case typeTable.cliente:
      // passar os dados de servico para o table service
      const handleAddCliente = (value: boolean) => {
        setOpenModalCliente(value);
      };
      return (
        <>
          {openModalCliente ? (
            <ModalCliente
              setIsOpen={handleAddCliente}
              atualizar={atualizandoRender}
            />
          ) : (
            <></>
          )}
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div>
                <p className={styles.title}>Cliente cadastrados</p>
                <p>{`${clienteData.length} cadastrados`}</p>
              </div>
              <Button
                onClick={() => handleAddCliente(true)}
                backgroundColor={"#081225"}
                padding={[8, 50, 8, 50]}
                borderRadius
                color="#B5C2CA"
                fontSize={19}
                fontWeight={500}
              >
                Cadastrar Cliente
              </Button>
            </div>
            {currentLayoutState ? (
              <TableCliente data={clienteData} atualizar={atualizandoRender} />
            ) : (
              <CardCliente data={clienteData} atualizar={atualizandoRender} />
            )}
          </div>
        </>
      );
    case typeTable.funcionario:
      // passar os dados de servico para o table service
      const handleAddFuncionario = (value: boolean) => {
        setOpenModalFuncionario(value);
      };
      return (
        <>
          {openModalFuncionario ? (
            <ModalFuncionario
              setIsOpen={handleAddFuncionario}
              atualizar={atualizandoRender}
            />
          ) : (
            <></>
          )}
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div>
                <p className={styles.title}>{`Funcionários`}</p>
                <p>{`${FucionarioData.length} cadastrados`}</p>
              </div>
              <Button
                onClick={() => handleAddFuncionario(true)}
                backgroundColor={"#081225"}
                padding={[8, 50, 8, 50]}
                borderRadius
                color="#B5C2CA"
                fontSize={19}
                fontWeight={500}
              >
                Cadastrar Funcionário
              </Button>
            </div>
            {currentLayoutState ? (
              <TableFuncionario
                data={FucionarioData}
                atualizar={atualizandoRender}
              />
            ) : (
              <CardFuncionario
                data={FucionarioData}
                atualizar={atualizandoRender}
              />
            )}
          </div>
        </>
      );
  }
}
