import { NodeTypes, RootNode } from './ast';
import { traverser, ParentNode } from './traverser';

export function transformer(ast: RootNode): any {
  const newAst = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;
  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        if (node.type !== NodeTypes.NumberLiteral)
          return;
        const numberNode = {
          type: node.type,
          value: node.value,
        };
        pushNode(parent, numberNode);
      }
    },
    CallExpression: {
      enter(node, parent) {
        if (node.type !== NodeTypes.CallExpression)
          return;
        const expressionNode = {
          type: node.type,
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };
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
