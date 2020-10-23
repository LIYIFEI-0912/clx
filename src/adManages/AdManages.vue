<template>
  <div class="ad">
    <div class="FormData">
      <el-card class="searchModule">
        <el-form :model="ad" label-width="100px" :inline="true" :ref="ad">
          <el-form-item label prop="queryValue">
            <el-input v-model="ad.queryValue" clearable></el-input>
          </el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="resetForm('ad')">重置</el-button>
        </el-form>
      </el-card>
    </div>

    <div class="contentB">
      <el-card>
        <div class="clickBtn">
          <el-button class="operateBtn" type="primary" @click="addData()">新增</el-button>
          <el-button type="primary" @click="editData()">编辑</el-button>
          <el-button type="primary" @click="isOpen()">启用</el-button>
          <el-button type="primary" @click="isStop()">停用</el-button>
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
              v-for="item in columbList"
              :key="item.num"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :fixed="item.fixed"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column prop="imgUrl" label="图片地址" min-wigth="50px">
              <!-- 图片的显示 -->
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" min-width="50px" height="50px" />
              </template>
            </el-table-column>
          </sirui-table>
        </div>
        <AdAdd ref="addData" v-on:search="search"></AdAdd>
        <AdEdit ref="editData" v-on:search="search"></AdEdit>
      </el-card>
    </div>
  </div>
</template>
  

<script>
import SiruiTable from "@/components/SiruiTable";
import AdAdd from "@/adManages/AdAdd";
import AdEdit from "@/adManages/AdEdit";

export default {
  name: "AdManages",
  components: {
    SiruiTable,
    AdAdd,
    AdEdit
  },
  data() {
    return {
      ad: {
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
      rules: {},
      columbList: [
        {
          prop: "id",
          label: "广告编号",
          width: 100,
          num: 1
        },
        {
          prop: "title",
          label: "标题",
          width: 100,
          num: 2
        },
        {
          prop: "content",
          label: "内容",
          width: 230,
          num: 3
        },
        {
          prop: "points",
          label: "可获积分",
          width: 100,
          num: 4
        },

        {
          prop: "sortNo",
          label: "排序",
          width: 100,
          num: 5
        },
        {
          prop: "isEnable",
          label: "广告状态",
          width: 100,
          num: 6
        },
        {
          prop: "delFlag",
          label: "删除状态",
          width: 100,
          num: 7
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // handleClick(row) {
    //   alert(row);
    // },
    // 查询用户
    search() {
      this.getData();
    },
    //查询列表数据
    getData() {
      this.$axios
        .get(
          "prod-api/backend/advertisement/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.ad.queryValue
        )
        .then(res => {
          if (200 == res.data.code) {
            for (var i = 0; i < res.data.rows.length; i++) {
              if (res.data.rows[i].imgUrl) {
                res.data.rows[i].imgUrl = "prod-api/" + res.data.rows[i].imgUrl;
              }
            }
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
    },
    // 第几页
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },

    // 新增按钮
    addData() {
      this.$refs.addData.openDialog(true);
    },

    // 新增按钮
    addData() {
      this.$refs.addData.openDialog(true);
    },
    //修改按钮
    editData() {
      if (1 == this.multipleSelection.length) {
        //为了防止子组件的值，影响父组件
        this.$refs.editData.openDialog(
          true,

          JSON.parse(JSON.stringify(this.multipleSelection[0]))
        );
      } else {
        this.$message({
          showClose: true,
          message: "请选择一条数据查看详情",
          type: "error"
        });
      }
    },
    //启用
    isOpen() {
      if (this.multipleSelection.length >= 1) {
        if (0 != this.multipleSelection.length) {
          this.$confirm("是否启用？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let param = {
                ids: []
              };
              for (var i = 0; i < this.multipleSelection.length; i++) {
                param.ids.push(this.multipleSelection[i].id);
              }
              param.ids = param.ids.join(",");
              this.$axios
                .put(
                  "prod-api/backend/advertisement/operate/enable/" + param.ids,
                  param
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
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消启用"
              });
            });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行操作",
          type: "error"
        });
      }
    },

    //停用按钮
    isStop() {
      if (this.multipleSelection.length >= 1) {
        if (0 != this.multipleSelection.length) {
          this.$confirm("是否停用？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let param = {
                ids: []
              };
              for (var i = 0; i < this.multipleSelection.length; i++) {
                param.ids.push(this.multipleSelection[i].id);
              }
              param.ids = param.ids.join(",");
              this.$axios
                .put(
                  "prod-api/backend/advertisement/disable/" + param.ids,
                  param
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
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消停用"
              });
            });
        }
      } else {
        this.$message({
          showClose: true,
          message: "请选择数据进行操作",
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
              params.ids = params.ids.join(",");
              this.$axios
                .delete("prod-api/backend/advertisement/delete/" + params.ids)
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
