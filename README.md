# LLM Web Scraper

This Langchain script extracts structured content from web pages. HTML content is scraped using Puppeteer, converted to Markdown, and processed with OpenAI GPT-4o according to a Zod schema.

## Prerequisites

Make sure you have Node.js and npm installed on your system.

## Installation

1. Install dependencies
```bash
npm install
```

2. Setup OpenAI Key
```bash
export OPENAI_API_KEY=your-api-key
```

## Usage

1. Edit the Zod schema, prompt and url field in `src/llm-extract.ts`
2. Run the script
``` bash
npx ts-node src/llm-extract.ts
```

Example:
```typescript
const contentSchema = z.object({
  title: z.string().describe("The title of the content"),
  description: z.string().describe("A brief description of the content"),
  keywords: z.array(z.string()).describe("A list of keywords related to the content"),
});
```
with url
```typescript
const url = 'https://flowful.ai';
```

Output:

```bash
{
  "title": "Transform Your Business with AI",
  "description": "We design and develop AI solutions to optimize your business processes, enhance decision-making and deliver new experiences. Our extensive experience in building consumer software for companies of all sizes ensures you receive top-notch solutions. With over 16 years in the industry and a diverse portfolio, we deliver innovative results tailored to your needs.",
  "keywords": [
    "AI solutions",
    "business processes",
    "decision-making",
    "new experiences",
    "consumer software",
    "innovative results"
  ]
}
```

## Blog Post

Find out more details on this [blog post](https://medium.com/@nchourrout/cut-api-costs-puppeteer-for-screenshots-pdf-generation-and-llm-scraping-ecbb5415e7e7).
