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

test('callExpression', () => {
	const tokens = 
    [
      { type: TokenTypes.Paren,  value: '('        },
      { type: TokenTypes.Name,   value: 'add'      },
      { type: TokenTypes.Number, value: '2'        },
      { type: TokenTypes.Number, value: '4'        },
      { type: TokenTypes.Paren,  value: ')'        },
    ];	

	const ast = {
      type: NodeTypes.Root,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.Number,
          value: 2,
        }, {
          type: NodeTypes.Number,
          value: 4,
        }]
      }]
    };
	expect(parser(tokens)).toEqual(ast);
});

enum NodeTypes { 
  Root,
  Number,
  CallExpression
}

function parser(tokens: { type: TokenTypes; value: string; }[]): any {
  const rootNode = {
    type: NodeTypes.Root,
    body: [] as any,
  };
  let current = 0;
  let token = tokens[current];
  if (token.type === TokenTypes.Number) { 
    rootNode.body.push({
      type: NodeTypes.Number,
      value: Number(token.value)
    });
  }

  if (token.type === TokenTypes.Paren && token.value === '(') {
    token = tokens[++current];
    const expressionNode = {
      type: NodeTypes.CallExpression,
      name: token.value,
      params: [] as any,
    };

    token = tokens[++current];
    if (!(token.type=== TokenTypes.Paren && token.value !==')')) { 
      while (current < tokens.length) { 
        if (token.type === TokenTypes.Number) { 
          expressionNode.params.push({
            type: NodeTypes.Number,
            value: Number(token.value),
          });
        }
        token = tokens[++current]        
      }  
    }
    rootNode.body.push(expressionNode);
  }

  
   
  return rootNode;
}


















