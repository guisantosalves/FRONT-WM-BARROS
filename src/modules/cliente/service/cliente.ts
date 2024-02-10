import { clienteRepo } from "../repository";

export default class ClienteService {
  async findUserById(clienteId: string): Promise<ClienteType | undefined> {
    const gettingUserById = clienteRepo.findClienteById(clienteId);
    return gettingUserById;
  }

  async findAll(): Promise<ClienteType[] | undefined> {
    return clienteRepo.findAll();
  }

  async createClient(
    clienteDTO: ClienteType
  ): Promise<ClienteType | undefined> {
    return clienteRepo.createClient(clienteDTO);
  }

  async updateClient(
    clienteDTO: ClienteType,
    idCliente: string
  ): Promise<ClienteType | undefined> {
    return clienteRepo.updateClient(clienteDTO, idCliente);
  }
}
