import { userRepo } from "../repository";

export default class UserService {
  async findUserById(userId: string): Promise<UserType | undefined> {
    const gettingUserById = userRepo.findUserById(userId);
    return gettingUserById;
  }
  async findAll(): Promise<UserType[] | undefined> {
    return userRepo.findAll();
  }
  async createUser(userDTO: UserType): Promise<UserType | undefined> {
    return userRepo.createUser(userDTO);
  }
  async updateUser(id: string, userDTO: UserType): Promise<UserType | undefined> {
    return userRepo.updateUser(id, userDTO);
  }
}
