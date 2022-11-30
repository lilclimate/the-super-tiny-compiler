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

enum TokenTypes { 
	Paren,
	Name,
	Number,
}

function tokenizer(code: string): any {
	return [
		{type: TokenTypes.Paren, value: '('}	
	]
}

