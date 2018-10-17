import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
class Parser {
	constructor(code) {
		this.code = code;
		return this.init();
	}

	init() {
		const code = parse(this.code, {
			sourceType: 'module',
			plugins: ['jsx'],
        });
        
        const foundComponents = [];

		traverse(code, {
			ImportDeclaration(path) {
				const node = path.node;

				var regex = /((\.{2}\/)+\w.*|\.\/+\w.+)/g;
                const isRelative = node.source.value.match(regex);

                if(isRelative) {
                    const importSpecifierPaths = path.get('specifiers');

                    for (const importSpecifierPath of importSpecifierPaths) {
                        const node = importSpecifierPath.node;
                        const id = node.local;
                        if(id.name.charAt(0) === id.name.toUpperCase().charAt(0)) {
                            foundComponents.push(id.name)
                        }
                    }
                }
			}
        });
        
        return foundComponents;
	}
}

export default code => new Parser(code);
