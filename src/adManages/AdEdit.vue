<template>
  <div class="adDialog">
    <el-dialog width="400px" title="广告修改" :visible.sync="dialogEdit" :close-on-click-modal="true">
      <el-form
        :model="editInfo"
        label-width="100px"
        :rules="rules"
        ref="editInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="广告id" prop="id" label-width="110px">
          <el-input v-model="editInfo.id" readonly maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title" label-width="110px">
          <el-input v-model="editInfo.title" maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" label-width="110px">
          <el-input v-model="editInfo.content" maxlength="40" clearable></el-input>
        </el-form-item>
        <el-form-item label="奖励积分	" prop="points" label-width="110px">
          <el-input v-model="editInfo.points" maxlength="40" clearable></el-input>
        </el-form-item>

        <!-- 图片显示 -->
        <el-form-item label="原图片地址">
          <img :src="imgUrl" min-width="70" height="70" />
        </el-form-item>

        <el-form-item label="修改图片地址" label-width="110px">
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
        <el-form-item label="序号	" prop="sortNo" label-width="110px">
          <el-input v-model="editInfo.sortNo" maxlength="40" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogadd=false;cancelDialog()">取消</el-button>
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
      dialogAdd: false,
      dialogVisible: false,
      dialogImageUrl: "",
      editInfo: {
        title: "",
        content: "",
        points: "",
        id: "",
        imgUrl: "",
        sortNo: "",
        version: ""
      },
      uploadUrl: "prod-api/common/upload", //拼接url
      imgUrl: "", //原图片地址
      rules: {
        title: [
          {
            required: true,
            // pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            trigger: "blur",
            message: "标题"
          }
        ],
        content: [
          {
            required: true,
            // pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            trigger: "blur",
            message: "请输入正确的手机号"
          }
        ],
        points: [
          {
            required: true,
            // pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            trigger: "blur",
            message: "请输入正确的手机号"
          }
        ],
        imgUrl: [
          {
            required: true,
            pattern: /<img.*?(?:>|\>)/gi,
            trigger: "blur",
            message: "请输入正确的图片"
          }
        ],
        sortNo: [
          {
            required: true,
            // pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            trigger: "blur",
            message: "请输入正确的排序"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    openDialog(flag, val) {
      this.dialogEdit = flag;
      (this.imgUrl = val.imgUrl),
        this.$nextTick(() => {
          //修改数据后用此方法立即获取更新后的数据
          this.$refs.editInfo.resetFields();
          (this.editInfo.id = val.id),
            (this.editInfo.title = val.title),
            (this.editInfo.content = val.content),
            (this.editInfo.points = val.points),
            (this.editInfo.sortNo = val.sortNo),
            (this.editInfo.version = val.version);
        });
    },
    //上传
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      //判断类型是不是图片
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      //substring截取字符串 返回string对象的一个字串，对象最后一个索引+1,索引到最后 判断后面的格式是什么类型
      const jpgPic = testmsg == "jpg";
      const pngPic = testmsg == "pngic";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!jpgPic && !pngPic) {
        this.$message({
          message: "上传文件只能是jpg,png格式!",
          type: "error"
        });
        setTimeout(() => this.$refs.uploads.clearFiles(), 1000);
        this.dialogVisible = false;
      } else if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过10MB!",
          type: "error"
        });
      } else {
        let fd = new FormData();
        fd.append("file", file); //传文件
        this.$axios({
          method: "post",
          url: this.uploadUrl,
          data: fd
        }).then(res => {
          // console.log(file);
          if (res.data.code == 200) {
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

    addSure() {
      this.$refs["editInfo"].validate(valid => {
        if (valid) {
          let params = {
            id: this.editInfo.id,
            title: this.editInfo.title,
            version: this.editInfo.version,
            content: this.editInfo.content,
            imgUrl: this.dialogImageUrl,
            sortNo: this.editInfo.sortNo,
            points: this.editInfo.points
          };
          this.$axios
            .put("prod-api/backend/advertisement/update", params)
            .then(res => {
              if (200 == res.data.code) {
                this.dialogEdit = false;
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: "success"
                });
                this.$emit("search");
                this.dialogEdit = false;
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