import { Factory } from 'rosie';
import { Contents } from '~/data/services/services.model';
import faker from '@faker-js/faker';
import { WriterFactory } from './WriterFactory';

export const ContentsFactory = Factory.define<Contents>('Contents').attrs({
  contentsId: () => faker.datatype.number(),
  title: () => faker.name.title(),
  thumbnail: () => faker.lorem.sentences(1),
  introduction: () => faker.lorem.sentences(1),
  writer: () => WriterFactory.build(),
  language: () => 'ko',
  isTranslate: () => faker.datatype.boolean(),
  originalId: () => faker.datatype.number(),
  views: () => faker.datatype.number(),
  transitionNum: () => faker.datatype.number(),
});
