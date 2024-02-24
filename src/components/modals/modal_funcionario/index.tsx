import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../../input";
import { userService } from "@/modules/user/service";
import ComboBox from "../../combo_box";
import Button from "../../button";
import Image from "next/image";

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
  const [email, setEmail] = React.useState<string>("");
  const [senha, setSenha] = React.useState<string>("");
  const [dtNascimento, setDtNascimento] = React.useState<string>("");
  const [dtAdmissao, setDtAdmissao] = React.useState<string>("");
  const [dtDemissao, setDtDemissao] = React.useState<string>("");
  const [obsDemissao, setObsDemissao] = React.useState<string>("");
  const [rua, setRua] = React.useState<string>("");
  const [bairro, setBairro] = React.useState<string>("");
  const [cep, setCep] = React.useState<string>("");
  const [foto, setFoto] = React.useState<string>("");
  const [salario, setSalario] = React.useState<string>("");
  const [ativo, setAtivo] = React.useState<string>("");
  const mockedDataStatus: genericCombo[] = [
    { id: "0", nome: "Inativo" },
    { id: "1", nome: "Ativo" },
  ];

  const onChangeName = (val: string | File) => {
    setName(val as string);
  };

  const onChangeEmail = (val: string | File) => {
    setEmail(val as string);
  };

  const onChangeSenha = (val: string | File) => {
    setSenha(val as string);
  };

  const onChangeDtNascimento = (val: string | File) => {
    setDtNascimento(val as string);
  };

  const onChangeDtAdmissao = (val: string | File) => {
    setDtAdmissao(val as string);
  };

  const onChangeObsDemissao = (val: string | File) => {
    setObsDemissao(val as string);
  };

  const onChangeDtDemissao = (val: string | File) => {
    setDtDemissao(val as string);
  };

  const onChangeRua = (val: string | File) => {
    setRua(val as string);
  };

  const onChangeBairro = (val: string | File) => {
    setBairro(val as string);
  };

  const onChangeCep = (val: string | File) => {
    setCep(val as string);
  };

  const onChangeFoto = (val: string | File) => {
    setFoto(val as string);
  };

  const onChangeSalario = (val: string | File) => {
    setSalario(val as string);
  };

  const onChangeStatus = (val: string | File) => {
    setAtivo(val as string);
  };

  React.useEffect(() => {
    if (props.isEditing && props.data) {
      setName(props.data.nome);
      setEmail(props.data.email);
      setDtNascimento(props.data.dataNascimento);
      setDtAdmissao(props.data.dataAdmisao!);
      setDtDemissao(props.data.dataDemisao!);
      setObsDemissao(props.data.obsDemisao!);
      setRua(props.data.rua);
      setBairro(props.data.bairro);
      setCep(props.data.cep);
      setFoto(props.data.foto!);
      setSalario(props.data.salario.toString());
      setAtivo(String(props.data.ativo));
    }
  }, []);

  const submitData = async () => {
    const dataObj: UserType = {
      nome: name,
      ativo: true,
      bairro: bairro,
      cep: cep,
      dataNascimento: dtNascimento,
      email: email,
      rua: rua,
      salario: Number(salario),
      senha: senha,
      admin: false,
      dataAdmisao: dtAdmissao,
      dataDemisao: dtDemissao,
      foto: foto,
      obsDemisao: obsDemissao,
    };

    const dataSaved = await userService.createUser(dataObj);

    if (dataSaved) {
      alert("Serviço inserido com sucesso!");
    } else {
      alert("Serviço não inserido, Ocorreu algum erro!");
    }
    atualizarStateFather();
  };

  const clear = async () => {
    setName("");
    setEmail("");
    setDtNascimento("");
    setDtAdmissao("");
    setDtDemissao("");
    setObsDemissao("");
    setRua("");
    setBairro("");
    setCep("");
    setFoto("");
    setSalario("");
    setAtivo("");
  };

  const submitUpdate = async () => {
    const dataUpdate: UserType = {
      nome: name,
      ativo: true,
      bairro: bairro,
      cep: cep,
      dataNascimento: dtNascimento,
      email: email,
      rua: rua,
      salario: Number(salario),
      senha: senha,
      admin: false,
      dataAdmisao: dtAdmissao,
      dataDemisao: dtDemissao,
      foto: foto,
      obsDemisao: obsDemissao,
    };

    if (props.data && props.data._id) {
      if (dataUpdate.nome != "" || dataUpdate.nome != null) {
        const dataSaved = await userService.updateUser(
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
                label="Email"
                labelVersion={2}
                value={email}
                onChange={onChangeEmail}
                alt={"input email"}
                width={230}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Senha"
                labelVersion={2}
                value={senha}
                onChange={onChangeSenha}
                alt={"input senha"}
                width={230}
                placeholder={"Senha"}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Data de Nascimento"
                labelVersion={2}
                value={dtNascimento.substring(0, 10)}
                onChange={onChangeDtNascimento}
                alt={"Input data nascimento"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
                type="date"
              />
              <Input
                label="Data de Admissao"
                labelVersion={2}
                value={dtAdmissao.substring(0, 10)}
                onChange={onChangeDtAdmissao}
                alt={"Input data admissao"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
                type="date"
              />
              {props.isEditing ? (
                <>
                  <Input
                    label="Data de demissao"
                    labelVersion={2}
                    value={dtDemissao ? dtDemissao.substring(0, 10) : ""}
                    onChange={onChangeDtDemissao}
                    alt={"Input data demissao"}
                    width={230}
                    placeholder={"Digite aqui..."}
                    customStyle={{ marginBottom: "0.7rem" }}
                  />
                  <Input
                    label="Observação demissão"
                    labelVersion={2}
                    value={obsDemissao}
                    onChange={onChangeObsDemissao}
                    alt={"Input data obs demissao"}
                    width={230}
                    placeholder={"Digite aqui..."}
                    customStyle={{ marginBottom: "0.7rem" }}
                  />
                </>
              ) : (
                ""
              )}
              <Input
                label="rua"
                labelVersion={2}
                value={rua}
                onChange={onChangeRua}
                alt={"Input da rua"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="bairro"
                labelVersion={2}
                value={bairro}
                onChange={onChangeBairro}
                alt={"Input do bairro"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="CEP"
                labelVersion={2}
                value={cep}
                onChange={onChangeCep}
                alt={"Input da cep"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="foto"
                labelVersion={2}
                value=""
                onChange={onChangeFoto}
                alt={"Input do foto"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
                type="file"
              />
              {foto && (
                <Image
                  src={`${foto}`}
                  alt={"exmple"}
                  width={100}
                  height={100}
                />
              )}
              <Input
                label="salário"
                labelVersion={2}
                value={salario}
                onChange={onChangeSalario}
                alt={"Input da foto"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              {props.isEditing ? (
                <ComboBox
                  data={mockedDataStatus}
                  label="Status"
                  stateToGetId={setAtivo}
                />
              ) : (
                ""
              )}
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
