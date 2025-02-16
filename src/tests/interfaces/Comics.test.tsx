import { describe, it, expect } from 'vitest';
import { Extension, Result, Series, Thumbnail, Issn, Format } from '../../interfaces/Comics';

describe('Interfaces', () => {
  describe('Result', () => {
    it('should have the correct structure', () => {
      const result: Result = {
        code: 200,
        status: 'Ok',
        copyright: '© 2023 Dragon Ball API',
        attributionText: 'Data provided by Dragon Ball API. © 2023',
        attributionHTML: '<a href="http://dragonballapi.com">Data provided by Dragon Ball API. © 2023</a>',
        etag: 'xyz789',
        data: {
          offset: 0,
          limit: 20,
          total: 100,
          count: 20,
          results: [
            {
                id: 1,
                digitalId: 12345,
                title: 'Dragon Ball',
                issueNumber: 1,
                variantDescription: '',
                description: 'The main protagonist of Dragon Ball.',
                modified: '2023-10-01T00:00:00Z',
                isbn: '1234567890',
                upc: '123456789012',
                diamondCode: 'ABC123',
                ean: '1234567890123',
                pageCount: 32,
                textObjects: [],
                resourceURI: 'http://example.com/resourceURI',
                urls: [],
                series: {
                    resourceURI: 'http://example.com/series',
                    name: 'Dragon Ball Series',
                },
                collections: [],
                dates: [],
                prices: [],
                thumbnail: {
                    path: 'http://example.com/thumbnail',
                    extension: Extension.Jpg,
                },
                images: [],
                creators: {
                    available: 0,
                    collectionURI: 'http://example.com/creators',
                    items: [],
                    returned: 0,
                },
                characters: {
                    available: 0,
                    collectionURI: 'http://example.com/characters',
                    items: [],
                    returned: 0,
                },
                stories: {
                    available: 0,
                    collectionURI: 'http://example.com/stories',
                    items: [],
                    returned: 0,
                },
                events: {
                    available: 0,
                    collectionURI: 'http://example.com/events',
                    items: [],
                    returned: 0,
                },
                issn: Issn.Empty,
                format: Format.Comic
            },
          ],
        },
      };

      expect(result).toBeDefined();
      expect(result.code).toBeTypeOf('number');
      expect(result.status).toBeTypeOf('string');
      expect(result.copyright).toBeTypeOf('string');
      expect(result.attributionText).toBeTypeOf('string');
      expect(result.attributionHTML).toBeTypeOf('string');
      expect(result.etag).toBeTypeOf('string');

      expect(result.data).toBeDefined();
      expect(result.data.offset).toBeTypeOf('number');
      expect(result.data.limit).toBeTypeOf('number');
      expect(result.data.total).toBeTypeOf('number');
      expect(result.data.count).toBeTypeOf('number');
      expect(result.data.results).toBeInstanceOf(Array);

      const character = result.data.results[0];
      expect(character.id).toBeTypeOf('number');
      expect(character.description).toBeTypeOf('string');
    });
  });

  describe('Thumbnail', () => {
    it('should have the correct structure', () => {
      const thumbnail: Thumbnail = {
        path: 'https://example.com/goku-thumbnail',
        extension: Extension.Jpg
      };

      expect(thumbnail).toBeDefined();
      expect(thumbnail.path).toBeTypeOf('string');
      expect(thumbnail.extension).toBe(Extension.Jpg); 
    });
  });

  describe('Series', () => {
    it('should have the correct structure', () => {
      const series: Series = {
        resourceURI: 'https://example.com/series/1',
        name: 'Dragon Ball Z',
      };

      expect(series).toBeDefined();
      expect(series.resourceURI).toBeTypeOf('string');
      expect(series.name).toBeTypeOf('string');
    });
  });
});