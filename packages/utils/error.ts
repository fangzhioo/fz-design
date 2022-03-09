/**
 * 自定义错误
 */
class FzUIError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'FzUIError';
  }
}

/**
 * 报错
 * @param scope
 * @param m
 */
export function throwError(scope: string, m: string): never {
  throw new FzUIError(`[${scope}] ${m}`);
}

/**
 * 报警
 * @param scope
 * @param message
 */
export function debugWarn(scope: string, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(new FzUIError(`[${scope}] ${message}`));
  }
}
