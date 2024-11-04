import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTag1730253003000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tag (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(50) NOT NULL UNIQUE,
                cor_tag VARCHAR(255) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE vaga_tags_tag;`);
        await queryRunner.query(`DROP TABLE tag;`);
    }

}
