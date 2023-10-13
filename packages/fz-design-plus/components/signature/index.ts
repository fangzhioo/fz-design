import Signature from './src/signature.vue'

import { install } from '../../../fz-design/utils';

export const FzSignature = install(Signature)

export type SignatureInstance = InstanceType<typeof Signature>

export * from './src/interface'

export default FzSignature
