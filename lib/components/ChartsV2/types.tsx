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

export type NestedDataPoint = {
  name: string;
  data: {
    [key: string]: DataPoint;
  };
};

export interface ChartsV2Props {
  data: NestedDataPoint[];
}