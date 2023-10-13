import <%= displayName %> from './src/<%= name %>.vue'

import { install } from '../../utils'

export const Fz<%= displayName %> = install(<%= displayName %>)

export type <%= displayName %>Instance = InstanceType<typeof <%= displayName %>>

export * from './src/interface'

export default Fz<%= displayName %>
