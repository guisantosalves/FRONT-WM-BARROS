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

  async getAllService(): Promise<ServicoTypeReturned[] | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      authorization: token,
    });

    const options: RequestInit = {
      method: "GET",
      headers: header,
      mode: "cors",
    };

    const response = await fetch(`http://localhost:3002/servicos`, options);

    if (response.ok) {
      return (await response.json()) as ServicoTypeReturned[];
    } else {
      return undefined;
    }
  }

  async updateService(
    idServico: string,
    servicoDTO: ServicoType
  ): Promise<ServicoTypeReturned | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      authorization: token,
    });

    const options: RequestInit = {
      method: "PUT",
      headers: header,
      mode: "cors",
      body: JSON.stringify(servicoDTO),
    };

    const response = await fetch(
      `http://localhost:3002/servicos/${idServico}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ServicoTypeReturned;
    } else {
      return undefined;
    }
  }
}
