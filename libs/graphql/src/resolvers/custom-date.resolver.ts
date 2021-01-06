import { ResolveField, Resolver } from '@nestjs/graphql';
import { RequestLocale } from '@nestjs-toolkit/base/dist/locale';

type Context = {
  requestLocale: RequestLocale;
};

@Resolver('CustomDate')
export class CustomDateResolver {
  @ResolveField()
  utc(date, params, { requestLocale }: Context) {
    return requestLocale
      .toMoment(date)
      .utc()
      .toISOString();
  }

  @ResolveField()
  unix(date, params, { requestLocale }: Context) {
    return requestLocale.toMomentTimezone(date).unix();
  }

  @ResolveField()
  timestamp(date, params, { requestLocale }: Context) {
    return requestLocale.toMomentTimezone(date).valueOf();
  }

  @ResolveField()
  string(date, params, { requestLocale }: Context) {
    return requestLocale.toMomentTimezone(date).toString();
  }

  @ResolveField()
  iso(date, params, { requestLocale }: Context) {
    return requestLocale.toMomentTimezone(date).toISOString(true);
  }

  @ResolveField()
  timezone(date, { offset }, { requestLocale }: Context) {
    return requestLocale
      .toMoment(date)
      .utcOffset(offset)
      .toISOString(true);
  }

  @ResolveField()
  format(date, { format }, { requestLocale }: Context) {
    const moment = requestLocale.toMomentTimezone(date);
    const antl = requestLocale.antl;

    if (format && format.includes('[calendar]')) {
      const calendar = moment.calendar(null, {
        sameDay: `[${antl.formatMessage('calendar_same_day')}]`,
        nextDay: `[${antl.formatMessage('calendar_next_day')}]`,
        nextWeek: 'dddd',
        lastDay: `[${antl.formatMessage('calendar_last_day')}]`,
        lastWeek: `[${antl.formatMessage('calendar_last_week')}] dddd`,
        sameElse: 'DD/MM',
      });

      return moment.format(format).replace('calendar', calendar);
    }

    return moment.format(format);
  }
}
