import { describe, it, expect } from 'vitest';
import { Character, Links, Meta, Result, Transformation } from '../../interfaces/Character';


describe('Interfaces', () => {
  describe('Result', () => {
    it('should have the correct structure', () => {
      const result: Result = {
        items: [
          {
            id: 1,
            name: 'Goku',
            ki: '1000',
            maxKi: '10000',
            race: 'Saiyan',
            gender: 'Male',
            description: 'The main protagonist of Dragon Ball.',
            image: 'https://example.com/goku.jpg',
            affiliation: 'Z Fighters',
            transformations: [
              {
                id: '1',
                name: 'Super Saiyan',
                image: 'https://example.com/super-saiyan.jpg',
                ki: '50000',
              },
            ],
          },
        ],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: 'https://example.com/characters?page=1',
          previous: '',
          next: '',
          last: 'https://example.com/characters?page=1',
        },
      };

      expect(result).toBeDefined();
      expect(result.items).toBeInstanceOf(Array);
      expect(result.meta).toBeDefined();
      expect(result.links).toBeDefined();

      const character = result.items[0];
      expect(character.id).toBeTypeOf('number');
      expect(character.name).toBeTypeOf('string');
      expect(character.ki).toBeTypeOf('string');
      expect(character.maxKi).toBeTypeOf('string');
      expect(character.race).toBeTypeOf('string');
      expect(character.gender).toBeTypeOf('string');
      expect(character.description).toBeTypeOf('string');
      expect(character.image).toBeTypeOf('string');
      expect(character.affiliation).toBeTypeOf('string');
      expect(character.transformations).toBeInstanceOf(Array);

      const transformation = character.transformations?.[0];
      expect(transformation?.id).toBeTypeOf('string');
      expect(transformation?.name).toBeTypeOf('string');
      expect(transformation?.image).toBeTypeOf('string');
      expect(transformation?.ki).toBeTypeOf('string');

      expect(result.meta.totalItems).toBeTypeOf('number');
      expect(result.meta.itemCount).toBeTypeOf('number');
      expect(result.meta.itemsPerPage).toBeTypeOf('number');
      expect(result.meta.totalPages).toBeTypeOf('number');
      expect(result.meta.currentPage).toBeTypeOf('number');

      expect(result.links.first).toBeTypeOf('string');
      expect(result.links.previous).toBeTypeOf('string');
      expect(result.links.next).toBeTypeOf('string');
      expect(result.links.last).toBeTypeOf('string');
    });
  });

  describe('Character', () => {
    it('should have the correct structure with optional properties', () => {
      const character: Character = {
        id: 2,
        name: 'Vegeta',
        description: 'The prince of all Saiyans.',
        image: 'https://example.com/vegeta.jpg',
      };

      expect(character.id).toBeTypeOf('number');
      expect(character.name).toBeTypeOf('string');
      expect(character.description).toBeTypeOf('string');
      expect(character.image).toBeTypeOf('string');
      expect(character.ki).toBeUndefined();
      expect(character.maxKi).toBeUndefined();
      expect(character.race).toBeUndefined();
      expect(character.gender).toBeUndefined();
      expect(character.affiliation).toBeUndefined();
      expect(character.transformations).toBeUndefined();
    });
  });

  describe('Transformation', () => {
    it('should have the correct structure', () => {
      const transformation: Transformation = {
        id: '2',
        name: 'Super Saiyan Blue',
        image: 'https://example.com/super-saiyan-blue.jpg',
        ki: '100000',
      };

      expect(transformation).toBeDefined();
      expect(transformation.id).toBeTypeOf('string');
      expect(transformation.name).toBeTypeOf('string');
      expect(transformation.image).toBeTypeOf('string');
      expect(transformation.ki).toBeTypeOf('string');
    });
  });

  describe('Meta', () => {
    it('should have the correct structure', () => {
      const meta: Meta = {
        totalItems: 50,
        itemCount: 10,
        itemsPerPage: 10,
        totalPages: 5,
        currentPage: 1,
      };

      expect(meta).toBeDefined();
      expect(meta.totalItems).toBeTypeOf('number');
      expect(meta.itemCount).toBeTypeOf('number');
      expect(meta.itemsPerPage).toBeTypeOf('number');
      expect(meta.totalPages).toBeTypeOf('number');
      expect(meta.currentPage).toBeTypeOf('number');
    });
  });

  describe('Links', () => {
    it('should have the correct structure', () => {
      const links: Links = {
        first: 'https://example.com/characters?page=1',
        previous: '',
        next: 'https://example.com/characters?page=2',
        last: 'https://example.com/characters?page=5',
      };

      expect(links).toBeDefined();
      expect(links.first).toBeTypeOf('string');
      expect(links.previous).toBeTypeOf('string');
      expect(links.next).toBeTypeOf('string');
      expect(links.last).toBeTypeOf('string');
    });
  });
});