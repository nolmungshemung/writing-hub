import { rest, RestRequest } from 'msw';
import { WritingContentsRequest } from '~/data/services/services.model';
import { API_URL } from '~/shared/constants/environments';
import { ContentsFactory, ErrorResponseFactory } from './factories';

export const handlers = [
  rest.get(`${API_URL}/services/main_contents`, (req, res, ctx) => {
    const keyword = req.url.searchParams.get('keyword');
    const start = Number(req.url.searchParams.get('start'));
    const count = Number(req.url.searchParams.get('count'));

    const contents = ContentsFactory.buildList(100);

    if (keyword !== 'invalid') {
      return res(ctx.status(200), ctx.json(contents.splice(0, start + count)));
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
  rest.post(
    `${API_URL}/services/writing_contents`,
    (req: RestRequest<WritingContentsRequest>, res, ctx) => {
      const writingContents = req.body;
      if (writingContents?.title === '' || writingContents?.contents === '') {
        const errorResponse = ErrorResponseFactory.build();
        return res(ctx.status(422), ctx.json(errorResponse));
      }
      console.log(writingContents);
      return res(
        ctx.status(200),
        ctx.json({
          msg: '응답 성공',
          data: {},
        }),
      );
    },
  ),
];
