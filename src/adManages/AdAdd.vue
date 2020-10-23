<template>
  <div class="adDialog">
    <el-dialog width="500px" title :visible.sync="dialogAdd" :close-on-click-modal="true">
      <el-form
        :model="addInfo"
        label-width="200px"
        :rules="rules"
        ref="addInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="标题" prop="title" label-width="110px">
          <el-input v-model="addInfo.title" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content" label-width="110px">
          <el-input v-model="addInfo.content" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="奖励积分" prop="points" label-width="110px">
          <el-input v-model="addInfo.points" maxlength="40" clearable></el-input>
        </el-form-item>

        <el-form-item label="图片地址" prop="imgUrl" label-width="110px">
          <el-upload
            ref="uploads"
            :action="uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="序号" prop="sortNo" label-width="110px">
          <el-input v-model="addInfo.sortNo" maxlength="40" clearable></el-input>
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
      dialogImageUrl: "",
      dialogVisible: false,
      dialogAdd: false,
      addInfo: {
        title: "",
        content: "",
        points: "",
        imgUrl: "",
        sortNo: ""
      },
      uploadUrl: "prod-api/common/upload",
      rules: {
        title: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的广告标题",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的广告内容",
            trigger: "blur"
          }
        ],
        points: [
          {
            required: true,
            // pattern: /^[\u4E00-\u9FA5A-Za-z]+$/
            message: "请输入正确的积分",
            trigger: "blur"
          }
        ],
        sortNo: [
          {
            required: true,
            message: "请输入正确的序号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    openDialog(flag, val) {
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
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      //判断是不是图片
      var msg = file.name.substring(file.name.lastIndexOf(".") + 1);
      //返回file.name的一个字串 判断后面的格式jpg/jpeg
      const jpgPic = msg === "jpg";
      const pngPic = msg === "png";
      //定义图片类型
      const islt2m = file.size / 1024 / 1024 < 10;
      if (!jpgPic && !pngPic) {
        this.$message({
          message: "上传文件必须是jpg或png格式的图片！",
          type: "error"
        });
        //清空文件
        setTimeout(() => this.$refs.uploads.clearFiles(), 1000);
        this.dialogVisible = false;
      } else if (!islt2m) {
        this.$message({
          message: "上传图片大小不能超过10M！",
          type: "error"
        });
      } else {
        let fd = new FormData();
        fd.append("file", file); //传文件
        //调接口
        this.$axios({
          method: "post",
          url: this.uploadUrl,
          data: fd
        }).then(res => {
          if (200 == res.data.code) {
            this.dialogImageUrl = res.data.fileName;
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

    //新增
    addSure() {
      this.$refs["addInfo"].validate(valid => {
        if (valid) {
          let pamars = {
            //字段(入参 跟需求文档一样):v-model里要输入的内容

            title: this.addInfo.title,
            content: this.addInfo.content,
            imgUrl: this.dialogImageUrl,
            points: this.addInfo.points,
            sortNo: this.addInfo.sortNo
          };
          this.$axios
            .post("prod-api/backend/advertisement/create", pamars)
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