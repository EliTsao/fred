<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model.trim="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="form.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model.trim="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <el-checkbox-group v-model="form.permissions">
          <el-checkbox label="super-admin" />
          <el-checkbox label="admin" />
          <el-checkbox label="editor" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from '@/api/userManagement'

export default {
  name: 'UserManagementEdit',
  data() {
    return {
      form: {
        userName: '',
        password: '',
        phone: '',
        permissions: []
      },
      rules: {
        userName: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        phone: [{ required: true, trigger: 'blur', message: '请输入电话号码' }],
        permissions: [
          { required: true, trigger: 'blur', message: '请选择权限' }
        ]
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
          const { msg } = await doEdit(this.form)
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

