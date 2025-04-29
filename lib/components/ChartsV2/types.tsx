type DataPoint = {
  primary: {
    label: string;
    val: number;
  };
  aux?: {
    label: string;
    val: string;
  }[];
};

export type NewNestedDataPoint = {
  name: string;
  data: {
    [key: string]: DataPoint;
  };
};

export interface ChartsV2Props {
  data: NewNestedDataPoint[];
}