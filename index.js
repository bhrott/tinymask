function TinyMask(pattern, options) {
	var defaultOptions = {
		translation: {
			'9': function (val) {
				return String(val).replace(/[^0-9]+/g, '');
			},
			'A': function (val) {
				return String(val).replace(/[^a-zA-Z]+/g, '');
			},
			'S': function (val) {
				return String(val).replace(/[^a-zA-Z0-9]+/g, '');
			},
			'*': function (val) {
				return String(val);
			}
		},
		invalidValues: [null, undefined, ''],
		pattern: pattern
	};

	this._options = this._merge(defaultOptions, options || {});
};

TinyMask.prototype._merge = function (obj1, obj2) {
	var obj3 = {};
	for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	return obj3;
}

TinyMask.prototype.mask = function (value) {
	var translation = this._options.translation;
	var invalidValues = this._options.invalidValues;
	var pattern = this._options.pattern;

	var result = '';

	var maskSize = pattern.length;
	var valueSize = value.length;

	var maskResolved = 0;
	var valueResolved = 0;

	while (maskResolved < maskSize && valueResolved < valueSize) {
		var valueChar = value[valueResolved];
		var maskChar = pattern[maskResolved];

		if (valueChar === maskChar) {
			result += valueChar;
			maskResolved++;
			valueResolved++;
			continue;
		}

		var handler = translation[maskChar];

		if (!handler) {
			result += maskChar;
			maskResolved++;
			continue;
		}

		var masked = handler(valueChar);
		if (invalidValues.indexOf(masked) < 0) {
			result += masked
			maskResolved++
		}
		valueResolved++
	}

	return result;
}

module.exports = TinyMask;
