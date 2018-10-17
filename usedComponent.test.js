import React from 'react';
import parse from './index.js';
import fs from 'fs';
import path from 'path';
describe('Simple Used Component Parser', () => {
	it.only('should have name', () => {
		fs.readFile(path.resolve(__dirname, './fixtures/LanguageComponent.js'), { encoding: 'utf-8' }, (err, data) => {
			const x = parse(data);
			console.log(x);
		});
	});
});
