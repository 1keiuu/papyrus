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
        :event-color="getEventColor"
        v-model="focus"
        color="#FF7E2F"
        :events="events"
        @click:event="showEvent"
        @click:more="showEventList"
      >
      </v-calendar>
      <v-menu
        v-model="selectedEventOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        offset-x
        max-height="600px"
      >
        <v-card color="grey lighten-4" min-width="350px" class="event__card">
          <v-toolbar :color="selectedEvent.color" dark>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="selectedEvent.memo">{{selectedEvent.memo}}
          </v-card-text>
          <v-card-text v-else>メモはありません</v-card-text>
        </v-card>
      </v-menu>
            <v-menu
        v-model="selectedEventListOpen"
        :close-on-content-click="false"
        offset-x
        max-height="600px"
      >
        <v-card color="grey lighten-4" min-width="350px" class="event__card">
          <v-toolbar dark>
            <v-toolbar-title>{{selectedEventList.name}}件のタスク</v-toolbar-title>
          </v-toolbar>
                    <v-list>
            <v-list-item v-for="(event, index) in selectedEventList" :key="index">
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
      selectedEventList: {},
      selectedElement: null,
      selectedEventOpen: false,
      selectedEventListOpen: false,
      events: []
    };
  },
  computed: {
    targetsData() {
      return this.$store.getters.targetsData
    }
  },
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
          this.selectedEventOpen = true;
        }, 10);
      };

      if (this.selectedEventOpen) {
        this.selectedEventOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    showEventList(events) {
      const open = () => {
        const eventList = this.events.filter(function(event) { return event.start === events.date })
        this.selectedEventList = eventList;
        this.selectedEventList.name = eventList.length
        setTimeout(() => {
          this.selectedEventListOpen = true;
        }, 10);
      };

      if (this.selectedEventListOpen) {
        this.selectedEventListOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
    },
    setEvents() {
      function toString(date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
      }
      this.today = toString(new Date());
      const thisYear = this.today.substring(0, 4);
      const thisMonth = this.today.substring(5, 7);
      this.calenderTitle = `${thisYear} 年 ${thisMonth}月`;
      // const tasksData = this.tasksData[0].concat(
      //   this.tasksData[1],
      //   this.tasksData[2],
      //   this.tasksData[3]
      // );
      this.tasksData.forEach((tasks, tasksIndex) => {
        if (tasks.length !== 0) {
          tasks.forEach((task, taskIndex) => {
            if (task.status === "doing" && task.targetRank !== "keep") {
              this.events.push({
                name: task.name,
                start: task.deadline,
                end: task.deadline,
                memo:task.memo,
                color: this.targetsData[task.targetRank].color,
              });
              // this.events.push(task);
              // this.events.length += 1;
              // this.events[taskIndex].name = task.name;
            } else if (task.targetRank === 'keep') {
              this.events.push({
                name: task.name,
                start: task.deadline,
                end: task.deadline,
                memo:task.memo,
                color: this.targetsData[3].color,
              });
            }
          });
        }
      });
    },
    addEvents() {
      this.events.length = 0;
      this.setEvents()
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
    },
    tasksData() {
      this.addEvents();
    }
  },
  created() {
    this.setEvents();
  }
};
</script>
<style scoped lang="scss">
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
// ::v-deep .v-event {
//   height: 40px !important;
//   width: 100% !important;
//   top: 13px !important;
//   border-radius: 0px !important;
// }
</style>
