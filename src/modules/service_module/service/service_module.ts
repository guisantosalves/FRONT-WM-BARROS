import { serviceModuleRepo } from "../repository";

export default class ServicoModuleService {
  async createServico(data: ServicoType): Promise<ServicoType | undefined> {
    return serviceModuleRepo.createService(data);
  }
}
