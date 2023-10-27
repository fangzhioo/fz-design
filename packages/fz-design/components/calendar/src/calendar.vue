<script lang="ts" setup>
  import { Emits, Props } from './props'
  import { computed, watch, reactive, onBeforeMount } from 'vue'
  import { IconChevronRight, IconChevronLeft } from '@fz-design/fz-design-icon'
  import { FzSvgIcon, FzButton } from '../..'
  import { useNamespace } from '../../../hooks'
  import { isDate } from '../../../utils'
  import { useCalendar } from './hooks/use-calendar'
  import { CHANGE_EVENT } from '../../../constants'
  
  import type { GenerateCalendarItem } from './hooks/use-calendar'
  import type { CSSProperties } from 'vue'

  defineOptions({ name: 'FzCalendar' })

  const ns = useNamespace('calendar')
  const prop = defineProps(Props)
  const emit = defineEmits(Emits)

  const { generateCalendar } = useCalendar(prop)

  /**
   * 获取日期参数
   *
   * 如果传入的不是一个 Date 对象，则实例化一个当前日期对象
   */
  const currentDate = computed((): Date => (isDate(prop.date) ? prop.date : new Date()))

  /** 日期集合 */
  const dates = reactive({
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth() + 1,
    date: currentDate.value.getDate()
  })

  /** 日期集合 */
  const allMonthDays = computed((): GenerateCalendarItem[] => {
    return generateCalendar(dates.year, dates.month)
  })

  /** 星期列表 */
  const weekList = computed((): string[] => ['日', '一', '二', '三', '四', '五', '六'])

  /** 切换上个月 */
  const changeLastMonth = (): void => {
    if (dates.month === 1) {
      dates.year -= 1
      dates.month = 12
    } else {
      dates.month -= 1
    }
  }

  /** 切换下个月 */
  const changeNextMonth = (): void => {
    if (dates.month === 12) {
      dates.year += 1
      dates.month = 1
    } else {
      dates.month += 1
    }
  }

  /**
   * 操作栏可选项对象映射
   *
   * @param { Function } last 点击上个月执行的方法
   * @param { Function } next 点击下个月执行的方法
   * @param { Function } now 点击今天执行的方法
   */
  const option = {
    prev: (): void => changeLastMonth(),
    next: (): void => changeNextMonth(),
    current: (): void => {
      dates.year = prop.date.getFullYear()
      dates.month = prop.date.getMonth() + 1
      dates.date = prop.date.getDate()
    }
  } as const

  /**
   * 点击操作栏
   *
   * @param { 'last' | 'current' | 'next' } target 不同类型用于切换当前时间、下个月、上个月
   */
  const optionClick = (target: 'prev' | 'current' | 'next'): void => {
    /** 如果存在则执行指定方法 */
    option[target] && option[target]()
  }

  /**
   * 点击对每一天
   *
   * @param { number } days 日期对象
   */
  const handleClick = (days: GenerateCalendarItem): void => {
    const { target, day } = days

    /** 切换上个月 */
    if (target === 'prev') {
      option[target]()
    }

    /** 切换下个月 */
    if (target === 'next') {
      option[target]()
    }

    /** 点击当前月份的日期，高亮显示 */
    if (target === 'current') {
      dates.date = day
      emit(CHANGE_EVENT, dates.year, dates.month, dates.date)
      // run(prop.onChangeDate, dates.year, dates.month, dates.date)
    }
  }

  /** 当月份发生改变时候触发的回调 */
  const watchMonth = watch(
    (): number => dates.month,
    /**
     * @param { number } month 最新的月份
     */
    (month: number): void => {
      emit(CHANGE_EVENT, dates.year, month, dates.date)

      // run(prop.onChangeMonth, dates.year, month, dates.date)
    }
  )

  /** 改变日期的监听器 */
  const watchChange = watch(
    () => dates,
    (): void => {
      // run(prop.onChange, dates.year, dates.month, dates.date)
      emit(CHANGE_EVENT, dates.year, dates.month, dates.date)
    },
    { deep: true }
  )

  onBeforeMount(() => {
    watchChange()
    watchMonth()
  })

  /** 样式列表 */
  const styleList = computed<CSSProperties>(() => ({
    [ns.cssVarBlockName('border-color')]: prop.borderColor,
    [ns.cssVarBlockName('day-cell-height')]: prop.dayCellHeight,
    [ns.cssVarBlockName('week-cell-height')]: prop.weekCellHeight
  }))

  /** 类名列表 */
  const classList = computed(() => [ns.b(), ns.is('border', prop.border)])
</script>

<template>
  <div :class="classList" :style="styleList">
    <!-- 头部操作栏 -->
    <header v-if="!hiddenHeader" :class="ns.e('header')">
      <!-- 上个月切换按钮 -->
      <fz-svg-icon :icon="IconChevronLeft" @click="optionClick('prev')" />

      <!-- 操作栏 -->
      <div :class="ns.e('option')">
        <!-- 年份选择器 -->
        <span>{{ dates.year }}</span>
        <!-- <fz-select v-model="dates.year" :width="116">
          <fz-option v-for="i in 200" :key="i" :value="1900 + i">
            {{ 1900 + i }}
          </fz-option>
        </fz-select> -->

        <!-- 月份选择器 -->
        <span>{{ dates.month }}</span>

        <!-- <fz-select v-model="dates.month" :width="116">
          <fz-option v-for="i in 12" :key="i" :value="i">{{ i }}</fz-option>
        </fz-select> -->

        <fz-button type="default" @click="optionClick('current')">今天</fz-button>
      </div>

      <!-- 下个月切换按钮 -->
      <fz-svg-icon :icon="IconChevronRight" @click="optionClick('next')" />
    </header>

    <!-- 周几 -->
    <div :class="ns.e('week')">
      <div v-for="(week, index) in weekList" :key="index" :class="ns.e('week-item')">
        {{ week }}
      </div>
    </div>

    <!-- 每一天 -->
    <div :class="ns.e('day')">
      <div
        v-for="(days, index) in allMonthDays"
        :key="index"
        :class="[
          ns.e('day-item'),
          ns.is('day-current', days.target === 'current'),
          ns.is(
            'day-today',
            days.day === dates.date &&
              days.month === dates.month &&
              days.target === 'current'
          )
        ]"
        @click="handleClick(days)"
      >
        <span :class="ns.e('solar')">{{ days.day }}</span>
        <span v-if="lunar" :class="ns.e('lunar')">
          <!-- 农历节日 -> 阳历节日 -> 节气 -> 农历日期 -->
          {{ days.lunarFestival || days.festival || days.term || days.lunar }}
        </span>
      </div>
    </div>
  </div>
</template>
