import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.css";
import { SidebarType } from "@/components/sidebar";
import Navbar from "@/components/navbar";
import TableInfo from "@/components/tableinfo";
import { typeTable } from "@/components/tableinfo";

function Funcionario() {
  const router = useRouter();

  React.useEffect(() => {
    const loggedInfo = sessionStorage.getItem("user_id");
    if (!loggedInfo) {
      router.push("/login");
    }
  }, []);

  return (
    <div className={styles.containerPage}>
      <Sidebar title="Funcionario" type={SidebarType.funcionario} />
      <div style={{ width: "100%" }}>
        <Navbar />
        <TableInfo type={typeTable.funcionario} />
        {/* <Graphs /> */}
      </div>
    </div>
  );
}

export default Funcionario;
