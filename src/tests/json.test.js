const fs = require('fs');

const { saveJson, readJson } = require('../json');

describe('json', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveJson', () => {
    it('calls fs.writeFileSync', () => {
      const mockWriteFileSync = jest.fn();
      const mockPath = '/';
      const mockData = {};

      fs.writeFileSync = mockWriteFileSync;

      saveJson(mockPath, mockData);

      expect(mockWriteFileSync).toHaveBeenCalledWith(mockPath, '{}');
    });
  });

  describe('readJson', () => {
    it('calls fs.existsSync', () => {
      const mockExistsSync = jest.fn();
      const mockPath = '/';

      fs.existsSync = mockExistsSync;

      readJson(mockPath);

      expect(mockExistsSync).toHaveBeenCalledWith(mockPath);
    });
  });
});
