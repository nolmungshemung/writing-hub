import { rest } from 'msw';
import { API_URL } from '~/shared/constants/environments';
import faker from '@faker-js/faker';

export const handlers = [
  rest.get(`${API_URL}/services/main_contents`, (req, res, ctx) => {
    // const { keyword } = req.params;

    console.log(faker.address.city());
    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        msg: '응답 성공',
        data: {
          main_contents_list: [
            {
              contents_id: 20,
              title: '장발장의 신나는 하루',
              thumbnail: '그때 내가 왜그랬는지 도무지 이해할 수 없네',
              introduction: '장발장의 하루를 담은 이야기',
              writer: {
                writer_name: '장발장',
                writer_id: '10asff',
              },
              language: '영어',
              is_translate: true,
              original_id: 24,
            },
            {
              contents_id: 21,
              title: '장발장의 신나는 하루2',
              thumbnail: '어제 내가 왜그랬는지 도무지 이해할 수 없네',
              introduction: '장발장의 어제를 담은 이야기',
              writer: {
                writer_name: '어제의 나',
                writer_id: '10asfg',
              },
              language: '한국어',
              is_translate: false,
              original_id: -1,
            },
          ],
        },
      }),
    );
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
