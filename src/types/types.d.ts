interface Login {
  email: string;
  senha: string;
}

type TokenResponse = {
  email: string;
  token: string;
};

interface UserType {
  _id: string;
  nome: string;
  email: string;
  dataNascimento: Date;
  dataAdmisao?: Date;
  dataDemisao?: Date;
  obsDemisao?: string;
  rua: string;
  bairro: string;
  cep: string;
  foto?: string;
  ativo?: boolean;
  salario: number;
  admin?: boolean;
}

interface ClienteType {
  _id: string;
  nome: string;
  dataNascimento: Date;
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
