import { describe, it } from 'vitest';
import { strict as assert } from 'assert';
import deleteObject from '../src/core/deleteObject.js';

const data = [   {
    unique_id: "PLACEHOLDER",
    title: "Test_1",
    hier: "0",
    outline: "0",
    description: "DESCRIPTION"
  },
  {
    unique_id: "PLACEHOLDER",
    title: "First Item",
    hier: "0",
    outline: "1",
    description: "DESCRIPTION"
  },
    {
    unique_id: "PLACEHOLDER",
    title: "Second Item",
    hier: "0",
    outline: "2",
    description: "DESCRIPTION"
  }
]

describe('deleteObject', () => {
    it('should delete the object with the given outline number', () => {

        const result = deleteObject(data, '1');

        assert.equal(result.data.length, 2);
        assert.deepEqual(result.data, [
            {
                unique_id: "PLACEHOLDER",
                title: "Test_1",
                hier: "0",
                outline: "0",
                description: "DESCRIPTION"
              },
                {
                unique_id: "PLACEHOLDER",
                title: "Second Item",
                hier: "0",
                outline: "1",
                description: "DESCRIPTION"
              }
        ]);
    });

    it('should not delete if the outline number is not found', () => {
        const data = [
            {
                unique_id: "PLACEHOLDER",
                title: "Test_1",
                hier: "0",
                outline: "0",
                description: "DESCRIPTION"
              },
              {
                unique_id: "PLACEHOLDER",
                title: "First Item",
                hier: "0",
                outline: "1",
                description: "DESCRIPTION"
              },
                {
                unique_id: "PLACEHOLDER",
                title: "Second Item",
                hier: "0",
                outline: "2",
                description: "DESCRIPTION"
              }
        ];

        const result = deleteObject(data, '4');

        assert.equal(result, undefined);
        assert.equal(data.length, 3);
    });

    it('should not delete if only two objects remain', () => {
        const data = [
            {
                unique_id: "PLACEHOLDER",
                title: "Test_1",
                hier: "0",
                outline: "0",
                description: "DESCRIPTION"
              },
              {
                unique_id: "PLACEHOLDER",
                title: "First Item",
                hier: "0",
                outline: "1",
                description: "DESCRIPTION"
              }
        ];

        const result = deleteObject(data, '1');

        assert.equal(result, undefined);
        assert.equal(data.length, 2);
    });
});