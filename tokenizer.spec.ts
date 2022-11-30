import { test, expect } from 'vitest'
import { TokenTypes, tokenizer } from './tokenizer';
test('tokenizer', () => { 
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

test('(add 1 2)', () => { 
	const code = `(add 1 2)`;
	const tokens = 
				[
						{ type: TokenTypes.Paren,  value: '('        },
						{ type: TokenTypes.Name,   value: 'add'      },
						{ type: TokenTypes.Number, value: '1'        },
						{ type: TokenTypes.Number, value: '2'        },
						{ type: TokenTypes.Paren,  value: ')'        },
				];
	expect(tokenizer(code)).toEqual(tokens);
})



