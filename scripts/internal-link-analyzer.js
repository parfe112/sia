/**
 * Internal Link Analyzer for SIA Skin Center
 *
 * This script helps identify internal linking opportunities for content files.
 * It scans the content collections and suggests relevant linking opportunities
 * based on keyword matching and content relationships.
 *
 * Usage: node scripts/internal-link-analyzer.js path/to/content-file.md
 */

import fs from "fs";
import path from "path";
import { globSync } from "glob";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

// Configuration
const CONTENT_DIRS = [
  path.join(rootDir, "content/blog"),
  path.join(rootDir, "content/servicii"),
];

const RELEVANCE_THRESHOLD = 0.3; // Minimum relevance score to consider a match

// Get the file to analyze from command line argument
const targetFile = process.argv[2];
if (!targetFile) {
  console.error("Please provide a file path to analyze");
  process.exit(1);
}

const targetFilePath = path.resolve(process.cwd(), targetFile);
if (!fs.existsSync(targetFilePath)) {
  console.error(`File not found: ${targetFilePath}`);
  process.exit(1);
}

// Extract filename as primary keyword
const filenameWithoutExt = path.basename(
  targetFilePath,
  path.extname(targetFilePath)
);
const primaryKeyword = filenameWithoutExt.replace(/-/g, " ");

console.log(`\n=== Internal Link Analysis for: ${targetFilePath} ===`);
console.log(`Primary keyword: "${primaryKeyword}"\n`);

// Parse the target file
const targetFileContent = fs.readFileSync(targetFilePath, "utf8");
const { data: frontmatter, content } = matter(targetFileContent);
const targetTags = frontmatter.tags || [];
const targetCategory = frontmatter.category || "";

console.log("Frontmatter:");
console.log(` - Category: ${targetCategory}`);
console.log(` - Tags: ${targetTags.join(", ")}\n`);

// Get all content files
const contentFiles = [];
CONTENT_DIRS.forEach((dir) => {
  const files = globSync(`${dir}/**/*.md`);
  files.forEach((file) => {
    if (file !== targetFilePath) {
      contentFiles.push(file);
    }
  });
});

console.log(
  `Scanning ${contentFiles.length} content files for linking opportunities...\n`
);

// Analyze each content file for relevance
const linkOpportunities = [];

contentFiles.forEach((file) => {
  const fileContent = fs.readFileSync(file, "utf8");
  const { data, content } = matter(fileContent);

  const fileTags = data.tags || [];
  const fileCategory = data.category || "";
  const fileTitle = data.title || "";

  // Calculate relevance score
  let relevanceScore = 0;

  // Check if categories match
  if (fileCategory && fileCategory === targetCategory) {
    relevanceScore += 0.4;
  }

  // Check for tag matches
  const matchingTags = fileTags.filter((tag) => targetTags.includes(tag));
  relevanceScore += matchingTags.length * 0.15;

  // Check if title contains primary keyword
  if (fileTitle.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    relevanceScore += 0.3;
  }

  // Check if content contains primary keyword
  const keywordRegex = new RegExp(primaryKeyword, "i");
  if (keywordRegex.test(content)) {
    relevanceScore += 0.2;
  }

  // Add to opportunities if relevant enough
  if (relevanceScore >= RELEVANCE_THRESHOLD) {
    const relativeUrl = getRelativeUrl(file);
    linkOpportunities.push({
      file: relativeUrl,
      title: fileTitle,
      category: fileCategory,
      matchingTags,
      relevanceScore,
      isService: file.includes("/servicii/"),
      suggestedAnchorText: getSuggestedAnchorText(fileTitle, relativeUrl),
    });
  }
});

// Sort opportunities by relevance
linkOpportunities.sort((a, b) => b.relevanceScore - a.relevanceScore);

// Display opportunities
console.log("Top link opportunities:");
console.log("======================\n");

linkOpportunities.slice(0, 10).forEach((opportunity, index) => {
  console.log(
    `${index + 1}. ${opportunity.title} (${Math.round(opportunity.relevanceScore * 100)}% relevance)`
  );
  console.log(`   URL: ${opportunity.file}`);
  console.log(`   Type: ${opportunity.isService ? "Service" : "Blog Post"}`);
  console.log(`   Category: ${opportunity.category}`);
  if (opportunity.matchingTags.length) {
    console.log(`   Matching tags: ${opportunity.matchingTags.join(", ")}`);
  }
  console.log(
    `   Suggested link: [${opportunity.suggestedAnchorText}](${opportunity.file})`
  );
  console.log("");
});

// Generate example internal linking implementation
console.log("Example implementation:");
console.log("=====================\n");

const serviceLinkSuggestions = linkOpportunities
  .filter((o) => o.isService)
  .slice(0, 3);
const blogLinkSuggestions = linkOpportunities
  .filter((o) => !o.isService)
  .slice(0, 3);

console.log("```md");
console.log(`# ${frontmatter.title || "Content Title"}\n`);
console.log(
  `[${primaryKeyword}](${getLinkForPrimaryKeyword(primaryKeyword, targetFilePath)}) ${getIntroSentence(primaryKeyword, targetFilePath)}\n`
);
console.log("## Section with Service Links\n");
console.log(
  `When it comes to ${primaryKeyword}, our experts at SIA Skin Center offer professional solutions. `
);
serviceLinkSuggestions.forEach((suggestion, i) => {
  console.log(
    `${i === 0 ? "We provide " : i === serviceLinkSuggestions.length - 1 ? "and " : ""}[${suggestion.suggestedAnchorText}](${suggestion.file})${i === serviceLinkSuggestions.length - 1 ? "." : ", "}`
  );
});
console.log("\n## Related Information\n");
console.log(
  `To learn more about ${primaryKeyword}, check out these helpful resources:`
);
console.log("<ul>");
blogLinkSuggestions.forEach((suggestion) => {
  console.log(
    `  <li>[${suggestion.suggestedAnchorText}](${suggestion.file})</li>`
  );
});
console.log("</ul>\n");
console.log("```");

// Helper function to get relative URL from file path
function getRelativeUrl(filePath) {
  const contentType = filePath.includes("/blog/") ? "blog" : "servicii";
  const fileName = path.basename(filePath, ".md");
  return `/${contentType}/${fileName}`;
}

// Helper function to get suggested anchor text
function getSuggestedAnchorText(title, url) {
  // Extract main keyword from title or URL
  if (title) {
    return title.replace(/^(Cum|Ce|Unde|Când|De ce) (să|se|este) /i, "");
  }
  return url.split("/").pop().replace(/-/g, " ");
}

// Helper function to get appropriate link for primary keyword
function getLinkForPrimaryKeyword(keyword, filePath) {
  const isServiceContent = filePath.includes("/servicii/");
  if (isServiceContent) {
    return "/servicii";
  } else {
    // Try to find matching service
    const matchingService = linkOpportunities.find(
      (o) =>
        o.isService && o.title.toLowerCase().includes(keyword.toLowerCase())
    );
    return matchingService ? matchingService.file : "/servicii";
  }
}

// Helper function to get an intro sentence
function getIntroSentence(keyword, filePath) {
  const isServiceContent = filePath.includes("/servicii/");
  if (isServiceContent) {
    return `este unul dintre serviciile premium oferite de SIA Skin Center pentru clienții noștri.`;
  } else {
    return `este un subiect important pentru toți cei interesați de îngrijirea pielii și frumusețe.`;
  }
}
