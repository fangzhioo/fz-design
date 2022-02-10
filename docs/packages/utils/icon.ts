export type ComponentType = 'success' | 'warning' | 'info' | 'error';

/**
 * 组件状态对应的图标枚举
 * 'success' | 'warning' | 'info' | 'error'
 */
export const TypeIconsNameMap: Record<ComponentType, string> = {
  success: 'success-filling',
  warning: 'warning-filling',
  info: 'prompt-filling',
  error: 'delete-filling',
};
