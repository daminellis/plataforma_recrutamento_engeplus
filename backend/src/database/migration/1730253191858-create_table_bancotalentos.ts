import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBancotalentos1730253191858
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE banco_talentos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome_completo VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                telefone TEXT NOT NULL,
                descricao TEXT NOT NULL,
                cv BLOB NOT NULL,
                vaga_id INT,
                CONSTRAINT FK_vaga FOREIGN KEY (vaga_id) REFERENCES vaga(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE banco_talentos;`);
  }
}
