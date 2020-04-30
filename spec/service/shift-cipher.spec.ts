import * as service from '../../src/service/shift-cipher';

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
      const actual = service.shiftCharacter('', 2);
      expect(actual).toBe('');
    });

    it("Should return empty when character is undefined", function() {
      const actual = service.shiftCharacter('', 2);
      expect(actual).toBe('');
    });

    it("Should throw when character is not in the alphabet", function() {
      expect( () => service.shiftCharacter('a', 300) ).toThrow(new Error('unable to shift char'));
    });
  });
  
  describe("shiftMessage", () => {
    it("Should shift message", function() {
      const actual = service.shiftMessage('dad', 3);
      expect(actual).toBe('gdg');
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