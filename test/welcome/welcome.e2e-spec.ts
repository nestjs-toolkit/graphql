import { gql } from 'apollo-server-fastify';
import { GuestPersona } from '../stub/personas';

type QueryTimeZone = {
  date: string;
};

const QUERY_HELLO = gql`
  query {
    hello
  }
`;

const QUERY_TIMEZONE = gql`
  query test($date: Date!) {
    testCustomData(date: $date) {
      utc
      iso
      string
      timezone(offset: "+01:30")
      transform(format: "HH:mm")
    }
  }
`;

describe('Welcome (e2e)', () => {
  const guestPersona = new GuestPersona();

  beforeAll(async () => {
    await guestPersona.init();
  });

  afterAll(async () => {
    await guestPersona.close();
  });

  it('Http Hello', async () => {
    const response = await guestPersona.http.request('/');

    response.assertNoErrors().assertPropertyVal('Hello World!', 'message');
  });

  it('Query hello', async () => {
    const response = await guestPersona.gql.request(QUERY_HELLO);

    response.assertNoErrors().assertPropertyVal('Hello World!', null);
  });

  it('Timezone UTC', async () => {
    const response = await guestPersona.gql.request<QueryTimeZone>(
      QUERY_TIMEZONE,
      { date: '2021-05-25T08:10:12.000-03:00' },
    );

    response
      .assertNoErrors()
      .dump()
      .assertPropertyVal('11:10', 'transform')
      .assertPropertyVal('2021-05-25T11:10:12.000+00:00', 'iso')
      .assertPropertyVal('2021-05-25T11:10:12.000Z', 'utc')
      .assertPropertyVal('Tue May 25 2021 11:10:12 GMT+0000', 'string')
      .assertPropertyVal('2021-05-25T12:40:12.000+01:30', 'timezone');
  });

  it('Timezone Sao_Paulo', async () => {
    const response = await guestPersona.gql.request<QueryTimeZone>(
      QUERY_TIMEZONE,
      { date: '2021-05-25T08:10:12.000-03:00' },
      {
        'Time-Zone': 'America/Sao_Paulo',
      },
    );

    response
      .assertNoErrors()
      .dump()
      .assertPropertyVal('08:10', 'transform')
      .assertPropertyVal('2021-05-25T08:10:12.000-03:00', 'iso')
      .assertPropertyVal('2021-05-25T11:10:12.000Z', 'utc')
      .assertPropertyVal('Tue May 25 2021 08:10:12 GMT-0300', 'string')
      .assertPropertyVal('2021-05-25T12:40:12.000+01:30', 'timezone');
  });
});
