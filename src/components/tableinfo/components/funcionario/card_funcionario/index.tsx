import React, { useState } from "react";
import styles from "./styles.module.css";
import ModalServico from "@/components/modals/modal_servico";
import ModalFuncionario from "@/components/modals/modal_funcionario";

type Props = {
  data: UserType[];
  atualizar: () => void;
};

function CardFuncionario({ data, atualizar }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<UserType>();

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
                <p className={styles.paragraph}>{itemIterator.nome}</p>
                <p className={styles.paragraph}>
                  {itemIterator.email ?? "..."}
                </p>
              </div>
              <div>
                <p className={styles.paragraph}>{itemIterator.rua}</p>
                <p className={styles.paragraph}>{itemIterator.cep}</p>
                <p className={styles.paragraph}>{itemIterator.salario}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardFuncionario;
