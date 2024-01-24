<template>
  <el-form :inline="true" :model="formInline" size="small">
    <el-form-item label="用户信息">
      <el-input
        class="input"
        v-model="formInline.username"
        placeholder="用户名"
      ></el-input>
      <el-input
        class="input"
        v-model="formInline.password"
        placeholder="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <!-- <el-button type="primary" @click="onSubmitGet">get 查询所有</el-button> -->
      <el-button type="primary" @click="onLogin">post 登录</el-button>
      <el-button type="primary" @click="onRegister">post 注册</el-button>
      <el-button type="primary" @click="onLogout">登出</el-button>
    </el-form-item>
    <el-input
      type="textarea"
      :rows="6"
      placeholder="此处返回结果"
      v-model="results"
      class="textarea"
    >
    </el-input>
  </el-form>
    <form @submit.prevent="onCreateContainer" class="form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="containerData.name" required>
      </div>
      
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="text" v-model="containerData.image" required>
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="containerData.password" required>
      </div>
      
      <div class="form-group">
        <label for="cmd">Commands:</label>
        <input type="text" v-model="containerData.cmd">
      </div>
      
      <div class="form-group">
        <label for="path">Path:</label>
        <input type="text" v-model="containerData.path" required>
      </div>
      
      <div class="form-group">
        <label for="num_gpu">Number of vGPU:</label>
        <input type="number" v-model="containerData.num_gpu" required>
      </div>
      
      <div class="form-group">
        <label for="gpumem">Memory per vGPU (M):</label>
        <input type="number" v-model="containerData.gpumem" required>
      </div>
      
      <div class="form-group">
        <label for="gpucores">Capacity of each vGPU (%):</label>
        <input type="number" v-model="containerData.gpucores" required>
      </div>
      
      <div class="form-group">
        <label for="cpu">Number of CPU cores:</label>
        <input type="number" v-model="containerData.cpu" required>
      </div>
      
      <div class="form-group">
        <label for="port">Port:</label>
        <input type="number" v-model="containerData.port" required>
      </div>
      
      <div class="form-group">
        <label for="duration">Duration of container(s):</label>
        <input type="number" v-model="containerData.duration" required>
      </div>
      
      <div class="form-group">
        <label for="memory">Memory size:</label>
        <input type="text" v-model="containerData.memory" required>
      </div>
      
      <div class="form-group">
        <label for="capability">Additional capability:</label>
        <input type="text" v-model="containerData.capability">
      </div>
      
      <div class="form-group">
        <label for="is_VM">Deploy VM(or Task):</label>
        <input type="checkbox" v-model="containerData.is_VM">
      </div>
      
      <div class="form-group">
        <label for="use_master">Deploy the VM in master node:</label>
        <input type="checkbox" v-model="containerData.use_master">
      </div>
      
      <button type="submit">Submit</button>
    </form>
</template>
<script>
import axios from "axios";
// import Axios from 'axios'
// import {getBooks, postBook} from '../api/api.js'
let globalToken = ''
export default {
  data() {
    return {
      formInline: {
        username: "",
        password: "",
      },
      containerData: {
        name: 'myubuntu',
        image: 'ubuntu-ssh:v1',
        password: '123456',
        cmd: '',
        path: '/workspace',
        num_gpu: 1,
        gpumem: 3000,
        gpucores: 30,
        cpu: 1,
        port: 32324,
        duration: 3600,
        memory: '1Gi',
        capability: null,
        is_VM: true,
        use_master: false,
      },
      results: "",
    };
  },
  methods: {
    onLogin() {
      console.log("onLogin!");
      console.log("data",this.formInline)
      axios.post("http://10.249.43.60:32325/user/login/", this.formInline)
      .then((res) => {
         console.log(res.data); //在console中看到数据
         globalToken = res.data.token
        })
        .catch((res) => {
          alert("wrong",res.data);
        });
    },
    
    onRegister() {
      console.log("onRegister!");
      console.log("data",this.formInline)
      axios.post("http://10.249.43.60:32325/user/register/", this.formInline)
      .then((res) => {
         console.log(res.data); //在console中看到数据
        })
        .catch((res) => {
          alert("wrong",res.data);
        });
    },

    onLogout() {
      console.log("onLogout!");
      axios.get('http://10.249.43.60:32325/user/logout/', {
        headers: {
          Authorization: `Token ${globalToken}`,
        },
      })
      .then((res) => {
         console.log(res.data); //在console中看到数据
        })
        .catch((res) => {
          alert("wrong",res.data);
        });
    },

    onCreateContainer() {
      console.log("onCreateContainer!");
      console.log("data",this.containerData)
      axios.post("http://10.249.43.60:32325/container/create/", this.containerData, {
        headers: {
          Authorization: `Token ${globalToken}`,
        },
      })
      .then((res) => {
         console.log(res.data); //在console中看到数据
        })
        .catch((res) => {
          alert("wrong",res.data);
        });
    },

  },
};
</script>

<style scoped>
.input {
  width: 200px;
}
button {
  width: 100px;
}
.textarea {
  width: 900px;
}

.form {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>