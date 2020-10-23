<template>
  <div class="order">
    <div class="formData">
      <el-card class="searchModule">
        <el-form :model="order" label-width="100px" :inline="true" :ref="order">
          <el-form-item label="客户名称" prop="nickName">
            <el-input v-model="order.nickName" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="order.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="下单时间" prop="time">
            <el-date-picker
              v-model="order.time"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </el-form-item>

          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="resetForm(order)">重置</el-button>
        </el-form>
      </el-card>
    </div>
    <div class="table">
      <el-card>
        <div class="btn">
          <el-button type="primary" @click="detail()">详情</el-button>
          <el-button type="primary" @click="delData">删除</el-button>
        </div>

        <div class="tabledata">
          <sirui-table
            class="operateTaable"
            :page="page"
            :loading="load"
            :data="tableData"
            @handleSelectionChange="handleSelectionChange"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :tableHeight="tableHeight"
          >
            <el-table-column align="center" type="selection" width="45"></el-table-column>

            <el-table-column prop="orderName" label="订单名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="orderCode" label="订单编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="订单状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createBy" label="客户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="boxId" label="箱子id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="boxCode" label="箱子编号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="boxStandard" label="箱子规格" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="leaseDuration" label="凭租时长" show-overflow-tooltip></el-table-column>

            <el-table-column prop="totalPrice" label="实付积分" show-overflow-tooltip></el-table-column>
            <el-table-column prop="terminal" label="操作" fixed="right" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="sendNull(scope.row)"
                  v-if="scope.row.btn==='发送空箱'"
                  style="color:orange;"
                >发送空箱</el-button>
                <el-button size="mini" v-else-if="scope.row.btn==='收取重箱'" style="color:green">收取重箱</el-button>
                <el-button size="mini" v-else-if="scope.row.btn==='发送重箱'" style="color:blue">发送重箱</el-button>
                <el-button size="mini" v-else-if="scope.row.btn==='收取空箱'" style="color:pink">收取空箱</el-button>
                <el-button size="mini" v-else style="display:none">--</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="emptyBoxOrderTime"
              label="空箱上门下单时间"
              v-if="isShow"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="heavyBoxOrderTime"
              label="重箱提取下单时间"
              v-if="isShow2"
              show-overflow-tooltip
            ></el-table-column>
          </sirui-table>
        </div>
      </el-card>
    </div>
    <OrderDetail ref="detail"></OrderDetail>
  </div>
</template>

<script>
import SiruiTable from "@/components/SiruiTable";
import OrderDetail from "@/orderManages/OrderDetail";
export default {
  name: "OrderManages",
  components: {
    SiruiTable,
    OrderDetail
  },
  mounted: function() {
    this.getData();
  },
  data() {
    return {
      isShow: false,

      tableHeight: 400,
      isShow2: false,
      order: {
        id: "",
        nickName: "",
        status: "",
        emptyBoxOrderTimeStart: "",
        emptyBoxOrderTimeEnd: "",
        heavyBoxOrderTimeStart: "",
        heavyBoxOrderTimeEnd: ""
      },

      dialogVisible: false,
      page: {
        pages: 0, //总共多少页
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条数据
        total: 0 // 总共多少条
      },
      load: false,
      multipleSelection: [],
      options: [
        {
          value: "1",
          label: "代发空箱"
        },
        {
          value: "2",
          label: "已发空箱"
        },
        {
          value: "3",
          label: "送达空箱"
        },
        {
          value: "4",
          label: "待收重箱"
        },
        {
          value: "5",
          label: "已存储"
        },
        {
          value: "6",
          label: "待发重箱"
        },
        {
          value: "7",
          label: "已发重箱"
        },
        {
          value: "8",
          label: "送达重箱"
        },
        {
          value: "9",
          label: "待收重箱"
        },
        {
          value: "10",
          label: "已完成"
        }
      ],
      columnList: [],
      tableData: []
    };
  },
  methods: {
    //查询
    search() {
      this.getData();
    },
    sendNull(row) {
      let operate = 0;

      if (row.status == 1) {
        operate = 2;
      } else if (row.status == 2) {
        operate = 3;
      } else if (row.status == 3) {
        operate = 4;
      } else if (row.status == 4) {
        operate = 5;
      } else if (row.status == 5) {
        operate = 6;
      } else if (row.status == 6) {
        operate = 7;
      } else if (row.status == 7) {
        operate = 8;
      } else if (row.status == 8) {
        operate = 9;
      } else if (row.status == 9) {
        operate = 10;
      }

      let paramForm = {};
      this.$axios
        .put(
          "prod-api/backend/order/operate/" +
            row.id +
            "/" +
            operate +
            "/" +
            row.version,
          paramForm
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
    },
    //查询列表数据
    getData() {
      this.$axios
        .get(
          "prod-api/backend/order/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&nickName=" +
            this.order.nickName +
            "&status=" +
            this.order.status +
            "&emptyBoxOrderTimeStart=" +
            this.order.emptyBoxOrderTimeStart +
            "&emptyBoxOrderTimeEnd=" +
            this.order.emptyBoxOrderTimeEnd +
            "&heavyBoxOrderTimeStart=" +
            this.order.heavyBoxOrderTimeStart +
            "&heavyBoxOrderTimeEnd=" +
            this.order.heavyBoxOrderTimeEnd
        )

        .then(res => {
          if (200 == res.data.code) {
            this.tableData = res.data.rows;
            this.page.total = res.data.total;
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].status == "1") {
                this.tableData[i].btn = "发送空箱";
              } else if (this.tableData[i].status == "4") {
                this.tableData[i].btn = "收取重箱";
              } else if (this.tableData[i].status == "6") {
                this.tableData[i].btn = "发送重箱";
              } else if (this.tableData[i].status == "9") {
                this.tableData[i].btn = "收取空箱";
              }
            }
            this.$message({
              showClose: true,
              message: "操作成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "res.data.msg",
              type: "error"
            });
          }
        });
    },
    // 重置
    // resetfields方法
    // $ref一定要绑定
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },

    handleSelectionChange(row) {
      this.multipleSelection = row;
      //JSON.stringify将对象转为字符串
      // alert(JSON.stringify(this.multipleSelection));
    },
    // 每页条数
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getData();
    },
    // 第几页
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getData();
    },

    //详情
    detail() {
      if (1 == this.multipleSelection.length) {
        this.$refs.detail.openDialog(
          true,
          JSON.parse(JSON.stringify(this.multipleSelection[0]))
        );
      } else {
        this.$message({
          showClose: true,
          message: "请选择一条数据进行查看详情",
          type: "error"
        });
      }
    },

    //删除按钮
    delData() {
      if (this.multipleSelection.length >= 1) {
        if (this.multipleSelection.length != 0) {
          this.$confirm("此操作将永久删除该数据,是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //此处调用接口
              let params = {
                ids: []
              };
              for (var i = 0; i < this.multipleSelection.length; i++) {
                params.ids.push(this.multipleSelection[i].id);
              }
              params.ids = params.Ids.join(",");
              this.$axios
                .delete("prod-api/backend/order/delete/" + params.ids)
                .then(res => {
                  // this.loading.endLoading();
                  if (200 == res.data.code) {
                    // this.searchForm();
                    this.$message({
                      type: "success",
                      message: res.data.msg
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: "请选择数据进行操作",
                      type: "error"
                    });
                  }
                });
            })
            .catch();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  position: relative;
}
.btnmm {
  position: absolute;
  right: 675px;
  top: 85px;
}
.btnnn {
  position: absolute;
  right: 575px;
  top: 85px;
}
.table {
  margin-top: 11px;
}
</style>
