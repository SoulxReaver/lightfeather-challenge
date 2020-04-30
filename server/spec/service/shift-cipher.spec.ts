import * as service from '../../src/services/shift-cipher';
import * as fs from 'fs';

describe("shift-cipher Service", () => {
  describe("shiftChar", () => {
    it("Should shift lowercase character", function() {
      const actual = service.shiftCharacter('a', 2);
      expect(actual).toBe('c');
    });

    it("Should shift Uppercase character", function() {
      const actual = service.shiftCharacter('A', 2);
      expect(actual).toBe('C');
    });

    it("Should return empty when character is empty", function() {
      const actual = service.shiftCharacter('', 2);
      expect(actual).toBe('');
    });

    it("Should return empty when character is null", function() {
      const actual = service.shiftCharacter(null, 2);
      expect(actual).toBe(null);
    });

    it("Should return empty when character is undefined", function() {
      const actual = service.shiftCharacter(undefined, 2);
      expect(actual).toBe(undefined);
    });

    it("Should throw when character is not in the alphabet", function() {
      expect( () => service.shiftCharacter('a', 27) ).toThrow(new Error('Unable to encode character'));
      expect( () => service.shiftCharacter('A', 27) ).toThrow(new Error('Unable to encode character'));
    });
  });
  
  describe("shiftMessage", () => {
    beforeEach( () => {
      spyOn(fs, 'existsSync').and.returnValue(true);
      spyOn(fs, 'writeFileSync')
    });

    it("Should shift message", function() {
      const actual = service.shiftMessage('dad', 3);
      expect(actual).toBe('gdg');
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it("Should preserve casing", function() {
      const actual = service.shiftMessage('dAd', 3);
      expect(actual).toBe('gDg');
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it("Should retain space", function() {
      const actual = service.shiftMessage('the eagle has landed', 2);
      expect(actual).toBe('vjg gcing jcu ncpfgf');
    });

    it("Should retain non alphabet", function() {
      const actual = service.shiftMessage('arn\'t we the same?', 2);
      expect(actual).toBe('ctp\'v yg vjg ucog?');
    });
  });
});