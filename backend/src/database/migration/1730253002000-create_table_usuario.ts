import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsuario1730253002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE usuario (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL UNIQUE,
            nome_completo VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            senha_hash VARCHAR(70) NOT NULL,
            tipo_usuario ENUM('Administrador', 'Recursos Humanos', 'Líder') NOT NULL,
            cargoId INT NOT NULL,
            setorId INT NOT NULL,
            CONSTRAINT FK_cargo FOREIGN KEY (cargoId) REFERENCES cargo(id),
            CONSTRAINT FK_setor FOREIGN KEY (setorId) REFERENCES setor(id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE usuario;
        `);
  }
}
