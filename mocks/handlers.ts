import { rest } from 'msw';
import { API_URL } from '~/shared/constants/environments';
import { ContentsFactory, ErrorResponseFactory } from './factories';

export const handlers = [
  rest.get(`${API_URL}/services/main_contents`, (req, res, ctx) => {
    const keyword = req.url.searchParams.get('keyword');

    if (keyword !== 'invalid') {
      const random = Math.ceil(Math.random() * 25);
      const contents = ContentsFactory.buildList(random);
      return res(ctx.status(200), ctx.json(contents));
    } else {
      const errorResponse = ErrorResponseFactory.build();
      return res(ctx.status(422), ctx.json(errorResponse));
    }
  }),
  rest.get(`${API_URL}/services/main_writers`, (req, res, ctx) => {
    return res(
      ctx.json({
        status_code: 200,
        msg: '응답 성공',
        data: {
          main_writer_list: [
            {
              writer_name: '장발장',
              writer_id: '10asff',
            },
            {
              writer_name: '어제의 나',
              writer_id: '10asfg',
            },
          ],
        },
      }),
    );
  }),
  rest.get(`${API_URL}/services/reading_contents`, (req, res, ctx) => {
    return res(
      ctx.json({
        status_code: 200,
        msg: '응답 성공',
        data: {
          main_writer_list: [
            {
              writer_name: '장발장',
              writer_id: '10asff',
            },
            {
              writer_name: '어제의 나',
              writer_id: '10asfg',
            },
          ],
        },
      }),
    );
  }),
];
