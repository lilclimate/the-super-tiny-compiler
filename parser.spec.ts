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



function parser(tokens: { type: TokenTypes; value: string; }[]): any {
  let current = 0;
  const rootNode = createRootNode();
  
  rootNode.body.push(walk());
  return rootNode;

  function walk() {
    let token = tokens[current];
    if (token.type === TokenTypes.Number) {
      return createNumberNode(token.value);
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current];
      const expressionNode = createCallExpressionNode(token.value);

      token = tokens[++current];
      while (current < tokens.length && !(token.type === TokenTypes.Paren && token.value !== ')')) {
        if (token.type === TokenTypes.Number) {
          expressionNode.params.push(walk());
        }
        token = tokens[++current];
      }
      return expressionNode;
    }
    throw new Error(`undefined token: ${token}`);
  }
  
}

enum NodeTypes { 
  Root,
  Number,
  CallExpression
}

interface Node { 
	type: NodeTypes
}

type ChildNode = NumberNode | CallExpressionNode

interface RootNode extends Node { 
	body: ChildNode[]
}

interface NumberNode extends Node { 
	value:number 
}

interface CallExpressionNode extends Node { 
	name: string,
	params: ChildNode[]
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.Number,
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
    type: NodeTypes.Root,
    body: [],
  };
}

