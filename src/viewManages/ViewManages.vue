<template>
  <div class="view">
    <div class="FormData">
      <el-card class="searchModule">
        <el-form :model="view" label-width="150px" :inline="true" :ref="view">
          <el-form-item label prop="queryValue">
            <el-input v-model="view.queryValue" clearable></el-input>
          </el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="resetForm(view)">重置</el-button>
        </el-form>
      </el-card>
    </div>

    <div class="contentB">
      <el-card>
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
  </div>
</template>

<script>
import SiruiTable from "@/components/SiruiTable";

export default {
  name: "ViewManages",
  components: {
    SiruiTable
  },
  data() {
    return {
      view: {
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
          prop: "userId",
          label: "手机端用户id",
          width: 200
        },
        {
          prop: "nickName",
          label: "姓名"
        },
        {
          prop: "title",
          label: "标题"
        },
        {
          prop: "content",
          label: "内容"
        },
        {
          prop: "	createBy",
          label: "创建人"
        },
        {
          prop: "createTime",
          label: "创建时间"
        },
        {
          prop: "delFlag",
          label: "删除状态 "
        }
      ],
      tableData: [
        // {
        //   viewId: "001",
        //   account: "张三",
        //   title: "一个不成熟的小意见",
        //   content: "页面再好看些",
        //   gmt_create: "2020-4-14",
        //   is_deleted: "未删除"
        // },
        // {
        //   viewId: "001",
        //   account: "张三",
        //   title: "一个不成熟的小意见",
        //   content: "页面再好看些",
        //   gmt_create: "2020-4-14",
        //   is_deleted: "未删除"
        // },
        // {
        //   viewId: "001",
        //   account: "张三",
        //   title: "一个不成熟的小意见",
        //   content: "页面再好看些",
        //   gmt_create: "2020-4-14",
        //   is_deleted: "未删除"
        // },
        // {
        //   viewId: "001",
        //   account: "张三",
        //   title: "一个不成熟的小意见",
        //   content: "页面再好看些",
        //   gmt_create: "2020-4-14",
        //   is_deleted: "未删除"
        // },
        // {
        //   viewId: "001",
        //   account: "张三",
        //   title: "一个不成熟的小意见",
        //   content: "页面再好看些",
        //   gmt_create: "2020-4-14",
        //   is_deleted: "未删除"
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
          "prod-api/backend/advice/list?" +
            "pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize +
            "&searchValue=" +
            this.view.queryValue
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
