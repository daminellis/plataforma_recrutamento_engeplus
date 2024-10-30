import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTag1730253145492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tag (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(50) NOT NULL UNIQUE,
                cor_tag VARCHAR(255) NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE vaga_tags_tag (
                vagaId INT NOT NULL,
                tagId INT NOT NULL,
                CONSTRAINT PK_vaga_tags_tag PRIMARY KEY (vagaId, tagId),
                CONSTRAINT FK_vaga FOREIGN KEY (vagaId) REFERENCES vaga(id) ON DELETE CASCADE,
                CONSTRAINT FK_tag FOREIGN KEY (tagId) REFERENCES tag(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE vaga_tags_tag;`);
        await queryRunner.query(`DROP TABLE tag;`);
    }

}
