import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import TurndownService from 'turndown';

const turndownService = new TurndownService();

// Define the structured output schema
const contentSchema = z.object({
  title: z.string().describe("The title of the content"),
  description: z.string().describe("A brief description of the content"),
  keywords: z.array(z.string()).describe("A list of keywords related to the content"),
});

// Initialize the OpenAI model
const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0
});

// Extract structured data from Markdown text
async function extractStructuredData(markdownText: string) {
  const structuredLlm = model.withStructuredOutput(contentSchema, { name: "content" });

  const prompt = `
    Extract the following information from the Markdown text:

    - Title: The main title of the content.
    - Description: A brief summary of the content.
    - Keywords: A list of keywords that represent the main topics of the content.

    Markdown Text:
    ${markdownText}

    Respond with the data in JSON format.
  `;

  const response = await structuredLlm.invoke(prompt);
  return response;
}

// Scrape the content of a web page with Puppeteer
async function scrapeContent(url: string): Promise<string> {
  const loader = new PuppeteerWebBaseLoader(url);
  const docs = await loader.load();
  return docs[0].pageContent;
}

(async () => {
  const url = 'https://flowful.ai'; // Replace with the URL of the page you want to scrape
  try {
    const htmlContent = await scrapeContent(url);
    const markdownText = turndownService.turndown(htmlContent);
    const data = await extractStructuredData(markdownText);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error in main function:', error);
  }
})();
