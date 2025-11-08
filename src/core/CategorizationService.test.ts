import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CategorizationService } from './CategorizationService.js';
import type { IFileScanner, ILLMClient, IDatabaseService, CategorizedFile, IOutputPort, IProgressReporter, IFileOrganizer } from './types.js';
import { getFileHash } from '../common/utils/fileUtils.js';

// Mock the file utils module
vi.mock('../common/utils/fileUtils.js', () => ({
  getFileHash: vi.fn(),
}));

// Mock dependencies
const mockFileScanner: IFileScanner = {
  scan: vi.fn(),
};

const mockLlmClient: ILLMClient = {
  categorize: vi.fn(),
};

const mockDatabaseService: IDatabaseService = {
  getCachedCategorization: vi.fn(),
  setCachedCategorization: vi.fn(),
};

const mockOutputPort: IOutputPort = {
  info: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
};

const mockProgressReporter: IProgressReporter = {
  start: vi.fn(),
  update: vi.fn(),
  increment: vi.fn(),
  stop: vi.fn(),
};

const mockFileOrganizer: IFileOrganizer = {
  organize: vi.fn(),
};

describe('CategorizationService', () => {
  let service: CategorizationService;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
    
    // Setup getFileHash mock to return consistent hash
    vi.mocked(getFileHash).mockResolvedValue('mockedhash123');
    
    service = new CategorizationService(mockFileScanner, mockLlmClient, mockOutputPort, mockProgressReporter, mockFileOrganizer, mockDatabaseService);
  });

  it('should categorize a single file using the LLM client when not in cache', async () => {
    const directory = '/test-dir';
    const filePath = `${directory}/test.txt`;
    const llmResult: CategorizedFile = {
      path: filePath,
      category: 'Documents',
      subcategory: 'Text',
    };

    // Arrange
    vi.mocked(mockFileScanner.scan).mockResolvedValue([filePath]);
    vi.mocked(mockDatabaseService.getCachedCategorization).mockResolvedValue(null);
    vi.mocked(mockLlmClient.categorize).mockResolvedValue(llmResult);

    // Act
    const result = await service.categorizeDirectory(directory);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0]?.path).toBe(filePath);
    expect(result[0]?.category).toBe('Documents');
    expect(result[0]?.subcategory).toBe('Text');
    expect(result[0]?.hash).toBe('mockedhash123'); // Hash added by service
    expect(mockFileScanner.scan).toHaveBeenCalledWith(directory);
    expect(mockDatabaseService.getCachedCategorization).toHaveBeenCalledWith(filePath, 'mockedhash123');
    expect(mockLlmClient.categorize).toHaveBeenCalledWith(filePath);
    expect(mockDatabaseService.setCachedCategorization).toHaveBeenCalledWith(
      expect.objectContaining({
        path: filePath,
        category: 'Documents',
        hash: 'mockedhash123',
      })
    );
  });

  it('should use the cached result if available', async () => {
    const directory = '/test-dir';
    const filePath = `${directory}/image.jpg`;
    const cachedCategorization: CategorizedFile = {
      path: filePath,
      category: 'Images',
      subcategory: 'JPEGs',
      hash: 'testhash2',
    };

    // Arrange
    vi.mocked(mockFileScanner.scan).mockResolvedValue([filePath]);
    vi.mocked(mockDatabaseService.getCachedCategorization).mockResolvedValue(cachedCategorization);

    // Act
    const result = await service.categorizeDirectory(directory);

    // Assert
    expect(result).toHaveLength(1);
    expect(result).toEqual([cachedCategorization]);
    expect(mockDatabaseService.getCachedCategorization).toHaveBeenCalledWith(filePath, 'mockedhash123');
    // Ensure LLM client was NOT called
    expect(mockLlmClient.categorize).not.toHaveBeenCalled();
    // Ensure we don't set the cache again if it was found
    expect(mockDatabaseService.setCachedCategorization).not.toHaveBeenCalled();
  });

  describe('Edge Cases', () => {
    it('should handle empty directory', async () => {
      vi.mocked(mockFileScanner.scan).mockResolvedValue([]);
      const result = await service.categorizeDirectory('/empty-dir');
      expect(result).toEqual([]);
    });

    it('should handle all files failing', async () => {
      vi.mocked(mockFileScanner.scan).mockResolvedValue(['/file1.txt', '/file2.txt']);
      vi.mocked(mockLlmClient.categorize).mockRejectedValue(new Error('API Error'));
      
      const result = await service.categorizeDirectory('/test-dir');
      expect(result).toEqual([]);
    });

    it('should continue processing after partial failures', async () => {
      vi.mocked(mockFileScanner.scan).mockResolvedValue(['/file1.txt', '/file2.txt']);
      vi.mocked(mockLlmClient.categorize)
        .mockRejectedValueOnce(new Error('Failed'))
        .mockResolvedValueOnce({ path: '/file2.txt', category: 'Docs', hash: 'hash2' });
      
      const result = await service.categorizeDirectory('/test-dir');
      expect(result).toHaveLength(1);
      expect(result[0]?.path).toBe('/file2.txt');
    });

    it('should respect silent mode', async () => {
      vi.mocked(mockFileScanner.scan).mockResolvedValue(['/file1.txt']);
      vi.mocked(mockLlmClient.categorize).mockResolvedValue({ path: '/file1.txt', category: 'Docs', hash: 'hash1' });
      
      await service.categorizeDirectory('/test-dir', { silent: true });
      
      expect(mockProgressReporter.start).not.toHaveBeenCalled();
      expect(mockProgressReporter.increment).not.toHaveBeenCalled();
      expect(mockProgressReporter.stop).not.toHaveBeenCalled();
    });
  });
});