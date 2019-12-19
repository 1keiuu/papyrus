<template>
  <div>
    <v-list-item class="targetListItem" @mouseenter="isHover = true" @mouseleave="isHover = false">
      <v-col>
        <v-row>
          <v-layout justify-space-between align-center>
            <p>{{ targetData.name }}</p>
            <div>
              <v-tooltip bottom
                ><template v-slot:activator="{ on }">
                  <v-btn
                    class="targetListItem__editButton"
                    v-show="isHover"
                    fab
                    depressed
                    @click="handleEditButtonClick"
                    color="#ff7e2f"
                    width="32px"
                    height="32px"
                    v-on="on"
                  >
                    <v-icon size="20"> mdi-file-document-edit-outline</v-icon>
                  </v-btn>
                </template>
                <span>編集</span>
              </v-tooltip>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
            </div>
          </v-layout>
        </v-row>
        <v-row>
          <v-expand-transition>
            <div v-show="show">
              <p class="targetListItem__description">{{ targetData.description }}</p>
              <p class="targetListItem__deadline">期日 : {{ targetData.deadline }}</p>
            </div>
          </v-expand-transition>
        </v-row>
      </v-col>
    </v-list-item>
    <EditTargetModal
      ref="editTargetModal"
      @submit="submitEditTargetData"
      :targetData="selectedTargetData"
    ></EditTargetModal>
  </div>
</template>
<script>
import firebase from "firebase";
import EditTargetModal from "./modal/EditTargetModal";

export default {
  name: "TargetList",
  props: ["targetData"],
  components: {
    EditTargetModal
  },
  data() {
    return {
      show: false,
      isHover: false,
      selectedTargetData: []
    };
  },
  methods: {
    handleEditButtonClick() {
      this.selectedTargetData = this.targetData;
      this.$refs.editTargetModal.openDialog();
    },
    submitEditTargetData(inputName, inputDeadline, inputDescrition, targetRank) {
      firebase
        .firestore()
        .collection("targets")
        .doc(this.userId)
        .update({
          [targetRank]: {
            name: inputName,
            deadline: inputDeadline,
            description: inputDescrition,
            targetRank: targetRank
          }
        });
      const data = {
        name: inputName,
        deadline: inputDeadline,
        description: inputDescrition,
        targetRank: targetRank
      };

      this.$store.commit("editTargetData", data);
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  }
};
</script>
<style scoped lang="scss">
.v-application p {
  margin-bottom: 0;
}
.targetListItem {
  border-bottom: 0.3px solid #e8e8e8;
}
.targetListItem__description {
  font-size: 15px;
  padding-left: 20px;
}
.targetListItem__deadline {
  font-size: 14px;
  color: #707070;
  padding-top: 5px;
  padding-left: 20px;
}
.targetListItem__editButton {
  color: white;
  margin-right: 12px;
}
</style>
