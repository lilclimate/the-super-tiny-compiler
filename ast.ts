export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
	Program = "Program",
	StringLiteral = "StringLiteral",
	CallExpression = "CallExpression"
}
interface Node {
  type: NodeTypes;
}
export type ChildNode = NumberLiteralNode | CallExpressionNode| StringLiteralNode
export interface RootNode extends Node {
  body: ChildNode[];
  type: NodeTypes.Program;
  context?: ChildNode[];
}

export interface StringLiteralNode extends Node { 
  type: NodeTypes.StringLiteral;
  value: string;
  context?: ChildNode[];
}
export interface NumberLiteralNode extends Node {
  value: number;
  type: NodeTypes.NumberLiteral;
  context?: ChildNode[];
}
export interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
  type: NodeTypes.CallExpression;
  context?: ChildNode[];
}
