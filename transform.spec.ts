import { test, expect } from 'vitest'
import { CallExpressionNode, NodeTypes, RootNode } from './ast';
import { traverser, ParentNode } from './traverser';
test("transformer", () => {
  const originalAST: RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: 2,
          },
          {
            type: NodeTypes.CallExpression,
            name: "subtract",
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: 4,
              },
              {
                type: NodeTypes.NumberLiteral,
                value: 2,
              },
            ],
          },
        ],
      },
    ],
  };

  const transformedAST = {
    type: NodeTypes.Program,
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "add",
          },
          arguments: [
            {
              type: "NumberLiteral",
              value: 2,
            },
            {
              type: "CallExpression",
              callee: {
                type: "Identifier",
                name: "subtract",
              },
              arguments: [
                {
                  type: "NumberLiteral",
                  value: 4,
                },
                {
                  type: "NumberLiteral",
                  value: 2,
                },
              ],
            },
          ],
        },
      },
    ],
  };

  expect(transformer(originalAST)).toEqual(transformedAST);
});

test("NumberLiteral", () => {
  const originalAST:RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
        value: 2,
      },
    ],
  };

  const transformedAST = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "NumberLiteral",
          value: 2,
        },
      },
    ],
  };
  expect(transformer(originalAST)).toEqual(transformedAST);
});

test("callExpression add();", () => {
  const originalAST:RootNode = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: "add",
        params: [],
      },
    ],
  };

  const transformedAST = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "add",
          },
          arguments: [],
        },
      },
    ],
  };
  expect(transformer(originalAST)).toEqual(transformedAST);
});


function transformer(ast: RootNode): any {
  const newAst = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;
  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        if (node.type !== NodeTypes.NumberLiteral) return;
          const numberNode = {
            type: node.type,
            value: node.value,
          };
        pushNode(parent, numberNode);
       }
    },
    CallExpression: {
      enter(node, parent) { 
       if (node.type !== NodeTypes.CallExpression) return;
        const expressionNode = {
          type: node.type,
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        }
        node.context = expressionNode.arguments;
        pushNode(parent, expressionNode);
      }
    }
  });
  

  return newAst;

  function pushNode(parent: ParentNode, data: any) {
    if (parent?.type !== NodeTypes.CallExpression)
      data = {
        type: "ExpressionStatement",
        expression: data,
      };

    parent?.context?.push(data);
  }
}

