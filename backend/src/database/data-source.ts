// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const dataSourceOptions = typeOrmConfig;

export default new DataSource(dataSourceOptions as any);