<template>
  <div class="header">
    <div class="systemTitle">储留箱后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="user-avator">
          <img src="../assets/18.jpg" />
        </div>
        <!-- 用户下拉菜单 -->

        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePwd" @click="dialogPwdEdit=true">修改密码</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 弹出修改框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogPwdEdit"
      width="400px"
      :close-on-click-modal="false"
      @close="cancelDialog('editPwd')"
    >
      <el-form
        :model="editPwd"
        :rules="rules"
        ref="editPwd"
        label-width="100px"
        label-position="right"
        class="changePassword"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="editPwd.oldPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="editPwd.newPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog('editPwd')">取消</el-button>
        <el-button type="primary" @click="editPwdSure('editPwd')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>




<script>
export default {
  data() {
    // 密码
    var validatePassWord = (rule, value, callback) => {
      var oldPass = /^[a-zA-Z0-9]{3,15}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!oldPass.test(value)) {
          callback(new Error("请输入正确的密码"));
        }
        callback();
      }
    };
    return {
      collapse: true,

      message: 2,
      editPwd: {
        oldPass: "",
        newPass: ""
      },
      dialogPwdEdit: false,
      token: "",
      userName: "",

      //修改密码
      rules: {
        oldPass: [
          {
            required: true,
            validator: validatePassWord,
            trigger: "blur"
          }
        ],
        newPass: [
          {
            required: true,
            validator: validatePassWord,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //退出登录
    logout() {
      this.$axios({
        method: "post",
        url: "prod-api/common/logout",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }).then(res => {
        if (200 == res.data.code) {
          this.$router.push({
            path: "/Login"
          });
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          // localStorage.setItem("userName", "");
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    //   用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "changePwd") {
        this.dialogPwdEdit = true;
      }
      if (command == "loginout") {
        let PersonParms = {};
        this.$axios.post("prod-api/common/logout", PersonParms).then(res => {
          if (200 == res.data.code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
            this.$router.push("/login");
          }
        });
      }
    },
    cancelDialog(editPwd) {
      this.dialogPwdEdit = false;
      this.$refs[editPwd].resetFields();
    },

    // 修改密码
    editPwdSure(editPwd) {
      this.$refs["editPwd"].validate(valid => {
        if (valid) {
          this.$axios
            .put(
              "prod-api/backend/home/updatePassword/" +
                this.editPwd.oldPass +
                "/" +
                this.editPwd.newPass
            )
            .then(res => {
              if (200 == res.data.code) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "error"
                });
              }
            });
          this.dialogPwdEdit = false;
          this.$refs[editPwd].resetFields();
        }
      });
    }
  },
  toggleSiderBar() {},
  mounted() {
    this.userName = localStorage.getItem("userName");
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 22px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  .changePassword {
    .el-form-item {
      position: relative;
    }
    .el-input {
      width: 90%;
    }
    .show-pwd {
      position: absolute;
      right: 13%;
      top: 2px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
  }
  .handle-box {
    margin-top: 10px;
  }
  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .systemTitle {
    float: left;
    line-height: 60px;
    margin-left: 10px;
    color: #0062ba;
    font-weight: bold;
  }
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    line-height: 60px;
    font-size: 18px;
    color: #aaa;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 60px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  right: 250px;
  width: 40ox;
  height: 40px;

  border-radius: 50%;
}
.user-avator span {
  color: #000;

  text-align: center;
}

.el-dropdown-link {
  color: #aaa;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>