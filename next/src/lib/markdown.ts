import fs from 'fs';
import path from 'path';
import { getGlobalConfig, replaceTemplateVars, getBuildVariables } from './config';

const configDir = path.join(process.cwd(), '..', 'config');

/**
 * Load and parse a markdown file from the config directory
 * Supports template variables like {{company.name}} from global config
 * and {{build.date}}, {{build.year}}, etc. from build-time variables
 * Returns raw markdown content (to be rendered with react-markdown)
 */
export function loadMarkdown(filename: string): string {
  const filePath = path.join(configDir, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Markdown file not found: ${filename}`);
  }

  // Read the markdown content
  let markdownContent = fs.readFileSync(filePath, 'utf-8');

  // Get global config and build variables
  const globalConfig = getGlobalConfig();
  const buildVars = getBuildVariables();

  // Replace template variables
  markdownContent = replaceTemplateVars(markdownContent, globalConfig, buildVars);

  return markdownContent;
}

/**
 * Load privacy policy from markdown
 */
export function loadPrivacyPolicy(): string {
  return loadMarkdown('privacy-policy.md');
}

/**
 * Load terms of service from markdown
 */
export function loadTermsOfService(): string {
  return loadMarkdown('terms-of-service.md');
}

/**
 * Load service level agreement from markdown
 */
export function loadSLA(): string {
  return loadMarkdown('sla.md');
}

/**
 * Load acceptable use policy from markdown
 */
export function loadAUP(): string {
  return loadMarkdown('acceptable-use-policy.md');
}
