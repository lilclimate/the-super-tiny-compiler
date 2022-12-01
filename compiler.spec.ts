import { test, expect } from "vitest";
import { tokenizer } from './tokenizer';
import { parser } from './parser';
import {transformer} from './transformer'
import {codegen} from './codegen'
test("compiler", () => {
  const code = `(add 2 (subtract 4 2))`;

  expect(compiler(code)).toBe("add(2, subtract(4, 2));");
});

function compiler(code: string): any {
  const tokens = tokenizer(code);
  const oldAst = parser(tokens);
  const newAst = transformer(oldAst);
  return codegen(newAst);
}
