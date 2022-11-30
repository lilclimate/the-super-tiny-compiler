import { test, expect } from 'vitest'
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
      type: NodeTypes.Root,
      body: [{
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [{
          type: NodeTypes.Number,
          value: 2,
        }, {
          type: NodeTypes.CallExpression,
          name: 'subtract',
          params: [{
            type: NodeTypes.Number,
            value: 4,
          }, {
            type: NodeTypes.Number,
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

