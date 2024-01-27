import React, { useState } from "react";
import styles from "./styles.module.css";
import ModalServico from "@/components/modals/modal_servico";
import ModalCliente from "@/components/modals/modal_cliente";

type Props = {
  data: ClienteType[];
  atualizar: () => void;
};

function CardCliente({ data, atualizar }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ClienteType>();

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
          atualizar={atualizar}
        />
      )}
      <div className={styles.wrapper}>
        {data.map((itemIterator, index) => {
          return (
            <div
              key={index}
              className={styles.card}
              onClick={() => {
                setSelectedItem(itemIterator);
                setShowModal(true);
              }}
            >
              <div>
                <p className={styles.paragraph}>nome: {itemIterator.nome}</p>
                <p className={styles.paragraph}>
                  data de nascimento: {itemIterator.dataNascimento.toString()}
                </p>
              </div>
              <div>
                <p className={styles.paragraph}>observação: {itemIterator.obs ?? "..."}</p>
                <p className={styles.paragraph}>CEP: {itemIterator.cep}</p>
                <p className={styles.paragraph}>
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
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardCliente;
