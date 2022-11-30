export enum NodeTypes {
 NumberLiteral = "NumberLiteral",
	Program = "Program",
	StringLiteral = "StringLiteral",
	CallExpression = "CallExpression"
}
interface Node {
  type: NodeTypes;
}
type ChildNode = NumberNode | CallExpressionNode;
export interface RootNode extends Node {
  body: ChildNode[];
}
export interface NumberNode extends Node {
  value: number;
}
export interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
}
