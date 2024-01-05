import { clienteRepo } from "../repository";

export default class ClienteService {
  async findUserById(clienteId: string): Promise<ClienteType | undefined> {
    const gettingUserById = clienteRepo.findClienteById(clienteId);
    return gettingUserById;
  }
  async findAll(): Promise<ClienteType[] | undefined> {
    return clienteRepo.findAll();
  }
}
