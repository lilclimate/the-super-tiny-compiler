import { test, expect } from 'vitest'
test.skip('tokenizer', () => { 
	const code = `(add 2 (subtract 4 2))`;
	const tokens = 
				[
						{ type: TokenTypes.Paren,  value: '('        },
						{ type: TokenTypes.Name,   value: 'add'      },
						{ type: TokenTypes.Number, value: '2'        },
						{ type: TokenTypes.Paren,  value: '('        },
						{ type: TokenTypes.Name,   value: 'subtract' },
						{ type: TokenTypes.Number, value: '4'        },
						{ type: TokenTypes.Number, value: '2'        },
						{ type: TokenTypes.Paren,  value: ')'        },
						{ type: TokenTypes.Paren,  value: ')'        },
				];
	expect(tokenizer(code)).toEqual(tokens);
})

test('left paren', () => { 
	const code = '(';
	const tokens = [
		{type: TokenTypes.Paren, value: '('}	
	]
	expect(tokenizer(code)).toEqual(tokens)
})

test('right paren', () => { 
	const code = ')';
	const tokens = [
		{type: TokenTypes.Paren, value: ')'}	
	]
	expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => { 
	const code = `add`;	
	const tokens = [{type: TokenTypes.Name, value: 'add'}];
	expect(tokenizer(code)).toEqual(tokens);
});

test('number', () => { 
	const code = `12`;	
	const tokens = [{type: TokenTypes.Number, value: '12'}];
	expect(tokenizer(code)).toEqual(tokens);
});

enum TokenTypes { 
	Paren,
	Name,
	Number,
}

interface Token { 
	type: TokenTypes;
	value: string;
}

function tokenizer(code: string): any {
	const tokens: Token[] = [];
	let current = 0;
	while (current < code.length) { 
		let char = code[current]
		
		if (char === '(') {
			tokens.push({
				type: TokenTypes.Paren,
				value: char 
			});
			current++;
			continue;
		}

		if (char === ')') {
			tokens.push({
				type: TokenTypes.Paren,
				value: char 
			});
			current++;
			continue;
		}

		const LETTERS = /[a-z]/i;	
		if (LETTERS.test(char)) { 
			let value = '';
			while (LETTERS.test(char) && current < code.length) {
				value += char;
				char = code[++current]
			}
			tokens.push({type: TokenTypes.Name, value});
		}

		const NUMBERS = /[0-9]/;	
		if (NUMBERS.test(char)) { 
			let value = '';
			while (NUMBERS.test(char) && current < code.length) { 
				value += char;
				char = code[++current]
			}
			tokens.push({type: TokenTypes.Number, value});
		}
	}
	
	return tokens;
}

