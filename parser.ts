import { NodeTypes, NumberNode, CallExpressionNode, RootNode } from './ast';
import { TokenTypes } from './tokenizer';

export function parser(tokens: { type: TokenTypes; value: string; }[]): any {
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
