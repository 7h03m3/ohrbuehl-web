import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft',
})
export class TimeLeftPipe implements PipeTransform {
  private static MinutesOffset = 60;
  private static HourOffset = 60 * TimeLeftPipe.MinutesOffset;
  private static DayOffset = 24 * TimeLeftPipe.HourOffset;

  public transform(input: number): unknown {
    const now = Date.now();
    const value = +input;

    const expired = now > value;
    let diff = now > value ? now - value : value - now;
    diff = (diff - (diff % 1000)) / 1000;
    const remainderDays = diff % TimeLeftPipe.DayOffset;
    const days = (diff - remainderDays) / TimeLeftPipe.DayOffset;

    const remainderHours = remainderDays % TimeLeftPipe.HourOffset;
    const hours = (remainderDays - remainderHours) / TimeLeftPipe.HourOffset;

    const remainderMinutes = remainderHours % TimeLeftPipe.MinutesOffset;
    const minutes = (remainderHours - remainderMinutes) / TimeLeftPipe.MinutesOffset;

    return (expired ? '-' : '') + days + 'd' + ' ' + hours + 'h ' + minutes + 'm';
  }
}
