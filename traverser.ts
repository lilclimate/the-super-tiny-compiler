import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from './ast';

export type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;

export interface VisitorOption { 
  enter: MethodFn;
	exit?: MethodFn;
} 

export interface Visitor { 
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption
  StringLiteral?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  function traverserArray(params: ChildNode[], parent: ParentNode) {
    params.forEach(node => {
      traverserNode(node, parent);
    });
  }

  function traverserNode(node: ChildNode | RootNode, parent?: ParentNode) {
    const visitorObj = visitor[node.type];
    if (visitorObj) {
      visitorObj.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break;
      case NodeTypes.CallExpression:
        traverserArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverserArray(node.body, node);
        break;
    }

    if (visitorObj && visitorObj.exit) {
      visitorObj.exit(node, parent);
    }
  }

  traverserNode(rootNode);
}
