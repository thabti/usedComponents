import React from 'react';
import parse from './index.js';
import fs from 'fs';
import path from 'path';
describe('Simple Used Component Parser', () => {
	it('should have named component', () => {
		fs.readFile(path.resolve(__dirname, './fixtures/LanguageComponent.js'), { encoding: 'utf-8' }, (err, data) => {
			expect(parse(data)).to.have.deep.members(['CustomSelect', 'Button']);
		});
	});
});
