<script lang="ts" setup>
  import { Props } from './props'
  import { useLocale } from '../../../hooks'

  defineOptions({name: 'FzCalendar'})

  defineProps(Props)

  const { t } = useLocale();
</script>

<template>
  <div class="fz-calendar">
    {{ t('fz.colorpicker.confirm') }}
  </div>
</template>
