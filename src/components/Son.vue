<template>
  <div class="son">
    <p>后代</p>
    <p>name:{{ this.name }}</p>
    <p>person:{{ person }}</p>
    <p>car.name:{{ car }}</p>
    <button @click="person.name = '流水'">修改姓名</button>
  </div>
</template>

<script>
import { inject, reactive, isReactive, isProxy, isRef, isReadonly } from "vue";
export default {
  name: "SonComp",
  inject: ["name"],
  setup() {
    let car = reactive({
      name: "轩逸",
      price: 12,
    });
    console.log("car是否isReactive=", isReactive(car));
    console.log("car是否 isProxy=", isProxy(car));
    console.log("car是否 isRef=", isRef(car));
    console.log("car是否 isReadonly=", isReadonly(car));
    const person = inject("person");
    return { person, car };
  },
};
</script>

<style scoped>
.son {
  padding: 20px;
  background: lawngreen;
}
</style>
