import { MatterData } from 'src/types/mdx';

export function mergeData(dataMain: MatterData, dataDefault: MatterData) {
  const dataMerged = dataMain;
  Object.keys(dataDefault).forEach((key) => {
    if (!dataMerged[key]) dataMerged[key] = dataDefault[key];
  });
  return dataMerged;
}
