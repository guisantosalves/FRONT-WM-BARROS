import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../../input";
import { userService } from "@/modules/user/service";
import { clienteService } from "@/modules/cliente/service";
import ComboBox from "../../combo_box";
import Button from "../../button";
import { servicoService } from "@/modules/service_module/service";

type Props = {
  setIsOpen: (param: boolean) => void;
  isEditing?: boolean;
  data?: UserType;
  atualizar?: () => void;
};

export interface genericCombo {
  id: string;
  nome: string;
}

export default function ModalFuncionario(props: Props) {
  const [name, setName] = React.useState<string>("");
  const [valor, setValor] = React.useState<string>("");
  const [descricao, setDescricao] = React.useState<string>("");
  const [tempoServico, setTempoServico] = React.useState<string>("");
  const [funcionarios, setFuncionarios] = React.useState<genericCombo[]>([]);
  const [idFuncionarioToSend, setIdFuncionarioToSend] =
    React.useState<string>("");
  const [clientes, setClientes] = React.useState<genericCombo[]>([]);
  const [idClienteToSend, setIdClienteToSend] = React.useState<string>("");
  const [statusId, setStatusId] = React.useState<string>("");
  const mockedDataStatus: genericCombo[] = [
    { id: "0", nome: "Inativo" },
    { id: "1", nome: "Ativo" },
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
  const getFuncionario = async () => {
    const allData = await userService.findAll();
    let auxToSave: genericCombo[] = [];
    if (allData) {
      // Mapeando os dados interados
      allData.forEach((item, index) => {
        auxToSave.push({ id: item._id, nome: item.nome });
      });
      // Salvando no estado
      setFuncionarios(auxToSave);
    }
  };

  // const getCliente = async () => {
  //   const allData = await clienteService.findAllClient();
  //   let auxToSave: genericCombo[] = [];
  //   if (allData) {
  //     // Mapeando os dados interados
  //     allData.forEach((item, index) => {
  //       auxToSave.push({ id: item._id, nome: item.nome });
  //     });
  //     // Salvando no estado
  //     setClientes(auxToSave);
  //   }
  // };

  React.useEffect(() => {
    if (props.isEditing && props.data) {
      getFuncionario();
      //   setName(props.data.nome);
      //   setValor(props.data.valor.toString());
      //   setDescricao(props.data.descricao ?? "...");
      //   setTempoServico(props.data.tempoServico?.toString()!);
      //   setIdFuncionarioToSend(props.data.funcionario._id);
      //   setIdClienteToSend(props.data.cliente._id);
      //   setStatusId(props.data.status.toString());
    } else {
      getFuncionario();
    }
  }, []);

  const submitData = async () => {
    const dataObj: ServicoType = {
      ativo: true,
      cliente: idClienteToSend,
      funcionario: idFuncionarioToSend,
      nome: name,
      status: Number(statusId),
      valor: Number(valor),
      descricao: descricao,
      tempoServico: Number(tempoServico),
    };

    const dataSaved = await servicoService.createServico(dataObj);

    if (dataSaved) {
      alert("Serviço inserido com sucesso!");
    } else {
      alert("Serviço não inserido, Ocorreu algum erro!");
    }
    atualizarStateFather();
  };

  const clear = async () => {
    setName("");
    setValor("");
    setDescricao("");
    setTempoServico("");
    setIdFuncionarioToSend("");
    setIdClienteToSend("");
    setStatusId("");
  };

  const submitUpdate = async () => {
    const dataUpdate: ServicoType = {
      ativo: true,
      cliente: idClienteToSend,
      funcionario: idFuncionarioToSend,
      nome: name,
      status: Number(statusId),
      valor: Number(valor),
      descricao: descricao,
      tempoServico: Number(tempoServico),
    };

    if (props.data && props.data._id) {
      if (dataUpdate.nome != "" || dataUpdate.nome != null) {
        const dataSaved = await servicoService.updateServico(
          props.data._id,
          dataUpdate
        );
        if (dataSaved) {
          alert("Serviço alterado com sucesso!");
        } else {
          alert("Serviço não alterado, Ocorreu algum erro!");
        }
        atualizarStateFather();
      }
    }
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
            <h5 className={styles.heading}>
              {props.isEditing ? "Alterar" : "Cadastrar"} Funcionário
            </h5>
          </div>
          <button
            className={styles.closerBtn}
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
                labelVersion={2}
                value={name}
                onChange={onChangeName}
                alt={"Input do nome"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Data nascimento"
                labelVersion={2}
                value={valor}
                onChange={onChangeValor}
                alt={"Input data nascimento"}
                width={230}
                customStyle={{ marginBottom: "0.7rem" }}
                type={"date"}
              />
              <Input
                label="E-mail"
                labelVersion={2}
                value={descricao}
                onChange={onChangeDescricao}
                alt={"Input do e-mail"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Senha"
                labelVersion={2}
                value={descricao}
                onChange={onChangeDescricao}
                alt={"Input do cep"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Salário"
                labelVersion={2}
                value={descricao}
                onChange={onChangeDescricao}
                alt={"Input do salário"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Data admisão"
                labelVersion={2}
                value={descricao}
                onChange={onChangeDescricao}
                alt={"Input da data admisão"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
                type={"date"}
              />
              {props.isEditing ? (
                <Input
                  label="Data demisão"
                  labelVersion={2}
                  value={descricao}
                  onChange={onChangeDescricao}
                  alt={"Input do salário"}
                  width={230}
                  placeholder={"Digite aqui..."}
                  customStyle={{ marginBottom: "0.7rem" }}
                  type={"date"}
                />
              ) : (
                ""
              )}
              <Input
                label="CEP"
                labelVersion={2}
                value={descricao}
                onChange={onChangeDescricao}
                alt={"Input do cep"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Rua"
                labelVersion={2}
                value={tempoServico}
                onChange={onChangeTempoServico}
                alt={"Input da rua"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Bairro"
                labelVersion={2}
                value={tempoServico}
                onChange={onChangeTempoServico}
                alt={"Input do bairro"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Foto"
                labelVersion={2}
                value={tempoServico}
                onChange={onChangeTempoServico}
                alt={"Input da foto"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
                type={"file"}
              />
              {props.isEditing ? (
                <ComboBox
                  data={mockedDataStatus}
                  label="Status"
                  stateToGetId={setStatusId}
                />
              ) : (
                ""
              )}
              <Input
                label="Observação"
                labelVersion={2}
                value={tempoServico}
                onChange={onChangeTempoServico}
                alt={"Input da observação"}
                width={props.isEditing ? 930 : 530}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
            </div>
            <div className={styles.modalFooter}>
              <Button
                onClick={clear}
                backgroundColor={"#881225"}
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
