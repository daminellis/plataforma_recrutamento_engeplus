import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Vaga } from '../../model/vaga.entity';

export default class CreateUsuarios implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const usuarioFactory = factoryManager.get(Vaga);
        await usuarioFactory.saveMany(20); // Insere 20 registros fictícios de usuários
    }
}