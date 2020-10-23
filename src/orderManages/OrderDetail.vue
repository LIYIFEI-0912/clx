<template>
  <div class="orderDetail">
    <el-dialog width="60%" title="订单详情" :visible.sync="dialogDetail" :close-on-click-modal="false">
      <el-form
        :model="detailInfo"
        label-width="100px"
        :rules="rules"
        ref="detailInfo"
        :inline="true"
        label-position="right"
      >
        <!-- 空箱信息 -->
        <div v-if="nullIsShow">
          <el-form-item label="空箱上门下单时间" prop="emptyBoxOrderTime" label-width="110px">
            <el-input v-model="detailInfo.emptyBoxOrderTime" readonly maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="空箱上门姓名" prop="emptyBoxCallName" label-width="110px">
            <el-input v-model="detailInfo.emptyBoxCallName" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="空箱上门电话" prop="	emptyBoxCallPhone" label-width="110px">
            <el-input v-model="detailInfo.emptyBoxCallPhone" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="空箱上门地址" prop="emptyBoxCallAddress" label-width="110px">
            <el-input v-model="detailInfo.emptyBoxCallAddress" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="空箱上门时间" prop="emptyBoxCallTime" label-width="110px">
            <el-input v-model="detailInfo.emptyBoxCallTime" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="空箱上门时段" prop="emptyBoxCallInterval" label-width="110px">
            <el-input v-model="detailInfo.emptyBoxCallInterval" maxlength="40" clearable></el-input>
          </el-form-item>

          <!-- 重箱信息 -->
          <div v-if="heavyIsShow">
            <el-form-item label="重箱提取下单时间" prop="heavyBoxOrderTime" label-width="110px">
              <el-input v-model="detailInfo.heavyBoxOrderTime" maxlength="40" clearable></el-input>
            </el-form-item>
            <el-form-item label="重箱提取姓名" prop="heavyBoxCallName" label-width="110px">
              <el-input v-model="detailInfo.heavyBoxCallName" maxlength="40" clearable></el-input>
            </el-form-item>
            <el-form-item label="重箱提取电话" prop="heavyBoxCallPhone" label-width="110px">
              <el-input v-model="detailInfo.heavyBoxCallPhone" maxlength="40" clearable></el-input>
            </el-form-item>
            <el-form-item label="重箱提取地址" prop="heavyBoxCallAddress" label-width="110px">
              <el-input v-model="detailInfo.heavyBoxCallAddresss" maxlength="40" clearable></el-input>
            </el-form-item>
            <el-form-item label="重箱提取时间" prop="heavyBoxCallTime" label-width="110px">
              <el-input v-model="detailInfo.heavyBoxCallTime" maxlength="40" clearable></el-input>
            </el-form-item>
            <el-form-item label="重箱提取时段" prop="	heavyBoxCallInterval" label-width="110px">
              <el-input v-model="detailInfo.heavyBoxCallInterval" maxlength="40" clearable></el-input>
            </el-form-item>
          </div>

          <el-form-item label="订单编号" prop="orderCode" label-width="110px">
            <el-input v-model="detailInfo.orderCode" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单名称" prop="orderName" label-width="110px">
            <el-input v-model="detailInfo.orderName" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="箱子id" prop="boxId" label-width="110px">
            <el-input v-model="detailInfo.boxId" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="箱子编号" prop="boxCode" label-width="110px">
            <el-input v-model="detailInfo.boxCode" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="箱子规格" prop="boxStandard" label-width="110px">
            <el-input v-model="detailInfo.boxStandard" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="箱子积分单价" prop="boxUnitPrice" label-width="110px">
            <el-input v-model="detailInfo.boxUnitPrice" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="租赁时长" prop="leaseDuration" label-width="110px">
            <el-input v-model="detailInfo.leaseDuration" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="实付积分" prop="totalPrice" label-width="110px">
            <el-input v-model="detailInfo.totalPrice" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="status" label-width="110px">
            <el-input v-model="detailInfo.status" maxlength="40" clearable></el-input>
          </el-form-item>
          <el-form-item label="配送人信息" prop="people" label-width="110px">
            <el-input v-model="detailInfo.people" maxlength="40" clearable></el-input>
          </el-form-item>

          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDialog()">取消</el-button>
            <el-button type="primary" @click="editSure('editInfo')">保存</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "detailData",
  data() {
    return {
      dialogDetail: false,
      detailInfo: {
        emptyBoxOrderTime: "",
        heavyBoxOrderTime: "",
        emptyBoxCallName: "",
        emptyBoxCallPhone: "",
        emptyBoxCallAddress: "",
        emptyBoxCallTime: "",
        emptyBoxCallInterval: "",
        heavyBoxCallName: "",
        heavyBoxCallPhone: "",
        heavyBoxCallAddress: "",
        heavyBoxCallTime: "",
        heavyBoxCallInterval: "",
        orderCode: "",
        orderName: "",
        boxId: "",
        boxCode: "",
        boxStandard: "",
        boxUnitPrice: "",
        leaseDuration: "",
        totalPrice: "",
        status: "",
        people: ""
      },
      sortNo: "",
      createBy: "",
      version: "",
      nullIsShow: true,
      heavyIsShow: false,
      rules: {
        emptyBoxOrderTime: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的用户名",
            trigger: "blur"
          }
        ],
        heavyBoxOrderTime: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的用户名",
            trigger: "blur"
          }
        ],
        emptyBoxCallName: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的身份证号",
            trigger: "blur"
          }
        ],
        emptyBoxCallPhone: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        emptyBoxCallAddress: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        emptyBoxCallTime: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        emptyBoxCallInterval: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        heavyBoxCallName: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        heavyBoxCallPhone: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        heavyBoxCallAddress: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        heavyBoxCallTime: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        heavyBoxCallInterval: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        orderCode: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        orderName: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        boxId: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        boxCode: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        boxStandard: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        boxUnitPrice: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        leaseDuration: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        totalPrice: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        people: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    // openDialog(flag) {
    //   this.dialogDetail = flag;
    //   this.$nextTick(() => {
    //     this.$refs.detailInfo.resetFields();
    //   });
    // },

    openDialog(flag, val) {
      this.dialogDetail = flag;
      this.$nextTick(() => {
        this.$refs.detailInfo.resetFields();
        this.detailInfo = val;
      });
    },
    cancelDialog() {
      this.dialogDetail = false;
    },
    editSure() {
      this.dialogEdit = false;
    }
  }
};
</script>

<style scoped>
</style>