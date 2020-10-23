<template>
  <div class="customerDialog">
    <el-dialog width="400px" title="客户修改" :visible.sync="dialogEdit" :close-on-click-modal="true">
      <el-form
        :model="editInfo"
        label-width="100px"
        :rules="rules"
        ref="editInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="用户id" prop="userId" label-width="110px">
          <el-input v-model="editInfo.userId" readonly maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nickName" label-width="110px">
          <el-input v-model="editInfo.nickName" maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber" label-width="110px">
          <el-input v-model="editInfo.phonenumber" maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="110px">
          <el-input v-model="editInfo.email" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" label-width="110px">
          <el-input v-model="editInfo.sex" maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version" label-width="110px">
          <el-input v-model="editInfo.version" maxlength="40" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取消</el-button>
        <el-button type="primary" @click="addSure('editInfo')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "editData",
  data() {
    return {
      dialogEdit: false,
      editInfo: {
        userId: "",
        nickName: "",
        email: "",
        phonenumber: "",
        version: "",
        sex: ""
      },

      rules: {
        userName: [
          {
            required: true,
            pattern: /^[\u4E00-\u9FA5A-Za-z]+$/,
            trigger: "blur",
            message: "请输入1-20位中文或英文"
          }
        ],
        idCard: [
          {
            required: true,
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            trigger: "blur",
            message: "证件号码格式有误"
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            trigger: "blur",
            message: "请输入正确的手机号"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    openDialog(flag, val) {
      this.dialogEdit = flag;
      this.$nextTick(() => {
        this.$refs.editInfo.resetFields();
        this.editInfo = val;
      });
    },
    cancelDialog() {
      this.dialogEdit = false;
    },
    addSure() {
      this.$refs["editInfo"].validate(valid => {
        if (valid) {
          let paramForm = {
            userId: this.editInfo.userId,
            nickName: this.editInfo.nickName,
            version: this.editInfo.version,
            email: this.editInfo.email,
            phonenumber: this.editInfo.phonenumber,
            sex: this.editInfo.sex
          };
          this.$axios
            .put("prod-api/backend/customer/update", paramForm)
            .then(res => {
              if (200 == res.data.code) {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success"
                });

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