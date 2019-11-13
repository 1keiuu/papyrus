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
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="ユーザー名"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump'
                  ]"
                  label="興味のある分野"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field label="メールアドレス" ></v-text-field>
              </v-col>
                <v-col cols="12">
                  <v-file-input label="写真を選択" filled prepend-icon="mdi-camera"></v-file-input>
                </v-col>


            </v-row>
          </v-container>
          <small>*反映に時間がかかることがございます</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "ProfileEditModal",
  data: () => ({
    dialog: false
  }),
  methods: {
    openDialog() {
      this.dialog = true;
    }
  }
};
</script>
