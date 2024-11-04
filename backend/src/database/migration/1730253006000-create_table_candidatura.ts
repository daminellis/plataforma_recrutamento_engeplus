import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCandidatura1730253006000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE candidatura (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome_completo VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                telefone TEXT NOT NULL,
                descricao TEXT NOT NULL,
                cv_data LONGBLOB NOT NULL,
                cv_type VARCHAR(100) NOT NULL,
                data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                favorito BOOLEAN DEFAULT FALSE NOT NULL,
                status ENUM('ATIVO', 'INATIVO', 'APROVADO', 'REPROVADO') DEFAULT 'ATIVO' NOT NULL,
                vagaId INT NOT NULL,
                candidatura_tag_id INT,
                CONSTRAINT FK_vaga FOREIGN KEY (vagaId) REFERENCES vaga(id),
                CONSTRAINT FK_candidatura_tag FOREIGN KEY (candidatura_tag_id) REFERENCES candidatura_tag(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE candidatura;`);
  }
}
