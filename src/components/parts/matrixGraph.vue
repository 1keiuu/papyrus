<template>
  <div class="graph__container">
    <div class="graph__guide-bar-horizontal-spacer"></div>
    <div class="graph__guide-bar-rows graph__guide-bar-rows--left"><p>緊急</p></div>
    <div class="graph__guide-bar-rows"><p>緊急でない</p></div>
    <div class="graph__guide-bar-columns graph__guide-bar-columns--above">
      <p>重要</p>
    </div>
    <div class="graph-area graph-area--first">
      <div
        class="graph-area__number-wrapper graph-area__number-wrapper--first"
        @mouseenter="isFirstAreaHover = true"
        @mouseleave="isFirstAreaHover = false"
        @click="handleGraphAreaClick('first')"
      >
        <p class="graph-area__number graph-area__number--first">Ⅰ</p>
      </div>
      <div
        class="graph-area--active graph-area--active--first"
        :class="{ '--hover': isFirstAreaHover }"
      >
        <p class="graph-area__active-title">『必須』</p>
        <p>期限のあるタスク<br />やらないと大きな損失を被る<br />コントロールが重要</p>
      </div>
    </div>
    <div class="graph-area graph-area--second">
      <div
        class="graph-area__number-wrapper graph-area__number-wrapper--second"
        @mouseenter="isSecondAreaHover = true"
        @mouseleave="isSecondAreaHover = false"
        @click="handleGraphAreaClick('second')"
      >
        <p class="graph-area__number graph-area__number--second">Ⅱ</p>
      </div>
      <div
        class="graph-area--active graph-area--active--second"
        :class="{ '--hover': isSecondAreaHover }"
      >
        <p class="graph-area__active-title">『価値』</p>
        <p>緊急性は無いが重要<br />すぐには成果が出ない<br />将来への投資</p>
      </div>
    </div>

    <div class="graph__guide-bar-columns">
      <p>重要でない</p>
    </div>

    <div class="graph-area graph-area--third">
      <div
        class="graph-area__number-wrapper graph-area__number-wrapper--third"
        @mouseenter="isThirdAreaHover = true"
        @mouseleave="isThirdAreaHover = false"
        @click="handleGraphAreaClick('third')"
      >
        <p class="graph-area__number graph-area__number--third">Ⅲ</p>
      </div>
      <div
        class="graph-area--active graph-area--active--third"
        :class="{ '--hover': isThirdAreaHover }"
      >
        <p class="graph-area__active-title">『錯覚』</p>
        <p>期限のあるタスク<br />やらないと大きな損失を被る<br />コントロールが重要</p>
      </div>
    </div>
    <div class="graph-area graph-area--forth">
      <div
        class="graph-area__number-wrapper graph-area__number-wrapper--forth"
        @mouseenter="isForthAreaHover = true"
        @mouseleave="isForthAreaHover = false"
        @click="handleGraphAreaClick('forth')"
      >
        <p class="graph-area__number graph-area__number--forth">Ⅳ</p>
      </div>
      <div
        class="graph-area--active graph-area--active--forth"
        :class="{ '--hover': isForthAreaHover }"
      >
        <p class="graph-area__active-title">『無駄』</p>
        <p>期限のあるタスク<br />やらないと大きな損失を被る<br />コントロールが重要</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MatrixGraph",
  components: {},
  data() {
    return {
      tasksData: ["task1", "task2", "task3"],
      isFirstAreaHover: false,
      isSecondAreaHover: false,
      isThirdAreaHover: false,
      isForthAreaHover: false
    };
  },
  methods: {
    handleGraphAreaClick(areaName) {
      switch (areaName) {
        case "first":
          this.$emit("graphAreaClicked", 0);
          break;
        case "second":
          this.$emit("graphAreaClicked", 1);
          break;
        case "third":
          this.$emit("graphAreaClicked", 2);
          break;
        case "forth":
          this.$emit("graphAreaClicked", 3);
          break;
        default:
      }
    }
  }
};
</script>
<style scoped lang="scss">
.graph__container {
  height: 330px;
  width: 655px;
  display: grid;
  grid-template-rows: 35px 146px 146px;
  grid-template-columns: 35px 311px 311px;
}

.graph-area {
  position: relative;
  &--first {
    background-color: #def4f7;
    margin-bottom: 6px;
    margin-right: 6px;
  }
  &--second {
    background-color: #f0dfe7;
    margin-bottom: 6px;
  }
  &--third {
    background-color: #ddf4d7;
    margin-right: 6px;
  }
  &--forth {
    background-color: #f7f4cf;
  }
  &--active {
    height: 140px;
    background: #56a5bf;
    color: #fff;
    text-align: center;
    padding-top: 10px;
    font-size: 14px;
    transform: scale(0);
    transform-origin: 100% 100%;
    transition: transform ease-in-out 0.2s;
    &.--hover {
      transform: scale(1);
      transition: transform ease-in-out 0.3s;
      p {
        opacity: 1;
        transition: opacity ease-in 0.5s;
      }
    }
    p {
      opacity: 0;
    }
    .graph-area__active-title {
      margin-bottom: 5px;
      font-size: 35px;
      font-weight: 500;
    }
    &--second {
      transform-origin: 0% 100%;
    }
    &--third {
      transform-origin: 100% 0%;
      height: 146px;
    }
    &--forth {
      transform-origin: 0% 0%;
      height: 146px;
    }
  }
  .graph-area__number-wrapper {
    width: 75px;
    height: 74px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 2;
    &--first {
      background: #6ea6de;
      border-top-left-radius: 100%;
      right: 0;
      bottom: 0;
    }
    &--second {
      background: #eb8bb8;
      border-top-right-radius: 100%;
      left: 0;
      bottom: 0;
    }
    &--third {
      background: #8bdd7b;
      border-bottom-left-radius: 100%;
      right: 0;
      top: 0;
    }
    &--forth {
      background: #f79a61;
      border-bottom-right-radius: 100%;
      left: 0;
      top: 0;
    }
    .graph-area__number {
      font-size: 40px;
      font-family: "Myanmar MN";
      color: white;
      margin-bottom: 0;
      &--first {
        margin-top: 15px;
        margin-left: 15px;
      }
      &--second {
        margin-right: 10px;
        margin-top: 15px;
      }
      &--third {
        margin-left: 15px;
        margin-bottom: 5px;
      }
      &--forth {
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
  }
}

.graph__guide-bar-rows {
  background-color: #7dc0d6;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 13px;
  margin-bottom: 15px;
  &--left {
    margin-right: 6px;
  }
}
.graph__guide-bar-columns {
  background-color: #7dc0d6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 13px;
  line-height: 16px;
  margin-right: 15px;
  p {
    width: 13px;
  }
  &--above {
    margin-bottom: 6px;
  }
}
</style>
