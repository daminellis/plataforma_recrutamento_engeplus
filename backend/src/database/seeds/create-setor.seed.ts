import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Setor } from '../../model/setor.entity';

export default class CreateUsuarios implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const usuarioFactory = factoryManager.get(Setor);
        await usuarioFactory.saveMany(15); // Insere 15 registros fictícios de setores
    }
}