import { serviceModuleRepo } from "../repository";

export default class ServicoModuleService {
  async createServico(data: ServicoType): Promise<ServicoType | undefined> {
    return serviceModuleRepo.createService(data);
  }
  async getAllService(): Promise<ServicoTypeReturned[] | undefined> {
    return serviceModuleRepo.getAllService();
  }
  async updateServico(
    id: string,
    servicoDTO: ServicoType
  ): Promise<ServicoTypeReturned | undefined> {
    return serviceModuleRepo.updateService(id, servicoDTO);
  }
}
