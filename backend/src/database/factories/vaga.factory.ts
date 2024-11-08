import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import {NivelDeEducacao, TempoDeExperiencia, Modalidade, Vaga} from '../../model/vaga.entity';
import Usuario from 'src/model/usuario.entity';
import Setor from 'src/model/setor.entity';

export default setSeederFactory(Vaga, async (factoryManager: any)=>{
    const vaga = new Vaga();
    vaga.titulo = faker.name.jobTitle();
    vaga.salarioMinimo = parseFloat(faker.finance.amount());
    vaga.salarioMaximo = parseFloat(faker.finance.amount());
    vaga.educacao = faker.helpers.arrayElement(['Ensino Médio', 'Superior', 'Pós-Graduação']) as NivelDeEducacao;
    vaga.tempoExperiencia = faker.helpers.arrayElement(['Júnior', 'Pleno', 'Sênior']) as TempoDeExperiencia;
    vaga.modalidade = faker.helpers.arrayElement(['Híbrido', 'Presencial', 'Remoto']) as Modalidade;
    vaga.quantidadeVagas = faker.number.int(10);
    vaga.dataExpiracao = faker.date.future();
    vaga.descricao = faker.lorem.paragraph();
    vaga.responsabilidades = faker.helpers.arrayElements(faker.lorem.paragraphs().split('\n'));
    vaga.regiao = faker.location.city();
    vaga.setor = await factoryManager.get(Setor).create();

    const recrutador = new Usuario();
    recrutador.id = faker.number.int(3);
    vaga.recrutador = recrutador;
    
    return vaga;
})