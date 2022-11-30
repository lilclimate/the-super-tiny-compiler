import { expect, test }from 'vitest'
import {NodeTypes, RootNode} from './ast'
// 遍历树
test.skip("traverser", () => {
  const ast: RootNode = {
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

  const callArr: any = [];
  const visitor: any = {
    Program: {
      enter() {
        callArr.push("program-enter");
      },
      exit() {
        callArr.push("program-exit");
      },
    },

    CallExpression: {
      enter() {
        callArr.push("callExpression-enter");
      },
      exit() {
        callArr.push("callExpression-exit");
      },
    },

    NumberLiteral: {
      enter() {
        callArr.push("numberLiteral-enter");
      },
      exit() {
        callArr.push("numberLiteral-exit");
      },
    },
  };

  traverser(ast, visitor);

  expect(callArr).toEqual([
    "program-enter",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-enter",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "numberLiteral-enter",
    "numberLiteral-exit",
    "callExpression-exit",
    "callExpression-exit",
    "program-exit",
  ]);
});

function traverser(ast: RootNode, visitor: any) {
}
