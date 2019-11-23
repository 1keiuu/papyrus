<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title>
          <span class="headline">タスクを追加</span>
        </v-card-title>
        <v-card-text>
          <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="inputTaskName" label="タスク名"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="inputTaskDate" label="期日" type='date'></v-text-field>
                  </v-col>
                </v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="categoryOptions"
                      v-model="inputCategory"
                      label="目標もしくはカテゴリ"

                    ></v-select>
                  </v-col>
          </v-container>
          <small>*反映に時間がかかることがございます</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="blue darken-1" text @click="handleSubmitButtonClick">追加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: "AddTaskModal",
  data: () => ({
    dialog: false,
    // tabs: ["プロフィール", "個人情報"],
    inputTaskName: "",
    inputTaskDate:"",
    inputCategory:"",
    categoryOptions: ["目標が入ります", "目標が入りま~す","目標が入ります?"],
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    handleSubmitButtonClick() {
      this.dialog = false;
      this.$emit('submit',this.inputTaskName,this.inputTaskDate,this.inputCategory)
    }
  }
};
</script>
