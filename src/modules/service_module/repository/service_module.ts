export default class ServiceModule {
  async createService(data: ServicoType): Promise<ServicoType | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      authorization: token,
    });

    const options: RequestInit = {
      method: "POST",
      headers: header,
      mode: "cors",
      body: JSON.stringify(data),
    };

    const response = await fetch(`http://localhost:3002/servicos`, options);

    if (response.ok) {
      return (await response.json()) as ServicoType;
    } else {
      return undefined;
    }
  }
}
