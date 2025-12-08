import type { IL } from '../il.ts';

export interface Statement extends String {
  '~statement': never;
}

export interface Expr extends Statement {
  '~expr': never;
}

export interface Id extends Expr {
  '~id': never;
}

export interface Constant extends Expr {
  '~constant': never;
}

/**
 * Expression must be wrapped correctly before passing in methods.
 *
 * Statements should be handled correctly by appending ';'.
 */
const toString: IL<string, string, string, string> = {
  isFloat: (expr) => `Number.isFinite(${expr})`,
  isInt: (expr) => `Number.isInteger(${expr})`,
  isString: (expr) => `(typeof ${expr}==='string')`,
  isBool: (expr) => `(typeof ${expr}==='boolean')`,
  isNil: (expr) => `(${expr}===null)`,
  isArray: (expr) => `Array.isArray(${expr})`,

  constTrue: 'true',
  constFalse: 'false',

  constant: (value) => (typeof value === 'string' ? JSON.stringify(value) : '' + value),

  equals: (left, right) => `(${left}===${right})`,
  lessThan: (left, right) => `(${left}<${right})`,
  lessOrEqualThan: (left, right) => `(${left}<=${right})`,

  and: (left, right) => `(${left}&&${right})`,
  or: (left, right) => `(${left}||${right})`,
  not: (expr) => `!(${expr})`,
  ternary: (condition, ifTrue, ifFalse) => `(${condition}?${ifTrue}:${ifFalse})`,

  fn: (args, body) => `((${args.join()})=>{${body}})`,
  call: (fn, args) => `${fn}(${args.join()})`,
  construct: (fn, args) => `new ${fn}(${args.join()})`,

  id: (name) => name,
  idMemberOf: (id, member) => `${id}.${member}`,
  memberOf: (id, member) => `${id}[${member}]`,

  ifTrue: (condition, then, otherwise) =>
    otherwise == null ? `if(${condition})${then}` : `if(${condition}){${then}}else ${otherwise}`,
  ret: (expr) => 'return ' + expr,

  block: (statements) => '{' + statements.join(';') + '}',

  declareMut: (id, value) => `let ${id}=${value}`,
  declareConst: (id, value) => `const ${id}=${value}`,
  assign: (id, value) => `(${id}=${value})`,
};

export default toString as any as IL<Statement, Expr, Id, Constant>;
