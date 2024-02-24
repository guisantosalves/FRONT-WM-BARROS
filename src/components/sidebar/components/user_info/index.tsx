import * as React from "react";
import UserAvatar from "../user_avatar";
import { userService } from "@/modules/user/service";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

export default function UserInfo() {
  const [userInfo, setUserInfo] = React.useState<UserType>();
  const router = useRouter();

  const getUserById = React.useCallback(async () => {
    const currentUserId = sessionStorage.getItem("user_id");
    if (currentUserId) {
      const userInf = await userService.findUserById(currentUserId);
      setUserInfo(userInf);
    }
  }, []);

  React.useEffect(() => {
    getUserById();
  }, []);

  const handleLogOut = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  console.log(userInfo);

  return (
    <div className={styles.containerUserInfo}>
      <UserAvatar photo={userInfo?.foto} />
      <p className={styles.name}>
        {userInfo && userInfo.nome ? userInfo.nome : ""}
      </p>
      <p className={styles.email}>
        {userInfo && userInfo.email ? userInfo.email : ""}
      </p>
      <p className={styles.sair} onClick={handleLogOut}>
        Sair
      </p>
    </div>
  );
}
