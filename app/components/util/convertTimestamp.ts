import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface GoogleProtobufTimestamp {
  nanos: number | BigInt;
  seconds: number | BigInt;
}

export const timestampToDate = (timestamp: GoogleProtobufTimestamp): Date => {
  const seconds = typeof timestamp.seconds === 'bigint' ? Number(timestamp.seconds) : Number(timestamp.seconds);
  const nanos = typeof timestamp.nanos === 'bigint' ? Number(timestamp.nanos) : Number(timestamp.nanos);
  return new Date(seconds * 1000 + Math.floor(nanos / 1000000));
};

export const formatGoogleTimestamp = (timestamp: GoogleProtobufTimestamp, timeZone: string) => {
  const date = timestampToDate(timestamp);
  return format(toZonedTime(date, timeZone), 'MMM dd, yyyy, hh:mm a');
};
