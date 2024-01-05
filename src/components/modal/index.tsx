import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../input";
import ComboBox from "../combo_box";
import { userService } from "@/modules/user/service";
import { clienteService } from "@/modules/cliente/service";

type Props = {
  setIsOpen: (param: boolean) => void;
};

export interface genericCombo {
  id: string;
  nome: string;
}

export default function Modal(props: Props) {
  const [name, setName] = React.useState<string>("");
  const [valor, setValor] = React.useState<string>("");
  const [descricao, setDescricao] = React.useState<string>("");
  const [tempoServico, setTempoServico] = React.useState<string>("");
  const [funcionarios, setFuncionarios] = React.useState<genericCombo[]>([]);
  const [idFuncionarioToSend, setIdFuncionarioToSend] =
    React.useState<string>("");
  const [idClientToSend, setIdClientToSend] = React.useState<string>("");
  const [clientes, setClientes] = React.useState<genericCombo[]>([]);
  const [statusId, setStatusId] = React.useState<string>("");
  const mockedDataStatus: genericCombo[] = [
    { id: "0", nome: "agendado" },
    { id: "1", nome: "em atendimento" },
    { id: "2", nome: "finalizado" },
    { id: "3", nome: "cancelado" },
  ];

  const onChangeName = (val: string) => {
    setName(val);
  };

  const onChangeValor = (val: string) => {
    setValor(val);
  };

  const onChangeDescricao = (val: string) => {
    setDescricao(val);
  };

  const onChangeTempoServico = (val: string) => {
    setTempoServico(val);
  };

  const getFuncionarios = async () => {
    const allData = await userService.findAll();

    let auxToSave: genericCombo[] = [];

    if (allData) {
      // mapeando os dados iterados
      allData.forEach((item, index) => {
        auxToSave.push({ id: item._id, nome: item.nome });
      });

      // salvando no estado
      setFuncionarios(auxToSave);
    }
  };

  const getCliente = async () => {
    const allData = await clienteService.findAll();

    let auxToSave: genericCombo[] = [];

    if (allData) {
      // mapeando os dados iterados
      allData.forEach((item, index) => {
        auxToSave.push({ id: item._id, nome: item.nome });
      });

      // salvando no estado
      setClientes(auxToSave);
    }
  };

  React.useEffect(() => {
    getFuncionarios();
    getCliente();
  }, []);

  const submitData = async () => {
    
  };

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
          <div className={styles.modalContent}>
            <div className={styles.wrappInputs}>
              <Input
                label="Nome"
                value={name}
                alt="input for name"
                onChange={onChangeName}
                width={230}
                placeholder="ex: Guilherme"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Valor"
                value={valor}
                alt="input for value"
                onChange={onChangeValor}
                width={230}
                placeholder="ex: Guilherme"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Descrição"
                value={descricao}
                alt="input for description"
                onChange={onChangeDescricao}
                width={230}
                placeholder="ex: Guilherme"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Tempo de Serviço"
                value={tempoServico}
                alt="input for time of service"
                onChange={onChangeTempoServico}
                width={230}
                placeholder="ex: Guilherme"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <ComboBox
                data={funcionarios}
                label="Funcionario"
                stateToGetId={setIdFuncionarioToSend}
              />
              <ComboBox
                data={clientes}
                label="Cliente"
                stateToGetId={setIdClientToSend}
              />
              <ComboBox
                data={mockedDataStatus}
                label="Status"
                stateToGetId={setStatusId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
