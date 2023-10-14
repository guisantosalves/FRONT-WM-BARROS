export default class Auth {
  static async Login(LoginDTO: Login): Promise<TokenResponse | undefined> {
    const header = new Headers({
      "Content-Type": "application/json",
    });

    const options: RequestInit = {
      method: "POST",
      headers: header,
      mode: "cors",
      body: JSON.stringify(LoginDTO),
    };

    const response = await fetch("http://localhost:3002/login", options);

    if (response.ok) {
      return (await response.json()) as TokenResponse;
    } else {
      return undefined;
    }
  }
}
