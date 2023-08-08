type AnyFunction<T = any> = (...args: any[]) => T;

// 获取函数类型的参数值组成的元组类型
type FunctionParams<T> = T extends (...args: infer R) => any ? R : never;

// 在元组中根据位置提取对应位置的类型
type ElementAtPosition<T extends any[], P extends number> = T[P];

// 获取函数的第一个入参参数类型
type FunctionParamsFirst<T extends AnyFunction> = FunctionParamsAtPosition<T, 0>;

// 获取函数的任意一个入参参数类型
type FunctionParamsAtPosition<T extends AnyFunction, K extends number> = ElementAtPosition<
  FunctionParams<T>,
  K
>;

// 获取函数的最后一个入参参数类型
type FunctionParamsLast<T extends AnyFunction> = ElementAtPosition<
  FunctionParams<T>,
  Subtract<FunctionParams<T>['length'], 1>
>;

// 实现一个减法
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type Subtract<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [
  ...arr1: BuildArray<Num2>,
  ...arr2: infer Rest,
]
  ? Rest['length']
  : never;

type Recordable<T = any> = Record<string, T>;

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type TimeoutHandle = ReturnType<typeof setTimeout>;

type IntervalHandle = ReturnType<typeof setInterval>;

type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<ReturnType<T>>;

type AnyObject<T = any> = {
  [key: string]: T;
};

type CustomizedHTMLElement<T> = HTMLElement & T;

interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

// utils ----------------------

/**
 * 对于交叉类型，我们一眼并不能看出它真实的类型结构，借助它可以将真实结构展示出来（复制一遍）
 */
type Flatten<T> = {
  [K in keyof T]: T[K];
};

// 排除 null | undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T[K]> : NonNullable<T[K]>;
};

// 部分修饰
type MarkPropsAsNonNullable<T extends object, K extends keyof T> = Flatten<
  NonNullable<Pick<T, K>> & Omit<T, K>
>;

type Nullable<T> = T | null;

type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};

type MarkPropsAsNullable<T extends object, K extends keyof T> = Flatten<
  Nullable<Pick<T, K>> & Omit<T, K>
>;

// ------------------

// 递归设置 Partial
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// 部分修饰
type MarkPropsAsOptional<T extends object, K extends keyof T> = Flatten<
  Partial<Pick<T, K>> & Omit<T, K>
>;

// ------------------

// 递归设置 Required
type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// 部分修饰
type MarkPropsAsRequired<T extends object, K extends keyof T> = Flatten<
  Required<Pick<T, K>> & Omit<T, K>
>;

// ------------------

// 递归设置 Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 部分修饰
type MarkPropsAsReadonly<T extends object, K extends keyof T> = Flatten<
  Readonly<Pick<T, K>> & Omit<T, K>
>;

// ------------------

type DeepUnReadonly<T> = {
  -readonly [K in keyof T]-?: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 部分修饰
type MarkPropsAsUnReadonly<T extends object, K extends keyof T> = Flatten<
  UnReadonly<Pick<T, K>> & Omit<T, K>
>;

// ------------------

// 提取必填的属性名
type RequiredKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? never : K;
}[keyof T];

// 提取可选参数属性名
type PartialKeys<T> = {
  [K in keyof T]: {} extends Pick<T, K> ? K : never;
}[keyof T];

// ------------------

// https://stackoverflow.com/questions/69089549/typescript-template-literal-type-how-to-infer-numeric-type

type MAXIMUM_ALLOWED_BOUNDARY<T = 99> = T;

type Mapped<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N
  ? Result
  : Mapped<N, [...Result, Result['length']]>;

type NumberRange = Mapped<MAXIMUM_ALLOWED_BOUNDARY>; // <- tuple [0, 1, 2, 3, ...]

type ConvertToNumber<T extends string, Range extends number[] = NumberRange> = T extends keyof Range
  ? Range[T]
  : never;
