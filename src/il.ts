export interface IL<in out Statement, in out Expr extends Statement, in out Id extends Expr> {
  isFloat: (expr: Expr) => Expr;
  isInt: (expr: Expr) => Expr;
  isString: (expr: Expr) => Expr;
  isBool: (expr: Expr) => Expr;
  isNil: (expr: Expr) => Expr;
  isArray: (expr: Expr) => Expr;

  constTrue: Id;
  constFalse: Id;

  dynConstant: (value: bigint | boolean | null | number | string | undefined) => Id;

  equals: (left: Expr, right: Expr) => Expr;
  greaterThan: (left: Expr, right: Expr) => Expr;
  lessThan: (left: Expr, right: Expr) => Expr;
  lessEqualThen: (left: Expr, right: Expr) => Expr;
  greaterEqualThen: (left: Expr, right: Expr) => Expr;

  and: (left: Expr, right: Expr) => Expr;
  or: (left: Expr, right: Expr) => Expr;
  not: (expr: Expr) => Expr;
  ternary: (condition: Expr, ifTrue: Expr, ifFalse: Expr) => Expr;

  fn: (args: Id[], body: Expr) => Expr;
  callID: (fn: Id, args: Expr[]) => Expr;
  constructID: (fn: Id, args: Expr[]) => Expr;

  identifierMemberOf: (id: Id, member: string) => Id;
  indexOf: (id: Id, member: number) => Id;
  memberOf: (id: Id, member: Expr) => Id;

  ifTrue: (condition: Expr, then: Statement, otherwise?: Statement) => Statement;
  ret: (expr: Expr) => Statement;

  block: (statements: Statement[]) => Statement;

  declareMut: (id: Id, value: Expr) => Statement;
  declareConst: (id: Id, value: Expr) => Statement;
  assign: (id: Id, value: Expr) => Expr;
}

export const reduceAnd = <Expr>(il: IL<any, Expr, any>, operands: Expr[]): Expr =>
  operands.length === 0 ? il.constTrue : operands.reduce(il.and);

export const reduceOr = <Expr>(il: IL<any, Expr, any>, operands: Expr[]): Expr =>
  operands.length === 0 ? il.constFalse : operands.reduce(il.or);
