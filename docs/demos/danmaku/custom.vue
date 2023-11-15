<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'

  const customDanmus = [
    {
      avatar:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIADIAMgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAFBAYBAgMAB//aAAgBAQAAAAD7HU4ObhMC3AnlYvY8ISwA+6WDOd4/RA96FVeF66BOVWB3TsAOgZC27wv/xAAYAQEBAQEBAAAAAAAAAAAAAAACAwQAAf/aAAgBAhAAAAC3sw8uyRDQPV//xAAYAQADAQEAAAAAAAAAAAAAAAAAAgMBBP/aAAgBAxAAAACQ7LfmoUTNvFf/xAA0EAACAQMBBAcHAwUAAAAAAAABAgMABBESBRMxQRAhIjJRYbEUIzRCUnOBM3KSU2KRoeH/2gAIAQEAAT8AmmSCJpHOAoq6vZp8lmITkgonSQCMZxikkdGDxsVbxFbK2l7TGUkwHQfy6Ln4if7jetbcdglvH9TFv40hD71CGzlQpAyACRkt4VcxojxOdIj06GzwA5VKkilGUdjUcNxD9XlwI5g1Bfm0u4nC5UHDeYNWu0LS4B3D6mHHIwaufiJ/uN61tm6Et6GPCIbv8mtqi4gtrFkzjeuxIGRq+TP4orI1jpK+8MHAfVprYcM8kVysmoIGiwG8UfVgVcwh1ecDGiYcvlNWk7W9zDKucqwyPEVOczzfvb1q/wBkXWqR4Sja8nDHGCajAEagHIAx/jourmK0haaV9KrWyrFZLRZJ07MqNhc8Q3M/irfZFlaOGQF2HzOc1cACeYD+o3r0XptYEJKAyMx06TgsxOaupr+MhkIQk6TlfPlkVNCIxBc3A9onLjRG/WtWV1BPFlRp09TpzBHLoufiJ/uN69G05JLxt8C2ksQpTiAMHIq0mQz6HnMnZwurBwBRhKTLLK5Y6Oz/AGf9qwla3u4TykBRh/sdFx8RN9xvWpri43Unv5O6fmNSSSCHGtsb0DGfKrFm3zdZ7o9RUskhMnbbu+NLJJrh7bfqJz869onxjfSY/callk3knvG7x51//8QAIxEAAgEEAQMFAAAAAAAAAAAAAQIRAAMSMRAEIXETMjNBUf/aAAgBAgEBPwBMUTNv3tSdQrgZDYpwMmx0N8PdFv0iBMAyKS4QroF99JcxDhhMntwxgUCoJIER90jZCeG2PBpvjNWtHzx//8QAIBEAAgICAgIDAAAAAAAAAAAAAQIAERASAyEyM0GBkf/aAAgBAwEBPwBtmbURuErdRb1W/nCIW3vqMgJVr8YyWVIyvYG/5CKwJze36jY//9k=',
      name: '美绪'
    },
    {
      avatar:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIADIAMgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAABQIDBAEGB//aAAgBAQAAAAD65hzG3WLcATfCbHYQ9IY0uiEfRkU1IOr+RoUG1ornWj7Y6//EABgBAQADAQAAAAAAAAAAAAAAAAQAAgUD/9oACAECEAAAACEf3IJba51tGDNq/wD/xAAYAQEAAwEAAAAAAAAAAAAAAAAEAQMFAv/aAAgBAxAAAABSg0MWQdj+c6VozP/EAC0QAAIBAwMBBgUFAAAAAAAAAAECEQADBBASMUEiUVJhcZEFExQhgSAyQoKx/9oACAEBAAE/AKu5oEi2A3meKOXf8cfgV9Xe2kEgyOeCKsZSXAqs0XP91z7+wC3MSCzeg/RbuG06uO8T6a5kNkOOu0CpUXWQMdo4kQRPQihPd9tH+4jXIw0yDukq0RNHFu2/iOVku0pfx7foHt91MttbMyN7njqQDo3BPkdWEqRJEjkV8QOV2LVq2xBBlkoq+y181CrgHn1nXHffZQ+UH8aEwCaEoJP9qzbe+ySOUO7XCuxca2f5CR6jS477H7bftPWt7+NvekdzbWXYyo60rvtXtHgda3v4j71Yd/qLPaPJ6+Vb38be9f/EACYRAAECBAQHAQAAAAAAAAAAAAECAwAEEBIREzFSITNBQlFhgXL/2gAIAQIBAT8AffKDYjXqYznd5hhwuI46ijjOOaSfaYUm232Ik9F/KKQFRMN2LHgiJVdrmG6s32fYa5iP0Kf/xAAmEQABAgQFBAMAAAAAAAAAAAABAgMAEBESBBNCUoEhMTNhUXFy/9oACAEDAQE/AGGAoXK4EZLWwQ+2G19Oxk28RlhI9GEqur9xi9HMm3C2qtAfRhhy9J+axiUXIrtnhdfEOeNf5Mv/2Q==',
      name: '博士'
    },
    {
      avatar:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIADIAMgMBIgACEQEDEQH/xAAxAAACAgMBAAAAAAAAAAAAAAAABgQFAQIHAwEBAAMBAAAAAAAAAAAAAAAAAwABAgT/2gAMAwEAAhADEAAAAI7CsPnN1VeZ0okpTbSWASKzwmMPRy3PuuWhpv4KvQ7pcJYTUb+hdLQYWJoaVU+RU3jcXiaoegAhWOAPeeaBd1wGtf/EAC4QAAIBAwIEBAUFAQAAAAAAAAECAwAEEQUhBhASMRMiQWEUI3KBoSAzQlFSkv/aAAgBAQABPwDTxidHHbdTyZGjdkcYYelBGKM4HlUgH7/osXInRfQsK0q18abxGHkj/JrV0KXrEfzUGtLiE0F1G48r4GfcVJDJFI0TbMp52W91D9VXt42mWQCu0QUqHZQC7SyDIRA22QO5NXkFyLeFpnWRggYsMZw/+ioAPsRVlOtrpsshx+6d2OFGw3J/oVK897YR6nbfORCTkp0OVQ7lRk5Aq5gMZSVR8qVepfbPpy0jDSRyEZxIg/6JrjKJytlEEJ63uJD7ttXB6Tn41bhW8Mwxxjqzt3OBWrx+Bw9fQsRvIgBzjYutcP3F8upWVmZZltvjFPQW22BqeAJpHh+kWyeyhsL+KXS9RcB1WLpYZGSc4NcKwxTrcRy+qrj2IJIqe3S5AEsSOAcgMobB+9Lb9KhVAAHYCntRIjI6hkYYZWGQRUGm2ltMssVsiSKCAVGMZqWFZ4fDY4XYn7ULaEgF182N/Me9cIuI3kY9gFodLAEHINFgKDKdqwK1LVotOMSsnWz5JAPYUeJZyTiKMVwv2n+la08npcZOBjke3LVWZtRuizE4kI5f/8QAIBEBAAIBAgcAAAAAAAAAAAAAAQARAwIQEiAhMTJBcf/aAAgBAgEBPwDL5HzkadfX0RDjmTSUJtks1MqWpVypk7uxt//EACARAQABAwMFAAAAAAAAAAAAAAEAAhEhAxATEiIxYXH/2gAIAQMBAT8A0m1L9l+2++Sg9sF45p1N7M6iUJYwM5GYW4ZmZT4Njb//2Q==',
      name: '柚子'
    }
  ]

  // 弹幕数据
  const danmusMock = [
    '人才不火系列',
    '双厨狂喜',
    '双厨曝炸',
    '火钳留名',
    '要素过多',
    '动作也太流畅了吧',
    '世界名画',
    '好活，当赏',
    '全程高能',
    '动作指导:奥尔加',
    '万能日语',
    '耶———————格——————————',
    '光棍节， 。去过',
    'Fz Design',
    '好活',
    '恭喜你发现宝藏',
    '前方高能',
    '该赏',
    '火钳刘明',
    '小车灵魂',
    '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
    '哈哈哈哈哈哈哈哈哈哈',
    '哈哈',
    '万能的日语',
    '首页通知书',
    '我卡了？',
    'hhhhh',
    'lisalisa',
    '这是什么蛇皮操作，看不懂',
    '敌 我 不 分',
    '666',
    '哈哈哈哈啊哈哈哈',
    '完全一致',
    '你又双叒叕发现了新的宝藏',
    '2333',
    '三梗合一',
    '首页通知书',
    '开始吟唱',
    'tab+shift',
    '帧数高的和动画一样',
    '好强',
    '23333333',
    '好活当赏',
    '此曲一出',
    '要素过载',
    '好活！！！！',
    '开始吟唱',
    '我听得懂咋办，在线等，很急',
    '666',
    '人质杀手',
    '做的真的棒。',
    'nice',
    '真实',
    '秀儿',
    '再来亿遍'
  ]

  const getDanmuData = () => {
    return danmusMock.map((text, index) => {
      const _index = index % 3
      return {
        avatar: customDanmus[_index].avatar,
        name: customDanmus[_index].name,
        text
      }
    })
  }

  const danmakuRef = ref<any>(null)
  const danmuText = ref<string[]>(danmusMock)
  const danmuSlot = ref<any[]>(getDanmuData())
  const danmuMsg = ref<string>('')
  const config = reactive({
    channels: 0, // 轨道数量，为0则弹幕轨道数会撑满容器
    hidden: false, // 是否隐藏
    useSlot: true, // 是否开启slot
    loop: true, // 是否开启弹幕循环
    speeds: 200, // 弹幕速度，实际为弹幕滚动完一整屏的秒数，值越小速度越快
    fontSize: 20, // 文本模式下的字号
    top: 10, // 弹幕轨道间的垂直间距
    right: 0, // 同一轨道弹幕的水平间距
    debounce: 100, // 弹幕刷新频率（多少毫秒插入一条弹幕，建议不小于50）
    randomChannel: true // 随机弹幕轨道
  })

  const danmus = computed(() => {
    return config.useSlot ? danmuSlot.value : danmuText.value
  })

  onMounted(() => {
    window.onresize = () => danmakuRef.value.resize()
  })

  onUnmounted(() => {
    window.onresize = null
  })

  function play(type: string) {
    switch (type) {
      case 'play':
        danmakuRef.value.play()
        break
      case 'pause':
        danmakuRef.value.pause()
        break
      case 'stop':
        danmakuRef.value.stop()
        break
      case 'show':
        danmakuRef.value.show()
        break
      case 'hide':
        danmakuRef.value.hide()
        break
      case 'reset':
        danmakuRef.value.reset()
        break
      default:
        break
    }
  }

  function restart() {
    setTimeout(() => {
      danmakuRef.value.stop()
      danmakuRef.value.play()
    })
  }

  function speedsChange(val: number) {
    if (config.speeds <= 10 && val === -10) {
      return
    }
    config.speeds += val
    danmakuRef.value.reset()
  }
  function fontChange(val: number) {
    config.fontSize += val
    danmakuRef.value.reset()
  }
  function channelChange(val: number) {
    if (!config.channels && val === -1) {
      return
    }
    config.channels += val
  }
  function addDanmu() {
    if (!danmuMsg.value) return
    const _danmuMsg = config.useSlot
      ? {
          avatar: 'https://avatars.githubusercontent.com/u/30991751?v=4',
          name: '你',
          text: danmuMsg.value
        }
      : danmuMsg.value
    danmakuRef.value.add(_danmuMsg)
    danmuMsg.value = ''
  }

  const { useSlot, loop, hidden } = toRefs(config)
</script>
<template>
  <fz-danmaku ref="danmakuRef" v-model="danmus" is-suspend v-bind="config">
    <!-- 容器slot -->
    <div class="content-container">我是内容</div>
    <!-- 弹幕slot -->
    <template #dm="{ danmu, index }">
      <div class="danmu-item">
        <img class="img" :src="danmu.avatar" />
        <span>{{ index }}{{ danmu.name }}：</span>
        <span>{{ danmu.text }}</span>
      </div>
    </template>
  </fz-danmaku>
  <div class="action">
    <p>
      播放：
      <fz-button-group>
        <fz-button @click="play('play')">播放</fz-button>
        <fz-button @click="play('pause')">暂停</fz-button>
        <fz-button @click="play('stop')">停止</fz-button>
      </fz-button-group>
    </p>
    <p>
      模式：
      <fz-radio-group v-model="useSlot" @change="restart">
        <fz-radio :label="true">弹幕 Slot</fz-radio>
        <fz-radio :label="false">普通文本</fz-radio>
      </fz-radio-group>
    </p>
    <p>
      循环：
      <fz-radio-group v-model="loop" @change="restart">
        <fz-radio :label="true">是</fz-radio>
        <fz-radio :label="false">否</fz-radio>
      </fz-radio-group>
    </p>

    <p>
      显示：
      <fz-radio-group v-model="hidden">
        <fz-radio :label="false">显示</fz-radio>
        <fz-radio :label="true">隐藏</fz-radio>
      </fz-radio-group>
    </p>
    <p>
      速度：
      <fz-button-group>
        <fz-button @click="speedsChange(-10)">减速</fz-button>
        <fz-button @click="speedsChange(10)">增速</fz-button>
      </fz-button-group>
      <span class="mx-2">当前速度：{{ config.speeds }}像素/s</span>
    </p>
    <p>
      字号：
      <fz-button-group>
        <fz-button :disabled="config.useSlot" @click="fontChange(-1)"> 缩小 </fz-button>
        <fz-button :disabled="config.useSlot" @click="fontChange(1)"> 放大 </fz-button>
      </fz-button-group>
      <span class="mx-2">当前字号：{{ config.fontSize }}px</span>
    </p>
    <p>
      轨道：
      <fz-button-group>
        <fz-button @click="channelChange(-1)">-1</fz-button>
        <fz-button @click="channelChange(1)">+1</fz-button>
        <fz-button @click="channelChange(-config.channels)">填满</fz-button>
      </fz-button-group>
      <span class="mx-2">当前轨道：{{ config.channels }}</span>
    </p>
    <p>
      发送：
      <fz-input v-model="danmuMsg" placeholder="请输入弹幕内容" class="ipt" type="text" />
      <fz-button @click="addDanmu">发送</fz-button>
    </p>
  </div>
</template>
<style scoped lang="scss">
  // 自定义slot的样式内容
  .danmu-item {
    display: flex;
    align-items: center;
    .img {
      height: 25px;
      width: 25px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }

  // 容器内容
  .content-container {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background: linear-gradient(45deg, var(--fz-color-info), var(--fz-color-primary));
  }

  // 操作

  .action {
    margin-top: 20px;

    .mx-2 {
      margin: 0 8px;
    }

    .ipt {
      width: 230px;
      margin-right: 8px;
    }
  }
</style>
