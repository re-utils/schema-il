import type { IL } from '../il.ts';

/**
 * - Expression must be wrapped correctly before passing in methods.
 */
const toString: IL<string, string, string> = {
  isFloat: (expr) => `Number.isFinite(${expr})`,
  isInt: (expr) => `Number.isInteger(${expr})`,
  isString: (expr) => `typeof ${expr} === 'string'`,
  isBool: (expr) => `typeof ${expr} === 'boolean'`,
  isNil: (expr) => `${expr} === null`,
  isArray: (expr) => `Array.isArray(${expr})`,

  constTrue: 'true',
  constFalse: 'false',

  dynConstant: (value) => (typeof value === 'string' ? JSON.stringify(value) : '' + value),

  equals: (left, right) => `(${left} === ${right})`,
  greaterThan: (left, right) => `(${left} === ${right})`,
  lessThan: (left, right) => `(${left} === ${right})`,
  lessEqualThen: (left, right) => `(${left} === ${right})`,
  greaterEqualThen: (left, right) => `(${left} === ${right})`,

  and: (left, right) => `(${left} && ${right})`,
  or: (left, right) => `(${left} || ${right})`,
  not: (expr) => `!(${expr})`,
  ternary: (condition, ifTrue, ifFalse) => `(${condition} ? ${ifTrue} : ${ifFalse})`,

  fn: (args, body) => `((${args.join()})=>${body})`,
  callID: (fn, args) => `${fn}(${args.join()})`,
  constructID: (fn, args) => `new ${fn}(${args.join()})`,

  identifierMemberOf: (id, member) => `${id}.${member}`,
  indexOf: (id, member) => `${id}[${member}]`,
  memberOf: (id, member) => `${id}[${JSON.stringify(member)}]`,

  ifTrue: (condition, then, otherwise) =>
    `if(${condition})${otherwise ? then + ';else ' + otherwise : then}`,
  ret: (expr) => 'return ' + expr,

  block: (statements) => '{' + statements.join(';') + '}',

  declareMut: (id, value) => `let ${id}=${value}`,
  declareConst: (id, value) => `const ${id}=${value}`,
  assign: (id, value) => `${id}=${value}`,
};

export default toString;
