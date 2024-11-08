import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import Setor from '../../model/setor.entity';

export default setSeederFactory(Setor, () => {
    const setor = new Setor();
    setor.nome = faker.commerce.department();
    return setor;
});