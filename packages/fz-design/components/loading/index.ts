import { Loading } from './src/service'
import { vLoading } from './src/directive'

import { installDirective, installFn } from '../../utils'

// installer and everything in all
export const loading = installDirective(vLoading, 'loading');

export const FzLoading = installFn(Loading, 'FzLoading');
  
export * from './src/interface'

export default FzLoading
