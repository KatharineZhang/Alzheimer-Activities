import fs from 'fs';
import * as readline from 'readline';

// Define your types
type levelFilterType = {
  socialLvl: bigint;
  cogEngagement: bigint;
  sensoryLvl: bigint;
  physLvl: bigint;
  InOrOut: bigint;
};

type activity = {
  levelFilters: levelFilterType;
  Rank: bigint;
  Description: string;
  Steps: string[];
  Materials: string[];
};

async function processLineByLine(levelFiltersStr: string) {
  const fileStream = fs.createReadStream('path/to/your/file.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // Process each line here
    console.log(line);
  }
}

// Function to read activities from a text file and parse them
const parseActivities = (filePath: string): activity[] => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const activityList: activity[] = [];
  // const activityPattern = /(\d+)\. ([\s\S]*?)\nLevel Filters:\n([\s\S]*?)\nRank: (\w+)\nDescription: ([\s\S]*?)\nSteps:\n([\s\S]*?)\nMaterials:\n([\s\S]*?)(?=\n\d\.|\n$)/g;


  let match;
  while ((match = activityPattern.exec(fileContent)) !== null) {
    const [id, name, levelFiltersStr, rankStr, description, stepsStr, materialsStr] = match;
    
    // Parse levelFilters
    const levelFilters = parseLevelFilters(levelFiltersStr);

    // Parse steps and materials
    const steps = stepsStr.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const materials = materialsStr.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Determine Rank as a bigint
    const rank = getRankValue(rankStr);

    const activityData: activity = {
      levelFilters,
      Rank: rank,
      Description: description.trim(),
      Steps: steps,
      Materials: materials
    };

    activityList.push(activityData);
  }

  return activityList;
};

// Helper function to parse levelFilters
const parseLevelFilters = (levelFiltersStr: string): levelFilterType => {
  const filters: { [key: string]: bigint } = {
    'Social Level': 0n,
    'Cognitive Engagement': 0n,
    'Sensory Level': 0n,
    'Physical Level': 0n,
    'Indoor/Outdoor': 0n
  };

  const filterLines = levelFiltersStr.split('\n');
  filterLines.forEach(line => {
    const [key, value] = line.split(':').map(str => str.trim());
    if (filters[key] !== undefined) {
      filters[key] = getLevelValue(value);
    }
  });

  return {
    socialLvl: filters['Social Level'],
    cogEngagement: filters['Cognitive Engagement'],
    sensoryLvl: filters['Sensory Level'],
    physLvl: filters['Physical Level'],
    InOrOut: filters['Indoor/Outdoor']
  };
};

// Helper function to convert rank string to bigint value
const getRankValue = (rank: string): bigint => {
  switch (rank.toLowerCase()) {
    case 'easy': return 0n;
    case 'medium': return 1n;
    case 'hard': return 2n;
    default: return 0n;
  }
};

// Helper function to convert level string to bigint value
const getLevelValue = (level: string): bigint => {
  switch (level.toLowerCase()) {
    case 'low': return 0n;
    case 'medium': return 1n;
    case 'high': return 2n;
    default: return 0n;
  }
};

// Example usage: Read and parse activities from a file
const activities = processLineByLine('./activities.txt');
export default activities;
console.log(activities);


