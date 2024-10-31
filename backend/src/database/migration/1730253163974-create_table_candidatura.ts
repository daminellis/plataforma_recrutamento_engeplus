import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCandidatura1730253163974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE candidatura (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome_completo VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                telefone TEXT NOT NULL,
                descricao TEXT NOT NULL,
                cv BLOB NOT NULL,
                data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                favorito BOOLEAN DEFAULT FALSE,
                status ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO' NOT NULL,
                vaga_id INT,
                candidatura_tag_id INT,
                CONSTRAINT FK_vaga FOREIGN KEY (vaga_id) REFERENCES vaga(id),
                CONSTRAINT FK_candidatura_tag FOREIGN KEY (candidatura_tag_id) REFERENCES candidatura_tag(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE candidatura;`);
  }
}
