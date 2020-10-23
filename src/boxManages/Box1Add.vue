<template>
  <div class="boxDialog">
    <el-dialog width="400px" title :visible.sync="dialogAdd" :close-on-click-modal="false">
      <el-form
        :model="addInfo"
        label-width="200px"
        :rules="rules"
        ref="addInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="箱子规格" prop="boxStandard" label-width="100px">
          <el-select v-model="addInfo.boxStandard" placeholder="请选择" @change="standardChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.boxStandard"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需积分" prop="boxUnitPrice" label-width="110px">
          <el-input v-model="addInfo.boxUnitPrice" maxlength="40" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="110px">
          <el-input v-model="addInfo.remark" maxlength="40" clearable></el-input>
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
  data() {
    var checkUser = (rule, value, callback) => {
      var user = /([\*\"\'<>\/])+/;

      if (!value) {
        callback(new Error("使用人不能为空"));
      }
      setTimeout(() => {
        if (user.text(value)) {
          callback(new Error("未使用人不能有特殊符号"));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      dialogAdd: false,
      addInfo: {
        boxStandard: "",
        boxUnitPrice: "",
        remark: ""
      },
      options: [],
      rules: {
        boxStandard: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的箱子规格",
            trigger: "blur"
          }
        ],
        boxUnitPrice: [
          {
            required: true,
            message: "请输入正确的箱子所需积分",
            trigger: "blur"
          }
        ],

        remark: [
          {
            required: true,
            // pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入备注",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.standardDown();
  },
  methods: {
    //箱子规格下拉列表
    standardDown() {
      this.$axios.get("prod-api/backend/box/standard/select").then(res => {
        if (200 == res.data.code) {
          this.options = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    openDialog(flag, val) {
      this.dialogAdd = flag;
      this.$nextTick(() => {
        this.$refs.addInfo.resetFields();
        // console.log(val.role);
        // this.addInfo.role = val.role;
      });
    },
    cancelDialog() {
      this.dialogAdd = false;
    },
    addSure() {
      this.dialogAdd = false;
    },
    //选择箱子change事件
    standardChange(value) {
      this.addInfo.boxStandard = value.boxStandard;
      this.addInfo.boxUnitPrice = value.boxUnitPrice;
    },
    //新增
    addSure() {
      this.$refs["addInfo"].validate(valid => {
        if (valid) {
          let pamars = {
            //字段(入参 跟需求文档一样):v-model里要输入的内容
            boxStandard: this.addInfo.boxStandard,
            boxUnitPrice: this.addInfo.boxUnitPrice,
            remark: this.addInfo.remark,
            version: this.version
          };
          this.$axios
            .post("prod-api/backend/box/info/create", pamars)
            .then(res => {
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