import { test, expect } from 'vitest'
import { NodeTypes, NumberNode, CallExpressionNode, RootNode } from './ast';
import { TokenTypes } from './tokenizer';
test('parser', () => {
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
      type: NodeTypes.Program,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: 2,
        }, {
          type: NodeTypes.CallExpression,
          name: 'subtract',
          params: [{
            type: NodeTypes.NumberLiteral,
            value: 4,
          }, {
            type: NodeTypes.NumberLiteral,
            value: 2,
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
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.NumberLiteral,
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
      type: NodeTypes.Program,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.NumberLiteral,
          value: 2,
        }, {
          type: NodeTypes.NumberLiteral,
          value: 4,
        }]
      }]
    };
	expect(parser(tokens)).toEqual(ast);
});



function parser(tokens: { type: TokenTypes; value: string; }[]): any {
  let current = 0;
  const rootNode = createRootNode();
  
  while (current < tokens.length) 
    rootNode.body.push(walk());
  return rootNode;

  function walk() {
    let token = tokens[current];
    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberNode(token.value);
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current];
      const expressionNode = createCallExpressionNode(token.value);

      token = tokens[++current];
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        expressionNode.params.push(walk());
        token = tokens[current];
      }
      current++;
      return expressionNode;
    }
    throw new Error(`undefined token: ${token}`);
  }
  
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value: Number(value)
  };
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  };
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  };
}

