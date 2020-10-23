<template>
  <div class="userDialog">
    <el-dialog width="400px" title :visible.sync="dialogAdd" :close-on-click-modal="false">
      <el-form
        :model="addInfo"
        label-width="100px"
        :rules="rules"
        ref="addInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="用户名" prop="userName" label-width="110px">
          <el-input v-model="addInfo.userName" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="nickName" label-width="110px">
          <el-input v-model="addInfo.nickName" maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber" label-width="110px">
          <el-input v-model="addInfo.phonenumber" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" label-width="110px">
          <el-input v-model="addInfo.email" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="addInfo.sex" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取消</el-button>
        <el-button type="primary" @click="addSure('addInfo')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "addData",
  data() {
    return {
      dialogAdd: false,
      addInfo: {
        nickName: "",
        sex: "",
        userName: "",
        email: "",
        phonenumber: ""
      },
      rules: {
        userName: [
          {
            required: true,
            pattern: /^([\w\@.]{1,14})$/g,
            message: "请输入正确的用户名",
            trigger: "blur"
          }
        ],
        nickName: [
          {
            required: true,
            pattern: /^([\u4e00-\u9fa5]){2,7}$/,
            message: "请输入正确的姓名",
            trigger: "blur"
          }
        ],
        phonenumber: [
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],

        email: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            pattern: /^(0|1|2)$/,
            message: "请输入性别",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    openDialog(flag) {
      this.dialogAdd = flag;
      this.$nextTick(() => {
        this.$refs.addInfo.resetFields();
      });
    },
    cancelDialog() {
      this.dialogAdd = false;
    },
    addSure() {
      this.dialogAdd = false;
    },
    //新增
    addSure() {
      this.$refs["addInfo"].validate(valid => {
        if (valid) {
          let pamars = {
            //字段(入参 跟需求文档一样):v-model里要输入的内容
            userName: this.addInfo.userName,
            nickName: this.addInfo.nickName,
            phonenumber: this.addInfo.phonenumber,
            email: this.addInfo.email,
            sex: this.addInfo.sex
          };
          this.$axios.post("prod-api/backend/user/create", pamars).then(res => {
            if (200 == res.data.code) {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success"
              });
              this.$emit("search");
              this.cancelDialog();
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
          });
        }
      });
    }
  }
};
</script>



<style scoped>
</style>