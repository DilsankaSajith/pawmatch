import { normalize } from 'path';

export class EmbeddingService {
  private static instance: EmbeddingService;
  private pipeline: any = null;
  private isInitializing = false;

  static getInstance(): EmbeddingService {
    if (!EmbeddingService.instance) {
      EmbeddingService.instance = new EmbeddingService();
    }
    return EmbeddingService.instance;
  }

  private async getPipeline() {
    if (this.pipeline) return this.pipeline;

    if (this.isInitializing) {
      while (this.isInitializing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return this.pipeline;
    }

    this.isInitializing = true;

    try {
      const { pipeline } = await import('@xenova/transformers');
      this.pipeline = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
      );
      return this.pipeline;
    } finally {
      this.isInitializing = false;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const pipe = await this.getPipeline();
      const result = await pipe(text, {
        pooling: 'mean',
        normalize: true,
      });
      return Array.from(result.data);
    } catch (error) {
      console.error('Failed to generate embedding:', error);
      throw new Error('Could not generate text embedding');
    }
  }

  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    const promises = texts.map((text) => this.generateEmbedding(text));
    return Promise.all(promises);
  }
}
