import { NodeTypes, RootNode, ChildNode } from './ast';

export interface VisitorOption { 
  enter(node: RootNode | ChildNode, parent: RootNode | ChildNode| undefined);
  exit(node: RootNode | ChildNode, parent: RootNode | ChildNode| undefined);
} 

export interface Visitor { 
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption
  StringLiteral?: VisitorOption
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  function traverserArray(params: ChildNode[], parent?: RootNode | ChildNode) {
    params.forEach(node => {
      traverserNode(node, parent);
    });
  }

  function traverserNode(node: ChildNode | RootNode, parent?: RootNode | ChildNode) {
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

    if (visitorObj) {
      visitorObj.exit(node, parent);
    }
  }

  traverserNode(rootNode);
}
