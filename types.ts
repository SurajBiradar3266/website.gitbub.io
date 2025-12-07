export interface User {
  email: string;
  name: string;
}

export enum TimeRange {
  '1M' = '1M',
  '3M' = '3M',
  '6M' = '6M',
  '1Y' = '1Y',
  'ALL' = 'ALL'
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
