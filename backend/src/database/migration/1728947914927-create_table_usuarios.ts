import { query } from 'express';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsuarios1728947914927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            `);
  }
}
