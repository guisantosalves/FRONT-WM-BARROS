import * as React from "react";
import styles from "./styles.module.css";
import ModalServico from "@/components/modals/modal_servico";
import ModalCliente from "@/components/modals/modal_cliente";

type Props = {
  data: ClienteType[];
  atualizar: () => void;
};

export default function TableCliente(props: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ClienteType>();

  const renderStatus = (val: number): string => {
    switch (val) {
      case 0:
        return "agendado";
      case 1:
        return "em atendimento";
      case 2:
        return "finalizado";
      case 3:
        return "cancelado";
      default:
        return "";
    }
  };

  const showModalFunc = (val: boolean) => {
    setShowModal(val);
  };

  return (
    <>
      {showModal && (
        <ModalCliente
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
            <th>Data de nascimento</th>
            <th>CEP</th>
            <th>Observação</th>
            <th>ativo</th>
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
                  <td>{itemIterator.dataNascimento.toString()}</td>
                  <td>{itemIterator.cep}</td>
                  <td>{itemIterator.obs ?? "..."}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    {itemIterator.ativo ? (
                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "999px",
                          backgroundColor: "#097969",
                          width: "10px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          padding: "1rem",
                          borderRadius: "999px",
                          backgroundColor: " #FF5733 ",
                          width: "10px",
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
