<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }"> </template>
      <v-card>
        <v-card-title>
          <span class="headline">プロフィールを編集</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-tabs>
              <v-tab v-for="(tab, index) in tabs" :key="`tab-${index}`" :href="`#tab-${index}`">
                {{ tab }}
              </v-tab>

              <v-tab-item key="tab-0" :value="'tab-' + 0">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="inputName" label="ユーザー名"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="interestsOptions"
                      v-model="inputItems"
                      label="興味のある分野"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      label="写真を選択"
                      filled
                      ref="imageFile"
                      @change="selectFile"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item key="tab-1" :value="'tab-' + 1">
                <v-col cols="12">
                  <v-card-text>パスワードの再設定</v-card-text>
                  <v-text-field label="メールアドレス"></v-text-field>
                </v-col>
              </v-tab-item>
            </v-tabs>
          </v-container>
          <small>*反映に時間がかかることがございます</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="blue darken-1" text @click="handleSubmitButtonClick">保存</v-btn>
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
    tabs: ["プロフィール", "個人情報"],
    inputName: "",
    inputItems:[],
    interestsOptions: ["語学学習", "プログラミング"],
    inputImage: ""
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    },
    selectFile(event) {
      this.inputImage = event
    },
    handleSubmitButtonClick() {
      this.dialog = false;
      this.$emit('submit',this.inputName,this.inputItems,this.inputImage)
    }
  }
};
</script>
