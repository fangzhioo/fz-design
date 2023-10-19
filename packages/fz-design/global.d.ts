import type * as components from './components'

/**
 * Volar 插件实现代码提示
 *
 * https://github.com/johnsoncodehk/volar/blob/master/extensions/vscode-vue-language-features/README.md
 */

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FzButton: typeof components.FzButton
    FzButtonGroup: typeof components.FzButtonGroup
    FzCollapseTransition: typeof components.FzCollapseTransition
    FzStickyCard: typeof components.FzStickyCard
    FzSvgIcon: typeof components.FzSvgIcon
    FzDivider: typeof components.FzDivider
    FzLink: typeof components.FzLink
    FzText: typeof components.FzText
    FzRow: typeof components.FzRow
    FzCol: typeof components.FzCol
    FzSpace: typeof components.FzSpace
    FzScrollbar: typeof components.FzScrollbar
    FzConfigProvider: typeof components.FzConfigProvider
    FzForm: typeof components.FzForm
    FzSwitch: typeof components.FzSwitch
    FzRadio: typeof components.FzRadio
    FzCheckbox: typeof components.FzCheckbox
    FzRate: typeof components.FzRate
    FzInput: typeof components.FzInput
    FzInputNumber: typeof components.FzInputNumber
    FzTextarea: typeof components.FzTextarea
    FzNotification: typeof components.FzNotification
    FzMessage: typeof components.FzMessage
    FzLoading: typeof components.FzLoading
    FzSkeleton: typeof components.FzSkeleton
    FzDropdown: typeof components.FzDropdown
    FzMenu: typeof components.FzMenu
    FzTabs: typeof components.FzTabs
    FzAlert: typeof components.FzAlert
    FzPagination: typeof components.FzPagination
    FzBackTop: typeof components.FzBackTop
    FzBadge: typeof components.FzBadge
    FzDrawer: typeof components.FzDrawer
    FzTag: typeof components.FzTag
    FzCalendar: typeof components.FzCalendar
    FzCard: typeof components.FzCard
    FzNumberAnimate: typeof components.FzNumberAnimate
    FzProgress: typeof components.FzProgress
    FzAvatar: typeof components.FzAvatar
    FzTimePicker: typeof components.FzTimePicker
    FzDatePicker: typeof components.FzDatePicker
    FzSelect: typeof components.FzSelect
    FzSlider: typeof components.FzSlider
    FzColorPicker: typeof components.FzColorPicker
    FzTable: typeof components.FzTable
    FzTree: typeof components.FzTree
    FzAffix: typeof components.FzAffix
    FzBreadcrumb: typeof components.FzBreadcrumb
    FzPageHeader: typeof components.FzPageHeader
    FzUpLoad: typeof components.FzUpLoad
    FzImage: typeof components.FzImage
    FzSwipe: typeof components.FzSwipe
    FzEmpty: typeof components.FzEmpty
    FzList: typeof components.FzList
    FzInfiniteScrolling: typeof components.FzInfiniteScrolling
    FzDialog: typeof components.FzDialog
    FzTooltip: typeof components.FzTooltip
    FzConfirmBox: typeof components.FzConfirmBox
    FzWatermark: typeof components.FzWatermark
    FzCountDown: typeof components.FzCountDown
  }

  interface ComponentCustomProperties {
    FzMessage: typeof components.FzMessage
    FzNotification: typeof components.FzNotification
  }
}

export {}
