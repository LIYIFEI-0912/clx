<template>
  <div class="user">
    <!-- 查询用户 -->
    <div class="FormData">
      <el-card class="searchModule">
        <el-form :model="user" label-width="100px" :inline="true" :ref="user">
          <el-form-item label prop="queryValue">
            <el-input v-model="user.queryValue" clearable></el-input>
          </el-form-item>

          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="resetForm(user)">重置</el-button>
        </el-form>
      </el-card>
    </div>

    <div class="contentB">
      <el-card>
        <div class="clickBtn">
          <el-button class="operateBtn" type="primary" @click="addData">新增</el-button>
          <el-button type="primary" @click="editData">编辑</el-button>
          <el-button type="primary" @click="isOpen()">启用</el-button>
          <el-button type="primary" @click="isStop()">停用</el-button>
          <el-button type="primary" @click="delData()">删除</el-button>
          <el-button type="primary" @click="isReset()">重置密码</el-button>
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
    <UserAdd ref="addData" v-on:search="search"></UserAdd>
    <UserEdit ref="editData"></UserEdit>
  </div>
</template>

<script>
import SiruiTable from "@/components/SiruiTable";
import UserAdd from "@/userManages/UserAdd";
import UserEdit from "@/userManages/UserEdit";

export default {
  name: "UserManages",
  components: {
    SiruiTable,
    UserAdd,
    UserEdit
  },
  data() {
    return {
      user: {
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
          prop: "userName",
          label: "用户名",
          width: 200
        },
        {
          prop: "nickName",
          label: "姓名"
        },
        {
          prop: "phonenumber",
          label: "手机号"
        },
        {
          prop: "email",
          label: "邮箱"
        },
        {
          prop: "status",
          label: "状态"
        }
      ],

      tableData: [
        // {
        //   userName: "user1",
        //   nickName: "李四",
        //   phone: "888888",
        //   idCard: "2101241999454545656",
        //   isEnable: "启用"
        // },
        // {
        //   userName: "user2",
        //   nickName: "李三",
        //   phone: "888888",
        //   idCard: "2101241999454545656",
        //   isEnable: "启用"
        // },
        // {
        //   userName: "user3",
        //   nickName: "王五",
        //   phone: "888888",
        //   idCard: "2101241999454545656",
        //   isEnable: "启用"
        // },
        // {
        //   userName: "user4",
        //   nickName: "老刘",
        //   phone: "888888",
        //   idCard: "2101241999454545656",
        //   isEnable: "启用"
        // },
        // {
        //   userName: "user5",
        //   nickName: "老王",
        //   phone: "888888",
        //   idCard: "2101241999454545656",
        //   isEnable: "启用"
        // }
      ]
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
          "prod-api/backend/user/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.user.queryValue
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
                userIds: []
              };
              for (var i = 0; i < this.multipleSelection.length; i++) {
                param.userIds.push(this.multipleSelection[i].userId);
              }
              param.userIds = param.userIds.join(",");
              this.$axios
                .put("prod-api/backend/user/enable/" + param.userIds, param)
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
          this.$confirm("是否禁用？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              let param = {
                userIds: []
              };
              for (var i = 0; i < this.multipleSelection.length; i++) {
                param.userIds.push(this.multipleSelection[i].userId);
              }
              param.userIds = param.userIds.join(",");
              this.$axios
                .put("prod-api/backend/user/disable/" + param.userIds, param)
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
                message: "已取消禁用"
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

    //重置密码按钮
    isReset() {
      if (this.multipleSelection.length >= 1) {
        this.dialogPwdEdit = true;
        let param = {
          userIds: []
        };
        for (var i = 0; i < this.multipleSelection.length; i++) {
          param.userIds.push(this.multipleSelection[i].userId);
        }
        param.userIds = param.userIds.join(",");
        this.$axios
          .put("prod-api/backend/user/reset/" + param.userIds, param)
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
                userIds: []
              };
              for (var i = 0; i < this.multipleSelection.length; i++) {
                params.userIds.push(this.multipleSelection[i].userId);
              }
              params.userIds = params.userIds.join(",");
              this.$axios
                .delete("prod-api/backend/user/delete/" + params.userIds)
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
