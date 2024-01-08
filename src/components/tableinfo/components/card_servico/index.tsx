import React, { useState } from "react";
import styles from "./styles.module.css";
import Modal from "@/components/modal";

type Props = {
  data: ServicoTypeReturned[];
};

function CardServico({ data }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ServicoTypeReturned>();

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
        <Modal setIsOpen={showModalFunc} data={selectedItem} isEditing={true} />
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
                <p className={styles.paragraph}>{itemIterator.nome}</p>
                <p className={styles.paragraph}>
                  {itemIterator.descricao ?? "..."}
                </p>
              </div>
              <div>
                <p className={styles.paragraph}>
                  {itemIterator.funcionario?.nome}
                </p>
                <p className={styles.paragraph}>{itemIterator.cliente?.nome}</p>
                <p className={styles.paragraph}>
                  {renderStatus(itemIterator.status)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardServico;
