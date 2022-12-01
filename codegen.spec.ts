import { test, expect } from "vitest";
import { NodeTypes } from "./ast";
test.skip("two ExpressionStatement", () => {
  const ast = {
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
              value: "2",
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
                  value: "4",
                },
                {
                  type: "NumberLiteral",
                  value: "2",
                },
              ],
            },
          ],
        },
      },
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
              value: "2",
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
                  value: "4",
                },
                {
                  type: "NumberLiteral",
                  value: "2",
                },
              ],
            },
          ],
        },
      },
    ],
  };

  expect(codegen(ast)).toMatchInlineSnapshot(
    '"add(2, subtract(4, 2));add(2, subtract(4, 2));"'
  );
});

test.skip("codegen", () => {
  const ast = {
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
              value: "2",
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
                  value: "4",
                },
                {
                  type: "NumberLiteral",
                  value: "2",
                },
              ],
            },
          ],
        },
      },
    ],
  };

  expect(codegen(ast)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"');
});


test.skip('NumberLiteral', () => { 
	const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "NumberLiteral",
          value: "2",
        },
      },
    ],
  };

  expect(codegen(ast)).toMatchInlineSnapshot('"2;"');
});

function codegen(node): any {
}
