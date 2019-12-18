<template>
  <v-card class="calender__container">
    <div class="calender__wrapper">
      <div class="calender__header">
        <button class="calender__header-button">
          <v-icon color="#56a5bf" @click="prev">
            mdi-chevron-left
          </v-icon>
        </button>
        <p class="calender__header-title">{{ calenderTitle }}</p>
        <button class="calender__header-button" @click="next">
          <v-icon color="#56a5bf">
            mdi-chevron-right
          </v-icon>
        </button>
      </div>
      <v-calendar
        ref="calendar"
        type="month"
        :now="today"
        :start="today"
        v-model="focus"
        color="#FF7E2F"
        :events="events"
        @click:event="showEvent"
      >
      </v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
      >
        <v-card color="grey lighten-4" min-width="350px" class="event__card">
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-item v-for="(event, index) in selectedEvent.children" :key="index">
              <v-list-item-title> {{ event.name }} </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "Calender",
  data() {
    return {
      today: "",
      focus: this.today,
      thisMonth: "",
      thisYear: "",
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: []
    };
  },
  computed: {},
  props: ["tasksData"],
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    setToday() {
      this.focus = this.today;
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    }
  },
  // mounted() {
  //   this.$refs.calendar.checkChange();
  // },
  watch: {
    focus(focusedDate) {
      const thisYear = focusedDate.substring(0, 4);
      const thisMonth = focusedDate.substring(5, 7);
      this.calenderTitle = `${thisYear} 年 ${thisMonth}月`;
    }
  },
  created() {
    function toString(date) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
    }
    this.today = toString(new Date());
    const thisYear = this.today.substring(0, 4);
    const thisMonth = this.today.substring(5, 7);
    this.calenderTitle = `${thisYear} 年 ${thisMonth}月`;
    const tasksData = this.tasksData[0].concat(
      this.tasksData[1],
      this.tasksData[2],
      this.tasksData[3]
    );
    tasksData.forEach((task, taskIndex) => {
      // 1つ目のtask  => eventの新規作成 (eventsの配列の一つ目に格納)
      if (taskIndex === 0) {
        this.events.push({
          name: "",
          start: task.deadline,
          children: [],
          length: 0
        });
        this.events[0].children.push(task);
        this.events[0].length += 1;
        this.events[0].name = `${this.events[0].length}件のタスク`;
      } else {
        // 二つ目以降のtask
        // dateBoolは現時点で生成されているeventsの中にtaskと期日が被るtaskがあるかどうか
        const dateBool = this.events.every(function(event) {
          return event.start !== task.deadline;
        });
        if (dateBool) {
          // 被るものがない => eventの新規作成
          this.events.push({
            name: "",
            start: task.deadline,
            children: [],
            length: 0
          });
          this.events[this.events.length - 1].children.push(task);
          this.events[this.events.length - 1].length += 1;
          this.events[this.events.length - 1].name = `${
            this.events[this.events.length - 1].length
          }件のタスク`;
        } else if (!dateBool) {
          // 被るものがある => 既存のeventへ追加
          this.events.forEach((event, eventIndex) => {
          // forEachでeventのIndexを取得
            if (event.start === task.deadline) {
              this.events[eventIndex].children.push(task);
              this.events[eventIndex].length += 1;
              this.events[eventIndex].name = `${this.events[eventIndex].length}件のタスク`;
            }
          });
        }
      }
    });
    console.log(this.events);
  }
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
$secondary: #7dc0d6;
$accent: #ff7e2f;

::v-deep .v-btn--fab {
  color: white;
}
::v-deep .transparent {
  color: #434343;
}
.calender__container {
  width: 100%;
  .calender__wrapper {
    height: 511px;
  }
}
.calender__header {
  height: 67px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $primary;
  padding: 0px 30px;
  .calender__header-title {
    color: #fff;
    margin-bottom: 0px;
    font-size: 20px;
  }
  .calender__header-button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fff;
  }
}
::v-deep .v-event{
  height:40px !important;
  width:100% !important;
  top:13px !important;
  border-radius:0px !important;
}
</style>
