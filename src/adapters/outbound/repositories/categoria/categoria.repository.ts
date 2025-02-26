import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaModel } from '../../models/categoria.model';
import { Repository } from 'typeorm';
import { ICategoriaRepository } from 'src/domain/ports/categoria/categoria.repository.port';
import { CategoriaEntity } from 'src/domain/entities/categoria/categoria.entity';

@Injectable()
export class CategoriaRepository implements ICategoriaRepository {
  constructor(
    @InjectRepository(CategoriaModel)
    private readonly categoriaRepository: Repository<CategoriaModel>,
  ) {}

  async criarCategoria(categoria: CategoriaEntity): Promise<CategoriaModel> {
    const categoriaModel = this.categoriaRepository.create(categoria);
    await this.categoriaRepository.save(categoriaModel);
    return categoriaModel;
  }

  async editarCategoria(
    categoriaId: string,
    categoria: CategoriaEntity,
  ): Promise<CategoriaModel> {
    const categoriaModel = this.categoriaRepository.create(categoria);
    await this.categoriaRepository.update(categoriaId, categoriaModel);

    return await this.categoriaRepository.findOne({
      where: { id: categoriaId },
    });
  }

  async excluirCategoria(categoriaId: string): Promise<void> {
    await this.categoriaRepository.softDelete({ id: categoriaId });
  }

  async buscarCategoriaPorId(
    categoriaId: string,
  ): Promise<CategoriaModel | null> {
    return await this.categoriaRepository.findOne({
      where: { id: categoriaId },
    });
  }

  async buscarCategoriaPorNome(
    nomeCategoria: string,
  ): Promise<CategoriaModel | null> {
    return await this.categoriaRepository.findOne({
      where: { nome: nomeCategoria },
    });
  }

  async listarCategorias(): Promise<CategoriaModel[] | []> {
    const categorias = await this.categoriaRepository.find({});
    return categorias;
  }
}
