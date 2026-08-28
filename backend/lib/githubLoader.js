import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import dotenv from "dotenv"

export default async function loadGithubRepo(githubURL) {
  const loader = new GithubRepoLoader(githubURL, {
    recursive: true,
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    ignoreFiles: [
      ".gitignore",
      "node_modules/**",
      "dist/**",
      "build/**",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
    ],
  });

  const docArray = await loader.load();
  return docArray;
}

// loadGithubRepo("https://github.com/ZayeemMohd/taskflowAI");
