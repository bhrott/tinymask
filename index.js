function TinyMask(pattern, options) {
	var defaultOptions = {
		translation: {
			'9': function (val) {
				return val.replace(/[^0-9]+/g, '');
			},
			'A': function (val) {
				return val.replace(/[^a-zA-Z]+/g, '');
			},
			'S': function (val) {
				return val.replace(/[^a-zA-Z0-9]+/g, '');
			},
			'*': function (val) {
				return val;
			}
		},
		invalidValues: [null, undefined, '']
	};

	var opt = options || {};
	this._options = {
		translation: Object.assign(defaultOptions.translation, opt.translation),
		invalidValues: Object.assign(defaultOptions.invalidValues, opt.invalidValues),
		pattern: pattern
	};

	this._handlers = [];

	for (var i = 0; i < pattern.length; i++) {
		var element = pattern[i];

		var result = this._options.translation[element] || element;
		this._handlers.push(result);
	}
};

TinyMask.prototype.mask = function (value) {
	var result = '';

	var val = String(value);
	var maskSize = this._handlers.length;
	var maskResolved = 0;
	var valueResolved = 0;

	while (maskResolved < maskSize) {
		var hand = this._handlers[maskResolved++];

		if (typeof hand === "string") {
			result += hand
			continue;
		}

		var toParse = val[valueResolved++];
		var parsed = hand(toParse === undefined ? '' : toParse);

		if (this._options.invalidValues.indexOf(parsed) < 0) {
			result += parsed;
		}
		else {
			break;
		}
	}

	return result;
}

module.exports = TinyMask;
