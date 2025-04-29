import { ChartsV2Props, NewNestedDataPoint } from './types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type FlattenedDataPoint = {
  name: string;
  [key: string]: number | string;
};

const ChartsV2: React.FC<ChartsV2Props> = ({ data }) => {
  const colors = [
    '#8EC5FF',
    '#00C951',
    '#C27AFF',
    '#FB2C36',
    '#00D492',
    '#2B7FFF',
    '#AD46FF',
    '#FF8904',
  ];
  function transformNestedData(data: NewNestedDataPoint[]): FlattenedDataPoint[] {
    return data.map(item => {
      const flattened: FlattenedDataPoint = { name: item.name };

      for (const key in item.data) {
        flattened[key] = item.data[key].primary.val;
      }

      return flattened;
    });
  }

  const flattenedData = transformNestedData(data);
  console.log(data, flattenedData, 'flattenedData');

  // Get all unique keys (excluding 'name') for lines
  const lineKeys =
    flattenedData.length > 0 ? Object.keys(flattenedData[0]).filter(key => key !== 'name') : [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={flattenedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lineKeys.map((key, index) => (
          <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartsV2;
