import { clienteEntityMock } from 'src/mocks/cliente.mock';
import { StatusPedido } from 'src/utils/pedido.enum';
import { ClienteEntity } from '../cliente/cliente.entity';
import { PedidoEntity } from './pedido.entity';
import { itemPedidoEntityMock } from 'src/mocks/item_pedido.mock';
import { ItemPedidoEntity } from './item_pedido.entity';

describe('PedidoEntity', () => {
  let itensPedido: ItemPedidoEntity[];
  let statusPedido: StatusPedido;
  let numeroPedido: string;
  let cliente: ClienteEntity;
  let id: string;

  beforeEach(() => {
    // Defina as variáveis antes de cada teste
    itensPedido = [itemPedidoEntityMock];
    statusPedido = StatusPedido.RECEBIDO;
    numeroPedido = '05012024';
    cliente = clienteEntityMock;
    id = '0a14aa4e-75e7-405f-8301-81f60646c93d';
  });

  it('deve criar uma instância de PedidoEntity', () => {
    const pedido = new PedidoEntity(
      itensPedido,
      statusPedido,
      numeroPedido,
      cliente,
      id,
    );

    expect(pedido.itensPedido).toEqual(itensPedido);
    expect(pedido.statusPedido).toEqual(statusPedido);
    expect(pedido.numeroPedido).toEqual(numeroPedido);
    expect(pedido.cliente).toEqual(cliente);
    expect(pedido.id).toEqual(id);
  });

  it('deve criar uma instância de PedidoEntity sem cliente e id', () => {
    const pedido = new PedidoEntity(itensPedido, statusPedido, numeroPedido);

    expect(pedido.itensPedido).toEqual(itensPedido);
    expect(pedido.statusPedido).toEqual(statusPedido);
    expect(pedido.numeroPedido).toEqual(numeroPedido);
    expect(pedido.cliente).toBeUndefined();
    expect(pedido.id).toBeUndefined();
  });
});
