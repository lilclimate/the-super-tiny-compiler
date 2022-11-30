import { test, expect } from 'vitest'
import { TokenTypes } from './tokenizer';
test.skip('parser', () => {
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

	const ast = {
      type: 'Program',
      body: [{
        type: 'CallExpression',
        name: 'add',
        params: [{
          type: 'NumberLiteral',
          value: '2',
        }, {
          type: 'CallExpression',
          name: 'subtract',
          params: [{
            type: 'NumberLiteral',
            value: '4',
          }, {
            type: 'NumberLiteral',
            value: '2',
          }]
        }]
      }]
    };
	expect(parser(tokens)).toEqual(ast);
});

test('number', () => { 
  const tokens = [{
    type: TokenTypes.Number,
    value: "2"
  }];

  const ast = {
    type: NodeTypes.Root,
    body: [{
      type: NodeTypes.Number,
      value: 2
    }],
  };
  expect(parser(tokens)).toEqual(ast);
});

enum NodeTypes { 
  Root,
  Number
}

function parser(tokens: { type: TokenTypes; value: string; }[]): any {
  const ast = {
    type: NodeTypes.Root,
    body: [] as any,
  };
  const token = tokens[0];
  if (token.type === TokenTypes.Number) { 
    ast.body.push({
      type: NodeTypes.Number,
      value: Number(token.value)
    });
  }
   
  return ast;
}


















