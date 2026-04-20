import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface SiteData {
  global: {
    utc_label: string;
    brand_label: string;
    footer_text: string;
  };
  chapters: any[];
}

export function getSiteData(): SiteData {
  const filePath = path.join(process.cwd(), 'data.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as SiteData;
}
