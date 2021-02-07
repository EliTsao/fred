<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="机器人名称" prop="robotName">
        <el-input v-model.trim="form.robotName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="机器人序列号" prop="serialNumber">
        <el-input v-model.trim="form.serialNumber" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { robotadd } from '@/api/robot'

export default {
  data() {
    return {
      form: {
        userName: '',
        password: '',
        phone: '',
        serialNumber: ''
      },
      rules: {
        robotName: [
          { required: true, trigger: 'blur', message: '请输入机器人名称' }
        ],
        serialNumber: [{ required: true, trigger: 'blur', message: '请输入机器人号' }]
      },
      title: '',
      dialogFormVisible: false
    }
  },
  created() {},
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = '添加'
      } else {
        this.title = '编辑'
        this.form = Object.assign({}, row)
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
    },
    save() {
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          const { msg } = await robotadd(this.form)
          this.$baseMessage(msg, 'success')
          this.$emit('fetch-data')
          this.close()
        } else {
          return false
        }
      })
    }
  }
}
</script>
