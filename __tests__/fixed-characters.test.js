var TinyMask = require('../index');

test('12345 and mask 999-99-1111 results on 123-45-1111', function() {
	var instance = new TinyMask('999-99-1111');

	var expected = '123-45-1111';
	var result = instance.mask('12345');

	expect(result).toBe(expected);
});