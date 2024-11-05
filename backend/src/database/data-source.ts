// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './typeorm.config';

// Cria uma instância do ConfigService para acessar as variáveis de ambiente
const configService = new ConfigService();

// Cria a configuração de banco de dados usando a função compartilhada
const dataSourceOptions = getTypeOrmConfig(configService);

// Exporta o DataSource para ser usado pelo CLI do TypeORM
export default new DataSource(dataSourceOptions as any);