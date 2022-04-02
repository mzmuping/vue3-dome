<template>
  <div class="child">
    子组件
    <suspense>
      <template #default>
        <Son />
      </template>
      <template #fallback> loading.... </template>
    </suspense>
  </div>
</template>

<script>
// import Son from "./Son";
import { defineAsyncComponent } from "vue";
const Son = defineAsyncComponent(() => import("./Son"));
export default {
  name: "ChildComp",
  props: {
    msg: String,
  },
  components: { Son },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child {
  padding: 30px;
  background: olive;
}
</style>
