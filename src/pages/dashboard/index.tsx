import Sidebar from "@/components/sidebar";
import styles from "./styles.module.css";

export default function Dashboard() {
  return (
    <div className={styles.containerPage}>
      <Sidebar title="Services" />
    </div>
  );
}
