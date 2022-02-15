import { rest, RestRequest } from 'msw';
import { WritingContentsRequest } from '~/data/services/services.model';
import { UserData } from '~/data/user/user.model';
import { API_URL } from '~/shared/constants/environments';
import {
  ContentsFactory,
  ErrorResponseFactory,
  WriterFactory,
} from './factories';
import { camelizeKeys } from 'humps';

export const handlers = [
  rest.get(`${API_URL}/services/main_contents`, (req, res, ctx) => {
    const keyword = req.url.searchParams.get('keyword');

    if (keyword === 'notfound') {
      return res(
        ctx.status(404),
        ctx.json({
          msg: '해당 작품을 찾을 수 없습니다.',
          data: {},
        }),
      );
    } else if (keyword === 'invalid') {
      const errorResponse = ErrorResponseFactory.build();
      return res(ctx.status(422), ctx.json(errorResponse));
    } else {
      const start = Number(req.url.searchParams.get('start'));
      const count = Number(req.url.searchParams.get('count'));
      const contents = ContentsFactory.buildList(count);

      return res(
        ctx.status(200),
        ctx.json({
          msg: 'success!',
          data: {
            main_contents_list: contents,
            paging: {
              is_last: false,
              start,
            },
          },
        }),
      );
    }
  }),
  rest.get(`${API_URL}/services/main_writers`, (req, res, ctx) => {
    const keyword = req.url.searchParams.get('keyword');

    if (keyword === 'notfound') {
      return res(
        ctx.status(404),
        ctx.json({
          msg: '해당 작품을 찾을 수 없습니다.',
          data: {},
        }),
      );
    } else if (keyword === 'invalid') {
      const errorResponse = ErrorResponseFactory.build();
      return res(ctx.status(422), ctx.json(errorResponse));
    } else {
      const start = Number(req.url.searchParams.get('start'));
      const count = Number(req.url.searchParams.get('count'));
      const writers = WriterFactory.buildList(count);

      return res(
        ctx.status(200),
        ctx.json({
          msg: 'success!',
          data: {
            main_writer_list: writers,
            paging: {
              is_last: false,
              start,
            },
          },
        }),
      );
    }
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

      return res(
        ctx.status(200),
        ctx.json({
          msg: '응답 성공',
          data: {},
        }),
      );
    },
  ),
  rest.post(
    `${API_URL}/user/name_registration`,
    (req: RestRequest<UserData>, res, ctx) => {
      const userData = camelizeKeys(req.body) as UserData;
      console.log(userData);

      if (userData.userId === '') {
        const errorResponse = ErrorResponseFactory.build();
        return res(ctx.status(422), ctx.json(errorResponse));
      }

      if (userData.userName === 'invalid') {
        return res(
          ctx.status(404),
          ctx.json({
            msg: '이미 존재하는 필명입니다.',
            data: {},
          }),
        );
      }

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
