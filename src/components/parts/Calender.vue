<template>
  <v-card class="calender__container">
    <!-- <v-calendar
    ref="calendar"
    v-model="focus"
    color="primary"
    :events="events"
    :event-color="getEventColor"
    :event-margin-bottom="3"
    :now="today"
    :type="type"
    @click:event="showEvent"
    @click:more="viewDay"
    @click:date="viewDay"
    @change="updateRange"
  ></v-calendar>
  <v-menu
    v-model="selectedOpen"
    :close-on-content-click="false"
    :activator="selectedElement"
    full-width
    offset-x
  >
    <v-card color="grey lighten-4" min-width="350px" flat>
      <v-toolbar :color="selectedEvent.color" dark>
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <span v-html="selectedEvent.details"></span>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="secondary" @click="selectedOpen = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu> -->
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
      <v-calendar ref="calendar" :now="today" color="#FF7E2F"> </v-calendar>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  name: "Calender",
  data() {
    return {
      calenderTitle: "2019年 12月",
      today: ""
    };
  },
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  created() {
    function toString(date) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
    }
    this.today = toString(new Date());
  }
};
</script>
<style scoped lang="scss">
$primary: #56a5bf;
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
</style>
