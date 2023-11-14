export default class UserRepo {
  async findUserById(userId: string): Promise<UserType | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    console.log(userId);
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
      `http://localhost:3002/funcionario/${userId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as UserType;
    } else {
      return undefined;
    }
  }
}