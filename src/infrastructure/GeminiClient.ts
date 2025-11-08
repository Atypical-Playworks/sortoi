import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { CategorizedFile, ILLMClient } from '../core/types.js';
import { generateObject } from 'ai';
import { z } from 'zod';
import logger from './Logger.js';

export class GeminiClient implements ILLMClient {
  private readonly googleAI;

  constructor(apiKey: string) {
    this.googleAI = createGoogleGenerativeAI({ apiKey });
  }

  async categorize(filePath: string): Promise<CategorizedFile> {
    try {
      const model = this.googleAI('gemini-2.5-flash');
      
      logger.debug('Categorizing file with Gemini', { filePath });
      
      const { object } = await generateObject({
        model,
        schema: z.object({
          category: z.string().describe('The main category for the file (e.g., "Documents", "Images", "Code").'),
          subcategory: z.string().optional().describe('A more specific subcategory (e.g., "Reports", "Screenshots", "JavaScript").'),
        }),
        prompt: `Categorize the following file based on its path: ${filePath}. Provide a main category and an optional, more specific subcategory.`,
      });

      const result: CategorizedFile = {
        path: filePath,
        category: object.category,
      };

      if (object.subcategory) {
        result.subcategory = object.subcategory;
      }

      logger.debug('File categorized successfully', { 
        filePath, 
        category: result.category, 
        subcategory: result.subcategory 
      });

      return result;
    } catch (error) {
      // Log the actual error for debugging
      logger.error('Gemini API error', { 
        filePath, 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Re-throw with more context
      if (error instanceof Error) {
        throw new Error(`Failed to categorize ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }
}

