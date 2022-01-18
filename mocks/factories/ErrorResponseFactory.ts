import { Factory } from 'rosie';
import faker from '@faker-js/faker';
import { ErrorResponse, ErrorDetail } from '~/shared/types';

const ErrorDetailFactory = Factory.define<ErrorDetail>('ErrorDetail').attrs({
  loc: faker.random.arrayElements(),
  msg: () => faker.lorem.sentence(),
  type: () => faker.system.mimeType(),
});

export const ErrorResponseFactory = Factory.define<ErrorResponse>(
  'ErrorResponse',
).attrs({
  detail: () => {
    const random = Math.ceil(Math.random() * 5);
    return ErrorDetailFactory.buildList(random);
  },
});
