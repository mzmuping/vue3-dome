<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>{{ JSON.stringify(person) }}</div>
  <div>姓名：{{ person.name }}</div>
  <div>foo.a：{{ foo.a }}</div>
  <div>reactiveFoo.a：{{ reactiveFoo.a }}</div>
  <div>count2：{{ count2.a }}</div>
  <button @click="test">修改姓名</button>
  <button @click="stop">停止</button>
  <br />
  <div>keyword:{{ keyword }}</div>

  <input type="text" v-model="keyword" />
  <Child />
</template>

<script>
import {
  watchEffect,
  ref,
  watch,
  reactive,
  toRaw,
  customRef,
  provide,
} from "vue";
import Child from "./components/Child";
const myRef = (value, delay = 500) => {
  let timer = null;
  return customRef((track, trigger) => {
    return {
      get() {
        console.log("myref获取数据");
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          console.log("myref设置数据");
          trigger();
        }, delay);
      },
    };
  });
};
export default {
  name: "App",
  components: { Child },
  provide: {
    name: "John Doe",
  },
  setup() {
    let keyword = myRef("", 1000);
    let count = ref(0);
    let count2 = { a: 1 };
    let person = reactive({
      name: "张三",
      age: 12,
      job: {
        gz: 179000,
        c: {
          a: 1,
        },
      },
    });
    let foo = {
      a: 12,
    };
    person["sex"] = "男";
    window.person = person;
    provide("person", person);
    const reactiveFoo = reactive(foo);
    const toRaw1 = toRaw(foo);
    toRaw1.a++;
    console.log(reactiveFoo, toRaw1);
    //监听
    watch(
      [person],
      (newValue, oldValue) => {
        console.log("The new person value is: ", newValue, oldValue);
      },
      { deep: false }
    );
    // 用于响应性追踪
    watchEffect(
      () => {
        console.log("The new person value is: ", person);
      },
      { deep: false }
    );

    const test = () => {
      person.name += "李四";
      person.job.c.a = 3;
      count.value = 1;
      toRaw1.a++;
      count2.a++;
      console.log(reactiveFoo, toRaw1);
      keyword.value = "324";
    };
    return {
      person,
      test,
      stop,
      foo,
      reactiveFoo,
      toRaw1,
      count2,
      keyword,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
