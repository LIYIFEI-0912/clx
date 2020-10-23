<template>
  <div class="boxDialog">
    <el-dialog width="400px" title :visible.sync="dialogAdd" :close-on-click-modal="false">
      <el-form
        :model="addInfo"
        label-width="100px"
        :rules="rules"
        ref="addInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="箱子规格" prop="boxStandard" label-width="110px">
          <el-input v-model="addInfo.boxStandard" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="箱子积分单价" prop="boxUnitPrice" label-width="110px">
          <el-input v-model="addInfo.boxUnitPrice" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="库存数量" prop="inventoryNumber" label-width="110px">
          <el-input v-model="addInfo.inventoryNumber" maxlength="40" clearable></el-input>
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
  name: "addData",
  data() {
    return {
      dialogAdd: false,
      addInfo: {
        boxStandard: "",
        boxUnitPrice: "",
        inventoryNumber: "",
        remark: ""
      },

      rules: {
        boxStandard: [
          {
            required: true,
            // pattern: /[`~!@#$%^&()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&（）——\-+={}|《》？：“”【】、；‘'，。、]/im,
            message: "请输入正确的箱子规格",
            trigger: "blur"
          }
        ],
        boxUnitPrice: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的箱子积分单价",
            trigger: "blur"
          }
        ],
        inventoryNumber: [
          {
            required: true,
            // pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的库存数量",
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

    //新增
    addSure() {
      this.$refs["addInfo"].validate(valid => {
        if (valid) {
          let pamars = {
            //字段(入参 跟需求文档一样):v-model里要输入的内容
            boxStandard: this.addInfo.boxStandard,
            boxUnitPrice: this.addInfo.boxUnitPrice,
            inventoryNumber: this.addInfo.inventoryNumber,
            remark: this.addInfo.remark
          };
          this.$axios
            .post("prod-api/backend/box/standard/create", pamars)
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