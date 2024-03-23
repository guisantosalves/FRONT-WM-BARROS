import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../../input";
import ComboBox from "../../combo_box";
import { userService } from "@/modules/user/service";
import { clienteService } from "@/modules/cliente/service";
import Button from "../../button";
import { servicoService } from "@/modules/service_module/service";

type Props = {
  setIsOpen: (param: boolean) => void;
  isEditing?: boolean;
  data?: ServicoTypeReturned;
  atualizar?: () => void;
};

export interface genericCombo {
  id: string;
  nome: string;
}

export default function ModalServico(props: Props) {
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

  const onChangeName = (val: string | File) => {
    setName(val as string);
  };

  const onChangeValor = (val: string | File) => {
    setValor(val as string);
  };

  const onChangeDescricao = (val: string | File) => {
    setDescricao(val as string);
  };

  const onChangeTempoServico = (val: string | File) => {
    setTempoServico(val as string);
  };

  const getFuncionarios = async () => {
    const allData = await userService.findAll();

    let auxToSave: genericCombo[] = [];

    if (allData) {
      // mapeando os dados iterados
      allData.forEach((item, index) => {
        auxToSave.push({ id: item._id!, nome: item.nome });
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
        auxToSave.push({ id: item._id!, nome: item.nome });
      });

      // salvando no estado
      setClientes(auxToSave);
    }
  };

  React.useEffect(() => {
    if (props.isEditing && props.data) {
      getFuncionarios();
      getCliente();
      setName(props.data.nome);
      setValor(props.data.valor.toString());
      setDescricao(props.data.descricao ?? "...");
      setTempoServico(props.data.tempoServico?.toString()!);
      setIdFuncionarioToSend(props.data.funcionario?._id!);
      setIdClientToSend(props.data.cliente?._id!);
      setStatusId(props.data.status.toString());
    } else {
      getFuncionarios();
      getCliente();
    }
  }, []);

  const submitData = async () => {
    const mappingData: ServicoType = {
      ativo: true,
      cliente: idClientToSend,
      funcionario: idFuncionarioToSend,
      nome: name,
      status: Number(statusId),
      valor: Number(valor),
      descricao: descricao,
      tempoServico: Number(tempoServico),
    };

    if (mappingData.nome != "" || mappingData.nome != null) {
      // creating
      const dataSaved = await servicoService.createServico(mappingData);

      if (dataSaved) {
        alert("serviço inserido!");
      } else {
        alert("servico não inserido, ocorreu algum erro!");
      }
    }

    atualizarStateFather();
  };

  const clear = () => {
    setName("");
    setValor("");
    setDescricao("");
    setTempoServico("");
    setIdFuncionarioToSend("");
    setIdClientToSend("");
    setStatusId("");
  };

  const submitUpdate = async () => {
    const mappingData: ServicoType = {
      ativo: true,
      cliente: idClientToSend,
      funcionario: idFuncionarioToSend,
      nome: name,
      status: Number(statusId),
      valor: Number(valor),
      descricao: descricao,
      tempoServico: Number(tempoServico),
    };

    if (props.data && props.data._id) {
      if (mappingData.nome != "" || mappingData.nome != null) {
        // creating
        const dataSaved = await servicoService.updateServico(
          props.data._id,
          mappingData
        );

        if (dataSaved) {
          alert("serviço alterado!");
        } else {
          alert("servico não alterado, ocorreu algum erro!");
        }
      }
    }

    atualizarStateFather();
  };

  const atualizarStateFather = () => {
    if (props.atualizar) {
      props.atualizar();
    }
  };

  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() => {
          atualizarStateFather();
          props.setIsOpen(false);
        }}
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => {
              atualizarStateFather();
              props.setIsOpen(false);
            }}
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
                placeholder="ex: 1200"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Descrição"
                value={descricao}
                alt="input for description"
                onChange={onChangeDescricao}
                width={230}
                placeholder="ex: um bom trabalho"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Tempo de Serviço"
                value={tempoServico}
                alt="input for time of service"
                onChange={onChangeTempoServico}
                width={230}
                placeholder="ex: 6"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <ComboBox
                data={funcionarios}
                label="Funcionario"
                stateToGetId={setIdFuncionarioToSend}
                currentValue={idFuncionarioToSend}
              />
              <ComboBox
                data={clientes}
                label="Cliente"
                stateToGetId={setIdClientToSend}
                currentValue={idClientToSend}
              />
              <ComboBox
                data={mockedDataStatus}
                label="Status"
                stateToGetId={setStatusId}
                currentValue={
                  props.isEditing && props.data && props.data.status != null
                    ? props.data.status.toString()
                    : ""
                }
              />
            </div>
            <div className={styles.modalFooter}>
              <Button
                onClick={clear}
                backgroundColor={"#d9534f"}
                padding={[8, 35, 8, 35]}
                borderRadius
                color="#B5C2CA"
                fontSize={19}
                fontWeight={500}
              >
                Clear
              </Button>
              <Button
                onClick={() =>
                  props.data && props.isEditing ? submitUpdate() : submitData()
                }
                backgroundColor={"#081225"}
                padding={[8, 35, 8, 35]}
                borderRadius
                color="#B5C2CA"
                fontSize={19}
                fontWeight={500}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
