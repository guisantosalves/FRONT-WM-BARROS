export default class ClienteRepo {
  async findClienteById(userId: string): Promise<ClienteType | undefined> {
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

    const response = await fetch(
      `http://localhost:3002/cliente/${userId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ClienteType;
    } else {
      return undefined;
    }
  }

  async findAll() {
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

    const response = await fetch("http://localhost:3002/cliente", options);

    if (response.ok) {
      return (await response.json()) as ClienteType[];
    } else {
      return undefined;
    }
  }

  async createClient(clienteDTO: ClienteType) {
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
      body: JSON.stringify(clienteDTO),
    };

    const response = await fetch("http://localhost:3002/cliente", options);

    if (response.ok) {
      return (await response.json()) as ClienteType;
    } else {
      return undefined;
    }
  }

  async updateClient(clienteDTO: ClienteType, idCliente: string) {
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
      body: JSON.stringify(clienteDTO),
    };

    const response = await fetch(
      `http://localhost:3002/cliente/${idCliente}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ClienteType;
    } else {
      return undefined;
    }
  }
}
