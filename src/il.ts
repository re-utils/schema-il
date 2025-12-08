export interface IL<
  in out Statement,
  in out Expr extends Statement,
  in out Id extends Expr,
  in out Constant extends Expr,
> {
  isFloat: (expr: Expr) => Expr;
  isInt: (expr: Expr) => Expr;
  isString: (expr: Expr) => Expr;
  isBool: (expr: Expr) => Expr;
  isNil: (expr: Expr) => Expr;
  isArray: (expr: Expr) => Expr;

  constTrue: Constant;
  constFalse: Constant;

  constant: (value: bigint | boolean | null | number | string | undefined) => Constant;

  equals: (left: Expr, right: Expr) => Expr;
  lessThan: (left: Expr, right: Expr) => Expr;
  lessOrEqualThan: (left: Expr, right: Expr) => Expr;

  and: (left: Expr, right: Expr) => Expr;
  or: (left: Expr, right: Expr) => Expr;
  not: (expr: Expr) => Expr;
  ternary: (condition: Expr, ifTrue: Expr, ifFalse: Expr) => Expr;

  fn: (args: Id[], body: Statement) => Expr;
  call: (fn: Expr, args: Expr[]) => Expr;
  construct: (fn: Expr, args: Expr[]) => Expr;

  id: (name: string) => Id;
  idMemberOf: (id: Id, member: Id) => Id;
  memberOf: (id: Id, member: Expr) => Id;

  ifTrue: (condition: Expr, then: Statement, otherwise?: Statement) => Statement;
  ret: (expr: Expr) => Statement;

  block: (statements: Statement[]) => Statement;

  declareMut: (id: Id, value: Expr) => Statement;
  declareConst: (id: Id, value: Expr) => Statement;
  assign: (id: Id, value: Expr) => Expr;
}

export const reduceAnd = <Expr>(il: IL<any, Expr, any, any>, operands: Expr[]): Expr =>
  operands.length === 0 ? il.constTrue : operands.reduce(il.and);

export const reduceOr = <Expr>(il: IL<any, Expr, any, any>, operands: Expr[]): Expr =>
  operands.length === 0 ? il.constFalse : operands.reduce(il.or);
