import * as React from "react";
import styles from "./styles.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../input";
import ComboBox from "../combo_box";
import { userService } from "@/modules/user/service";

type Props = {
  setIsOpen: (param: boolean) => void;
};

export default function Modal(props: Props) {
  const [name, setName] = React.useState<string>("");
  const [valor, setValor] = React.useState<string>("");
  const [descricao, setDescricao] = React.useState<string>("");
  const [tempoServico, setTempoServico] = React.useState<string>("");

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
    console.log(allData);
  };

  React.useEffect(() => {
    getFuncionarios();
  }, []);

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
              {/* <ComboBox /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
