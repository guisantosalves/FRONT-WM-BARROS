import * as React from "react";
import Input from "@/components/input";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "@/components/button";
import { AuthService } from "@/modules/auth/service";

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

  // React.useEffect(() => {
  //   const token = AuthService.Login({
  //     email: "finato@bea.com",
  //     senha: "caaaaaaa",
  //   });
  //   console.log(token);
  // }, []);

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
        <div className={styles.containerInputs}>
          <Input
            label="Email"
            value={email}
            alt="input for email"
            onChange={onChangeEmail}
            width={450}
            placeholder="ex: guilherme@gmail.com"
            labelWeight={700}
          />
          <Input
            label="Senha"
            value={password}
            alt="input for password"
            onChange={onChangePassword}
            width={450}
            type="password"
            customStyle={{
              marginTop: "2rem",
            }}
            labelWeight={700}
          />
        </div>
        <div className={styles.containerBtnForgetPass}>
          <Button
            onClick={() => console.log("topper")}
            backgroundColor="#081225"
            padding={[13, 75, 13, 75]}
            borderRadius
            color="#B5C2CA"
            fontSize={19}
            fontWeight={500}
          >
            Fazer login
          </Button>
          <p className={styles.forgetPass}>Esqueceu sua senha?</p>
        </div>
      </div>
    </div>
  );
}
