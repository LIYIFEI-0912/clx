<template>
  <div class="box">
    <div class="FormData">
      <el-card class="searchModule">
        <el-form :model="box" label-width="100px" :inline="true" :ref="box">
          <el-form-item label prop="queryValue">
            <el-input v-model="box.queryValue" clearable></el-input>
          </el-form-item>

          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="resetForm(box)">重置</el-button>
        </el-form>
      </el-card>
    </div>

    <div class="contentB">
      <el-card>
        <div class="clickBtn">
          <el-button class="operateBtn" type="primary" @click="addData">新增</el-button>
          <el-button type="primary" @click="delData()">删除</el-button>
        </div>

        <div class="tableData">
          <sirui-table
            class="operateTable"
            :page="page"
            :loading="load"
            :data="tableData"
            @handleSelectionChange="handleSelectionChange"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :tableHeight="tableHeight"
          >
            <el-table-column align="center" type="selection" width="45"></el-table-column>
            <el-table-column
              v-for="(item,index) in columbList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :sortable="item.sort"
              :fixed="item.fixed"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
          </sirui-table>
        </div>
      </el-card>
    </div>
    <BoxAdd ref="addData" v-on:search="search"></BoxAdd>
  </div>
</template>

<script>
import SiruiTable from "@/components/SiruiTable";
import BoxAdd from "@/boxManages/BoxAdd";

export default {
  name: "BoxManages",
  components: {
    SiruiTable,
    BoxAdd
  },
  data() {
    return {
      box: {
        queryValue: ""
      },

      tableHeight: 400,
      dialogVisible: false,
      page: {
        pages: 0, //总共多少页
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条数据
        total: 0 //总共多少条
      },
      load: false,
      multipleSelection: [],
      columbList: [
        {
          prop: "boxStandard",
          label: "箱子规格",
          width: 200
        },
        {
          prop: "totalNumber",
          label: "总数量"
        },
        {
          prop: "usedNumber",
          label: "已使用数量"
        },
        {
          prop: "inventoryNumber",
          label: "库存数量"
        },
        {
          prop: "useRatio",
          label: "使用比例"
        },
        {
          prop: "boxUnitPrice",
          label: "箱子积分单价"
        }
      ],
      tableData: [
        // {
        //   boxCode: "001",
        //   boxCount: "366",
        //   useCount: "34534",
        //   surplusCount: "21016",
        //   boxScale: "456754",
        //   memberPoints: "100"
        // },
        // {
        //   boxCode: "002",
        //   boxCount: "366",
        //   useCount: "34534",
        //   surplusCount: "21016",
        //   boxScale: "456754",
        //   memberPoints: "100"
        // },
        // {
        //   boxCode: "003",
        //   boxCount: "366",
        //   useCount: "34534",
        //   surplusCount: "21016",
        //   boxScale: "456754",
        //   memberPoints: "100"
        // },
        // {
        //   boxCode: "004",
        //   boxCount: "366",
        //   useCount: "34534",
        //   surplusCount: "21016",
        //   boxScale: "456754",
        //   memberPoints: "100"
        // },
        // {
        //   boxCode: "005",
        //   boxCount: "366",
        //   useCount: "34534",
        //   surplusCount: "21016",
        //   boxScale: "456754",
        //   memberPoints: "100"
        // }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 查询用户
    search() {
      this.getData();
    },
    //查询列表数据
    getData() {
      this.$axios
        .get(
          "prod-api/backend/box/standard/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.box.queryValue
        )
        .then(res => {
          if (200 == res.data.code) {
            this.tableData = res.data.rows;
            this.page.total = res.data.total;
            this.$message({
              showClose: true,
              message: "查询成功",
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

    // 新增按钮
    addData() {
      this.$refs.addData.openDialog(true);
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
              params.ids = params.ids.join(",");
              this.$axios
                .delete("prod-api/backend/box/standard/delete/" + params.ids)
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
.formData {
  background: #fff;
}
.clickBtn {
  margin-top: 10px;
  padding: 5px;
}

.contentB {
  height: 100%;
  background: #fff;

  margin: 10px;
}
</style>
