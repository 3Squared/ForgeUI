import { ForgeDatePickerNormalizer } from './index';
import dayjs, { Dayjs } from 'dayjs';

export const stringNormalizer: ForgeDatePickerNormalizer<string> = {
  fromNative: (d: Date | null) => (d ? d.toISOString() : null),
  toNative: (s: string | null) => (s ? new Date(s) : null)
};

export const nativeNormalizer: ForgeDatePickerNormalizer<Date> = {
  fromNative: (d: Date | null) => d,
  toNative: (d: Date | null) => d
};

export const dayjsNormalizer: ForgeDatePickerNormalizer<Dayjs> = {
  fromNative: (d: Date | null) => (d ? dayjs(d) : d),
  toNative: (d: Dayjs | null) => (d ? d.toDate() : d)
};
