import { Factory } from 'rosie';
import { Writer } from '~/data/services/services.model';
import faker from '@faker-js/faker';

export const WriterFactory = Factory.define<Writer>('Writer').attrs({
  writerId: () => faker.internet.email(),
  writerName: () => faker.name.firstName(),
});
