const fs = require('fs');

const { saveFile } = require('../file');

describe('file', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveFile', () => {
    it('calls fs.writeFile', () => {
      const mockWriteFile = jest.fn();
      const mockPath = '/';
      const mockData = {};

      fs.writeFile = mockWriteFile;

      saveFile(mockPath, mockData);

      expect(mockWriteFile).toHaveBeenCalled();
    });
  });
});
