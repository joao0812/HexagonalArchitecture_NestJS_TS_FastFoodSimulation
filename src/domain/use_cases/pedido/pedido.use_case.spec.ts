import { Test, TestingModule } from '@nestjs/testing';
import { IPedidoRepository } from 'src/domain/ports/pedido/pedido.repository.port';
import { IPedidoFactory } from 'src/domain/ports/pedido/pedido.factory.port';
import { PedidoUseCase } from './pedido.use_case';
import {
  pedidoFactoryMock,
  pedidoRepositoryMock,
  pedidoModel,
  pedidoEntity,
  criaPedidoDTO,
  atualizaPedidoDTO,
  pedidoDTO,
} from 'src/mocks/pedido.mock';

describe('PedidoUseCase', () => {
  let pedidoUseCase: PedidoUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoUseCase,
        {
          provide: IPedidoRepository,
          useValue: pedidoRepositoryMock,
        },
        {
          provide: IPedidoFactory,
          useValue: pedidoFactoryMock,
        },
      ],
    }).compile();

    pedidoUseCase = module.get<PedidoUseCase>(PedidoUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um pedido', async () => {
    pedidoFactoryMock.criarEntidadePedido.mockReturnValue(pedidoEntity);
    pedidoRepositoryMock.criarPedido.mockReturnValue(pedidoModel);

    const result = await pedidoUseCase.criarPedido(criaPedidoDTO);

    expect(pedidoFactoryMock.criarEntidadePedido).toHaveBeenCalledWith(
      criaPedidoDTO,
    );
    expect(pedidoRepositoryMock.criarPedido).toHaveBeenCalledWith(pedidoEntity);
    expect(result).toStrictEqual({
      mensagem: 'Pedido criado com sucesso',
      body: pedidoDTO,
    });
  });

  it('deve editar o status de um pedido', async () => {
    const pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93d';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(pedidoModel);
    pedidoRepositoryMock.editarStatusPedido.mockReturnValue(pedidoModel);

    const result = await pedidoUseCase.editarPedido(
      pedidoId,
      atualizaPedidoDTO,
    );

    expect(pedidoRepositoryMock.buscarPedido).toHaveBeenCalledWith(pedidoId);
    expect(pedidoRepositoryMock.editarStatusPedido).toHaveBeenCalledWith(
      pedidoId,
      atualizaPedidoDTO.statusPedido,
    );
    expect(result).toStrictEqual({
      mensagem: 'Pedido atualizado com sucesso',
      body: pedidoDTO,
    });
  });

  it('deve editar o status de um pedido, pedido informado não existe', async () => {
    const pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93c';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(null);

    await expect(
      pedidoUseCase.editarPedido(pedidoId, atualizaPedidoDTO),
    ).rejects.toThrow('Pedido informado não existe');
    expect(pedidoRepositoryMock.buscarPedido).toHaveBeenCalledWith(pedidoId);
  });

  it('deve buscar um pedido por id', async () => {
    const pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93d';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(pedidoModel);

    const result = await pedidoUseCase.buscarPedido(pedidoId);

    expect(pedidoRepositoryMock.buscarPedido).toHaveBeenCalledWith(pedidoId);
    expect(result).toStrictEqual(pedidoDTO);
  });

  it('deve buscar um pedido por id, pedido informado não existe', async () => {
    const pedidoId = '0a14aa4e-75e7-405f-8301-81f60646c93c';

    pedidoRepositoryMock.buscarPedido.mockReturnValue(null);

    await expect(pedidoUseCase.buscarPedido(pedidoId)).rejects.toThrow(
      'Pedido informado não existe',
    );
    expect(pedidoRepositoryMock.buscarPedido).toHaveBeenCalledWith(pedidoId);
  });

  it('deve listar pedidos', async () => {
    pedidoRepositoryMock.listarPedidos.mockReturnValue([pedidoModel]);

    const result = await pedidoUseCase.listarPedidos();

    expect(pedidoRepositoryMock.listarPedidos).toHaveBeenCalledWith();
    expect(result).toStrictEqual([pedidoDTO]);
  });

  it('deve retornar uma lista vazia de pedidos', async () => {
    pedidoRepositoryMock.listarPedidos.mockReturnValue([]);

    const result = await pedidoUseCase.listarPedidos();

    expect(pedidoRepositoryMock.listarPedidos).toHaveBeenCalledWith();
    expect(result).toStrictEqual([]);
  });

  it('deve listar fila de pedidos recebidos', async () => {
    pedidoRepositoryMock.listarPedidosRecebido.mockReturnValue([pedidoModel]);

    const result = await pedidoUseCase.listarPedidosRecebido();

    expect(pedidoRepositoryMock.listarPedidosRecebido).toHaveBeenCalledWith();
    expect(result).toStrictEqual([pedidoDTO]);
  });

  it('deve retornar uma lista vazia de pedidos recebidos', async () => {
    pedidoRepositoryMock.listarPedidosRecebido.mockReturnValue([]);

    const result = await pedidoUseCase.listarPedidosRecebido();

    expect(pedidoRepositoryMock.listarPedidosRecebido).toHaveBeenCalledWith();
    expect(result).toStrictEqual([]);
  });
});
