import { config } from 'dotenv';
import { extract } from './extract';

const envFilePath = './.env';
const outputDir = './lib';

config({ path: envFilePath });

extract(outputDir);
