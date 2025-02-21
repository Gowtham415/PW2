import * as fs from 'fs';
import * as path from 'path';

interface TestData {
  id: number;
  name: string;
  input: Record<string, any>;
  expected: Record<string, any>;
}

interface TestDataFile {
  tests: TestData[];
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
