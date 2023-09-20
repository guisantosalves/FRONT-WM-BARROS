import * as React from "react";
import Input from "@/components/input";
import styles from "./styles.module.css";
import Image from "next/image";

// pegar as informaçoes do context, se o user já estiver logado fazer mandar para o /dashboard
export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onChangeEmail = (emailCurr: string) => {
    setEmail(emailCurr);
  };

  const onChangePassword = (passwordCurr: string) => {
    setPassword(passwordCurr);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerLogin}>
        <div className={styles.containerLogoTitle}>
          <Image
            src={"/logo-login.png"}
            alt={"logo mulher"}
            width={70}
            height={70}
          />
          <h1 className={styles.titleService}>Services</h1>
        </div>
        <Input
          label="Email"
          value={email}
          alt="input for email"
          onChange={onChangeEmail}
          width={450}
          placeholder="ex: guilherme@gmail.com"
        />
        <Input
          label="Senha"
          value={password}
          alt="input for password"
          onChange={onChangePassword}
          width={450}
          type="password"
        />
        {/* component botao */}
        {/* esqueceu sua senha */}
      </div>
    </div>
  );
}
