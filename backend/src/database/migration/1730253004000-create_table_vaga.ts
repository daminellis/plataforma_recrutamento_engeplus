import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVaga1730253004000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE vaga (
                id INT PRIMARY KEY AUTO_INCREMENT,
                titulo VARCHAR(100) NOT NULL,
                salario_minimo DECIMAL(10, 2) NOT NULL,
                salario_maximo DECIMAL(10, 2) NOT NULL,
                educacao ENUM('Ensino Médio', 'Superior', 'Pós-Graduação') NOT NULL,
                tempo_experiencia ENUM('Menos de 1 ano', '1-3 anos', '3-5 anos', 'Mais de 5 anos') NOT NULL,
                nivel_experiencia ENUM('Júnior', 'Pleno', 'Sênior') NOT NULL,
                modalidade ENUM('Presencial', 'Remoto', 'Híbrido') NOT NULL,
                qtd_vagas INT NOT NULL,
                data_expiracao DATE NOT NULL,
                descricao TEXT NOT NULL,
                responsabilidades TEXT NOT NULL,
                regiao VARCHAR(255) NOT NULL,
                data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                disponivel BOOLEAN DEFAULT TRUE NOT NULL,
                recrutadorId INT,
                setorId INT NOT NULL,
                CONSTRAINT FK_recrutador FOREIGN KEY (recrutadorId) REFERENCES usuario(id),
                CONSTRAINT FK_setor_vaga FOREIGN KEY (setorId) REFERENCES setor(id)
            );
        `);

    await queryRunner.query(`
            CREATE TABLE vaga_tags_tag (
                vagaId INT NOT NULL,
                tagId INT NOT NULL,
                CONSTRAINT FK_vaga_tag FOREIGN KEY (vagaId) REFERENCES vaga(id) ON DELETE CASCADE,
                CONSTRAINT FK_tag FOREIGN KEY (tagId) REFERENCES tag(id) ON DELETE CASCADE,
                PRIMARY KEY (vagaId, tagId)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE vaga_tags_tag;`);
    await queryRunner.query(`DROP TABLE vaga;`);
  }
}
