import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateMigration1731334805339 implements MigrationInterface {
    name = 'GenerateMigration1731334805339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`setor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(50) NOT NULL, UNIQUE INDEX \`IDX_0d9d3f7f072e028a5601e07a97\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cargo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(50) NOT NULL, \`descricao\` text NOT NULL, UNIQUE INDEX \`IDX_5511f6fba69ccf2c6147d98319\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`nome_completo\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`senha\` varchar(70) NOT NULL, \`tipo_usuario\` enum ('Administrador', 'Recursos Humanos', 'Líder') NOT NULL, \`cargoId\` int NULL, \`setorId\` int NULL, UNIQUE INDEX \`IDX_6ccff37176a6978449a99c82e1\` (\`username\`), UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(50) NOT NULL, \`cor_tag\` varchar(7) NOT NULL, UNIQUE INDEX \`IDX_cb0841b6ede0938edc2758a40d\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vaga\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`salario_minimo\` decimal(10,2) NOT NULL, \`salario_maximo\` decimal(10,2) NOT NULL, \`educacao\` enum ('Ensino Médio', 'Superior', 'Pós-Graduação') NOT NULL, \`tempo_experiencia\` enum ('Menos de 1 ano', '1-3 anos', '3-5 anos', 'Mais de 5 anos') NOT NULL, \`nivel_experiencia\` enum ('Júnior', 'Pleno', 'Sênior') NOT NULL, \`modalidade\` enum ('Presencial', 'Remoto', 'Híbrido') NOT NULL, \`qtd_vagas\` int NOT NULL, \`data_expiracao\` date NOT NULL, \`descricao\` text NOT NULL, \`responsabilidades\` text NOT NULL, \`regiao\` varchar(50) NOT NULL, \`data_postagem\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`disponivel\` tinyint NOT NULL DEFAULT 1, \`recrutadorId\` int NOT NULL, \`setorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidatura_tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(50) NOT NULL, \`cor_tag\` varchar(7) NOT NULL, UNIQUE INDEX \`IDX_3029f8406b7b64798a9b5d78f2\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidatura\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_completo\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`descricao\` text NOT NULL, \`cv_data\` longblob NOT NULL, \`cv_type\` varchar(50) NOT NULL, \`data_candidatura\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`favorito\` tinyint NOT NULL DEFAULT 0, \`status\` enum ('Ativo', 'Inativo', 'Aprovado', 'Reprovado') NOT NULL DEFAULT 'Ativo', \`vagaId\` int NOT NULL, \`candidaturaTagIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banco_talentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_completo\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`telefone\` varchar(11) NOT NULL, \`descricao\` text NOT NULL, \`cv_data\` longblob NOT NULL, \`dataRegistro\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`vagaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vaga_tags_tag\` (\`vagaId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_8ea1cf79d09c11a32b6952ed81\` (\`vagaId\`), INDEX \`IDX_a3ce448847f1a94723bfd869c6\` (\`tagId\`), PRIMARY KEY (\`vagaId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_7db14c51775d26f3fdbd0a88cde\` FOREIGN KEY (\`cargoId\`) REFERENCES \`cargo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_de6acb8a383199731eb6d302d4c\` FOREIGN KEY (\`setorId\`) REFERENCES \`setor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaga\` ADD CONSTRAINT \`FK_bd320de087ff3746886297cdcb4\` FOREIGN KEY (\`recrutadorId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaga\` ADD CONSTRAINT \`FK_5814b5e52e025c726ad55102788\` FOREIGN KEY (\`setorId\`) REFERENCES \`setor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidatura\` ADD CONSTRAINT \`FK_7499b62a371344c8346892b4baf\` FOREIGN KEY (\`vagaId\`) REFERENCES \`vaga\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidatura\` ADD CONSTRAINT \`FK_b77401742c944cea5c951ea6705\` FOREIGN KEY (\`candidaturaTagIdId\`) REFERENCES \`candidatura_tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`banco_talentos\` ADD CONSTRAINT \`FK_3280e790190d6a4c7691a603622\` FOREIGN KEY (\`vagaId\`) REFERENCES \`vaga\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaga_tags_tag\` ADD CONSTRAINT \`FK_8ea1cf79d09c11a32b6952ed818\` FOREIGN KEY (\`vagaId\`) REFERENCES \`vaga\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vaga_tags_tag\` ADD CONSTRAINT \`FK_a3ce448847f1a94723bfd869c6b\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaga_tags_tag\` DROP FOREIGN KEY \`FK_a3ce448847f1a94723bfd869c6b\``);
        await queryRunner.query(`ALTER TABLE \`vaga_tags_tag\` DROP FOREIGN KEY \`FK_8ea1cf79d09c11a32b6952ed818\``);
        await queryRunner.query(`ALTER TABLE \`banco_talentos\` DROP FOREIGN KEY \`FK_3280e790190d6a4c7691a603622\``);
        await queryRunner.query(`ALTER TABLE \`candidatura\` DROP FOREIGN KEY \`FK_b77401742c944cea5c951ea6705\``);
        await queryRunner.query(`ALTER TABLE \`candidatura\` DROP FOREIGN KEY \`FK_7499b62a371344c8346892b4baf\``);
        await queryRunner.query(`ALTER TABLE \`vaga\` DROP FOREIGN KEY \`FK_5814b5e52e025c726ad55102788\``);
        await queryRunner.query(`ALTER TABLE \`vaga\` DROP FOREIGN KEY \`FK_bd320de087ff3746886297cdcb4\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_de6acb8a383199731eb6d302d4c\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_7db14c51775d26f3fdbd0a88cde\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3ce448847f1a94723bfd869c6\` ON \`vaga_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_8ea1cf79d09c11a32b6952ed81\` ON \`vaga_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`vaga_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`banco_talentos\``);
        await queryRunner.query(`DROP TABLE \`candidatura\``);
        await queryRunner.query(`DROP INDEX \`IDX_3029f8406b7b64798a9b5d78f2\` ON \`candidatura_tag\``);
        await queryRunner.query(`DROP TABLE \`candidatura_tag\``);
        await queryRunner.query(`DROP TABLE \`vaga\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb0841b6ede0938edc2758a40d\` ON \`tag\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ccff37176a6978449a99c82e1\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_5511f6fba69ccf2c6147d98319\` ON \`cargo\``);
        await queryRunner.query(`DROP TABLE \`cargo\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d9d3f7f072e028a5601e07a97\` ON \`setor\``);
        await queryRunner.query(`DROP TABLE \`setor\``);
    }

}
