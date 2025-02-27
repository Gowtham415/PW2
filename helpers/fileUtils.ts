import * as fs from 'fs';
import * as path from 'path';
import * as Papa from 'papaparse';

export interface CitiesData {
  sourceCity: string;
  destinationCity: string;
}

interface TestData {
  id: number;
  name: string;
  input: Record<string, any>;
  expected: Record<string, any>;
}

interface TestDataFile {
  tests: TestData[];
}

export const readCsvNode = async (filePath: string): Promise<any> => {
  const csvString = await fs.promises.readFile(filePath, 'utf-8');
  const { data } = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
  });

  return data;
};

export function getCitiesArrayData(): CitiesData[] {
  const csvFilePath = path.resolve(__dirname, '../test-data/citiesdata.csv');
  const csvString = fs.readFileSync(csvFilePath, 'utf-8');
  const { data } = Papa.parse(csvString, {
    header: true,
    dynamicTyping: true,
  });

  const citiesDataArray: CitiesData[] = data.map((row: any) => {
    return {
      sourceCity: row.sourceCity,
      destinationCity: row.destinationCity,
    };
  });

  return citiesDataArray;
}

export function loadTestData(filePath: string): TestDataFile {
  const fullPath = path.resolve(__dirname, filePath);
  
  try {
    const data = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(data) as TestDataFile;
  } catch (error) {
    console.error(`Error reading test data from ${fullPath}:`, error);
    throw error;
  }
}
