export type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never
export type PromiseReturnType<T> = UnboxPromise<ReturnType<T>>
