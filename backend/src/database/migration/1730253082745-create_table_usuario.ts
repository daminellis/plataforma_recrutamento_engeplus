import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsuario1730253082745 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE usuarios (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL UNIQUE,
            nome_completo VARCHAR(100),
            email VARCHAR(100) NOT NULL UNIQUE,
            senha_hash VARCHAR(70),
            tipo_usuario ENUM('Administrador', 'Recursos Humanos', 'Lider'),
            cargoId INT,
            setorId INT,
            CONSTRAINT FK_cargo FOREIGN KEY (cargoId) REFERENCES cargo(id),
            CONSTRAINT FK_setor FOREIGN KEY (setorId) REFERENCES setor(id)
          );
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE usuarios;
        `);
      }
}
