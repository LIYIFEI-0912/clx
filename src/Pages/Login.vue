<template>
  <div class="login-page">
    <div class="head">
      <div>
        <h2 class="logo-img">LOGO</h2>
        <span class="rectangle"></span>
      </div>
    </div>

    <div class="login-wrap">
      <div class="title">
        <p>楚留香后台管理系统</p>
        <h4>STOREAGE BOX BACKGROUND MANGMENT</h4>
      </div>

      <div class="ms-login">
        <h2>欢迎登录</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              class="login-put"
              placeholder="用户名/手机号/身份证号"
              size="large"
            >
              <template slot="prepend">
                <img src="../assets/yonghu-2.png" alt />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :type="passwordType"
              class="login-put"
              placeholder="请输入密码"
              size="large"
            >
              <template slot="prepend">
                <img src="../assets/mima-2.png" alt />
              </template>
            </el-input>
          </el-form-item>

          <div>
            <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
          <div class="lianjie">
            <a href>忘记密码</a>
            <a href>寻求帮助？</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    var validateUser = (rule, value, callback) => {
      const idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      const phone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      const username = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      if (!value) {
        return callback(new Error("请输入用户名/手机号/身份证号"));
      }
      setTimeout(() => {
        if (
          !idCard.test(value) &&
          !phone.test(value) &&
          !username.test(value)
        ) {
          return callback(
            new Error("您输入的用户名/手机号/身份证号有误,请重新输入")
          );
        } else {
          callback();
        }
      }, 100);
    };

    return {
      passwordType: "password",
      ruleForm: {
        username: "admin",
        password: "admin123",
        imageCode: "",
        deviceId: "",
        addType: "pc"
      },
      userType: "01",
      imgUrl: "",
      deviceId: "",

      rules: {
        username: [
          {
            required: true,
            validator: validateUser,
            //message: "用户名或密码错误",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            pattern: /^[0-9A-Za-z]{4,16}$/,
            message: "用户名或密码错误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let paramForm = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            userType: this.userType
          };
          this.$axios.post("prod-api/common/login", paramForm).then(res => {
            if (200 == res.data.code) {
              this.loginpPerson();
              localStorage.setItem("token", res.data.token);
              this.$router.push("orderManages");
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success"
              });
            } else {
              (this.ruleForm.username = ""),
                (this.ruleForm.password = ""),
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error"
                });
            }
          });
        }
      });
    },
    loginpPerson() {
      let paramForms = {};
      this.$axios.get("prod-api/common/getLoginInfo", paramForms).then(res => {
        if (200 == res.data.code) {
          localStorage.setItem("userName", res.data.user.userName);

          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.ruleForm = "";
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    loginpPerson() {
      let paramForms = {};
      this.$axios.get("prod-api/common/getLoginInfo", paramForms).then(res => {
        if (200 == res.data.code) {
          localStorage.setItem("userName", res.data.user.userName);

          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.ruleForm = "";
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
html {
  margin: 0;
  padding: 0;
}
.lianjie {
  a {
    text-decoration: none;
  }
  margin-left: 100px;
  margin-top: 10px;
}
.login-page {
  position: relative;
  width: 100%;
  height: 750px;
  background: url(../assets/bg2.png) bottom left;
  .head {
    position: relative;
    height: 80px;
    line-height: 80px;
    padding-left: 80px;
    color: #666;
    font-weight: bolder;
    .logo-img {
      position: absolute;
      top: 10px;
      left: 0;
      font-size: 30px;
      color: white;
      width: 118px;
      height: 30px;
      display: inline-block;
      background-size: 100%;
    }
  }
  .login-wrap {
    position: relative;
    width: 100%;
    height: 80%;
    background-size: 100%;
    background-position: center center;
    .title {
      position: absolute;
      left: 20%;
      top: 10%;
      width: 450px;
      height: 310px;
      background: rgba(192, 191, 191, 0.2);
      color: rgba(255, 255, 255, 0.9);
      padding-left: 20px;
      text-align: left;
      border-radius: 10px 0 0 10px;
      p {
        font-size: 20px;
        letter-spacing: 2px;
        margin-top: 30px;
        color: white;
        text-align: left;
      }
    }

    .ms-login {
      position: relative;
      right: -50%;
      top: 10%;
      width: 350px;
      height: 310px;

      border-radius: 5px;
      background: #fff;
      overflow: hidden;
    }
    .login-btn {
      margin-top: 20px;
      margin-left: 78px;
      width: 200px;
      height: 40px;
    }
    el-from {
      position: absolute;
      top: 100px;
      left: 0;
    }
    h2 {
      margin-top: 31px;
      margin-left: 120px;
    }
  }
}
</style>
