interface Login {
  email: string;
  senha: string;
}

type TokenResponse = {
  email: string;
  token: string;
};

interface UserType {
  _id?: string;
  nome: string;
  email: string;
  dataNascimento: string;
  dataAdmisao?: string;
  dataDemisao?: string;
  obsDemisao?: string;
  rua: string;
  bairro: string;
  cep: string;
  foto?: string;
  ativo?: boolean;
  salario: number;
  admin?: boolean;
  senha: string;
}

interface ClienteType {
  _id?: string;
  nome: string;
  dataNascimento: string;
  rua: string;
  obs?: string;
  bairro: string;
  cep: string;
  foto?: string;
  ativo?: boolean;
}

type tokenDecode = {
  id: string;
  iat: number;
};

interface ServicoType {
  nome: string;
  descricao?: string;
  valor: number;
  tempoServico?: number;
  ativo: boolean;
  funcionario: string;
  cliente: string;
  status: number; // 0 -> agendado / 1 -> em atendimento / 2 -> finalizado / 3 -> cancelado
}

interface ServicoTypeReturned {
  _id: string;
  nome: string;
  descricao?: string;
  valor: number;
  tempoServico?: number;
  ativo: boolean;
  funcionario: UserType;
  cliente: ClienteType;
  status: number; // 0 -> agendado / 1 -> em atendimento / 2 -> finalizado / 3 -> cancelado
}
