import * as React from "react";
import styles from "./styles.module.css";
import ModalServico from "@/components/modals/modal_servico";
import ModalFuncionario from "@/components/modals/modal_funcionario";

type Props = {
  data: UserType[];
  atualizar: () => void;
};

export default function TableFuncionario(props: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<UserType>();

  const showModalFunc = (val: boolean) => {
    setShowModal(val);
  };

  return (
    <>
      {showModal && (
        <ModalFuncionario
          setIsOpen={showModalFunc}
          data={selectedItem}
          isEditing={true}
          atualizar={props.atualizar}
        />
      )}
      <div>
        <table className={styles.tableContainer}>
          <thead>
            <th>Nome</th>
            <th>Email</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>CEP</th>
            <th>Salário</th>
          </thead>
          <tbody>
            {props.data.map((itemIterator, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setSelectedItem(itemIterator);
                    setShowModal(true);
                  }}
                >
                  <td>{itemIterator.nome}</td>
                  <td>{itemIterator.email}</td>
                  <td>{itemIterator.rua}</td>
                  <td>{itemIterator.bairro}</td>
                  <td>{itemIterator.cep}</td>
                  <td>{itemIterator.salario}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
