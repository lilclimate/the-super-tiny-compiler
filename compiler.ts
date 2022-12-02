import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { transformer } from './transformer';
import { codegen } from './codegen';

export function compiler(code: string): any {
  const tokens = tokenizer(code);
  const oldAst = parser(tokens);
  const newAst = transformer(oldAst);
  return codegen(newAst);
}
