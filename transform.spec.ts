import { test, expect } from 'vitest'
import { NodeTypes, RootNode } from './ast';
import { transformer } from './transformer';
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



