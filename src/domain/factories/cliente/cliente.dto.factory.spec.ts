import { Test, TestingModule } from '@nestjs/testing';
import { ClienteDTOFactory } from './cliente.dto.factory';
import { clienteDTOMock, clienteModelMock } from 'src/mocks/cliente.mock';

describe('ClienteDTOFactory', () => {
  let clienteDTOFactory: ClienteDTOFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteDTOFactory],
    }).compile();

    clienteDTOFactory = module.get<ClienteDTOFactory>(ClienteDTOFactory);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um clienteDTO', () => {
    const result = clienteDTOFactory.criarClienteDTO(clienteModelMock);
    expect(result).toStrictEqual(clienteDTOMock);
  });

  it('deve criar uma lista de clienteDTO', () => {
    const result = clienteDTOFactory.criarListaClienteDTO([clienteModelMock]);
    expect(result).toStrictEqual([clienteDTOMock]);
  });

  it('deve criar uma lista vazia de clienteDTO', () => {
    const result = clienteDTOFactory.criarListaClienteDTO([]);
    expect(result).toStrictEqual([]);
  });
});
