import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../../input";
import ComboBox from "../../combo_box";
import Button from "../../button";
import { servicoService } from "@/modules/service_module/service";
import Image from "next/image";
import { clienteService } from "@/modules/cliente/service";

type Props = {
  setIsOpen: (param: boolean) => void;
  isEditing?: boolean;
  data?: ClienteType;
  atualizar?: () => void;
};

export interface genericCombo {
  id: string;
  nome: string;
}

export default function ModalCliente(props: Props) {
  const [name, setName] = React.useState<string>("");
  const [dataNascimento, setDataNascimento] = React.useState<string>();
  const [cep, setCep] = React.useState<string>("");
  const [rua, setRua] = React.useState<string>("");
  const [bairro, setBairro] = React.useState<string>("");
  const [foto, setFoto] = React.useState<string>("");
  const [observacao, setObservacao] = React.useState<string>("");
  const [statusId, setStatusId] = React.useState<boolean>(false);
  const mockedDataStatus: genericCombo[] = [
    { id: "0", nome: "Inativo" },
    { id: "1", nome: "Ativo" },
  ];

  const onChangeName = (val: string | File) => {
    setName(val as string);
  };
  const onChangeDataNascimento = (val: string | File) => {
    setDataNascimento(val as string);
  };
  const onChangeCep = (val: string | File) => {
    setCep(val as string);
  };
  const onChangeRua = (val: string | File) => {
    setRua(val as string);
  };
  const onChangeBairro = (val: string | File) => {
    setBairro(val as string);
  };
  const onChangeFoto = async (val: string | File) => {
    setFoto(val as string);
  };
  const onChangeObservacao = (val: string | File) => {
    setObservacao(val as string);
  };

  React.useEffect(() => {
    if (props.isEditing && props.data) {
      setName(props.data.nome);
      setDataNascimento(props.data.dataNascimento);
      setCep(props.data.cep);
      setRua(props.data.rua);
      setBairro(props.data.bairro);
      setFoto(props.data.foto!);
      setObservacao(props.data.obs!);
      setStatusId(Boolean(props.data.ativo));
    }
  }, []);

  const submitData = async () => {
    const dataObj: ClienteType = {
      nome: name,
      dataNascimento: dataNascimento!,
      cep: cep,
      rua: rua,
      bairro: bairro,
      foto: foto,
      obs: observacao,
      ativo: true,
    };

    const dataSaved = await clienteService.createClient(dataObj);

    if (dataSaved) {
      alert("Serviço inserido com sucesso!");
    } else {
      alert("Serviço não inserido, Ocorreu algum erro!");
    }

    atualizarStateFather();
  };

  const clear = async () => {
    setName("");
    //setDataNascimento();
    onChangeCep("");
    onChangeRua("");
    onChangeBairro("");
    onChangeFoto("");
    //setStatusId();
    onChangeObservacao("");
  };

  const submitUpdate = async () => {
    const dataUpdate: ClienteType = {
      nome: name,
      dataNascimento: dataNascimento!,
      cep: cep,
      rua: rua,
      bairro: bairro,
      foto: foto,
      obs: observacao,
      ativo: true,
      _id: props.data?._id,
    };

    if (props.data && props.data._id) {
      if (dataUpdate.nome != "" || dataUpdate.nome != null) {
        
        const dataSaved = await clienteService.updateClient(
          dataUpdate,
          props.data._id
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

  React.useEffect(() => {
    console.log(props.data);
  }, []);

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
              {props.isEditing ? "Alterar" : "Cadastrar"} Cliente
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
                value={dataNascimento ? dataNascimento.substring(0, 10) : ""}
                onChange={(ev) => onChangeDataNascimento(ev)}
                alt={"Input data nascimento"}
                width={230}
                customStyle={{ marginBottom: "0.7rem" }}
                type={"date"}
              />
              <Input
                label="CEP"
                labelVersion={2}
                value={cep}
                onChange={onChangeCep}
                alt={"Input do cep"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Rua"
                labelVersion={2}
                value={rua}
                onChange={onChangeRua}
                alt={"Input da rua"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Bairro"
                labelVersion={2}
                value={bairro}
                onChange={onChangeBairro}
                alt={"Input do bairro"}
                width={230}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <div>
                <Input
                  label="Foto"
                  labelVersion={2}
                  value=""
                  onChange={onChangeFoto}
                  alt={"Input da foto"}
                  width={230}
                  placeholder={"Digite aqui..."}
                  customStyle={{ marginBottom: "0.7rem" }}
                  type={"file"}
                />
                {foto && (
                  <Image
                    src={`${foto}`}
                    alt={"exmple"}
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <Input
                label="Observação"
                labelVersion={2}
                value={observacao}
                onChange={onChangeObservacao}
                alt={"Input da observação"}
                width={props.isEditing ? 230 : 530}
                placeholder={"Digite aqui..."}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              {/* {props.isEditing ? (
                <ComboBox
                  data={mockedDataStatus}
                  label="Status"
                  //stateToGetId={setStatusId}
                />
              ) : (
                ""
              )} */}
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
