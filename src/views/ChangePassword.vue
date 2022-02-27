<template>
<v-layout row wrap>
    <navbar ref="navbar"></navbar>
    <app-header @toggle-drawer="$refs.navbar.drawer = !$refs.navbar.drawer"></app-header>
    <div class="title" style="margin-top: 20vh">
        <div class="text-wrapper">
            <div>เปลี่ยนรหัสผ่าน</div>
        </div>
    </div>
    <div class="content">
        <div class="input-wrapper">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="form.current_password" placeholder="รหัสปัจจุบัน" type="password" solo :rules="currentPasswordRules" required></v-text-field>
                <v-text-field v-model="form.new_password" placeholder="รหัสใหม่" type="password" solo :rules="newPasswordRules" required></v-text-field>
                <v-text-field v-model="form.confirm_new_password" placeholder="ยืนยันรหัสผ่านใหม่" type="password" solo :rules="confirmPasswordRules" required></v-text-field>
            </v-form>
            <v-btn color="black white--text" elevation="3" large small x-large x-small type="submit" @click="changePassword">
                เปลี่ยน
            </v-btn>
        </div>
    </div>
</v-layout>
</template>

<script>
import Navbar from '@/components/NavBar'
import Header from '@/components/HeaderNodrawer'
import {
    mapActions
} from 'vuex'

export default {
    components: {
        navbar: Navbar,
        'app-header': Header
    },
    data() {
        return {
            title: 'USERNAME',
            icon: '\uf002',
            form: {
                current_password: '',
                new_password: '',
                confirm_new_password: ''
            },
            currentPasswordRules: [(v) => !!v || 'current Password input is required'],
            newPasswordRules: [(v) => !!v || 'new Password input is required'],
            confirmPasswordRules: [(v) => !!v || 'confirm Password input is required']
        }
    },
    methods: {
        ...mapActions(['ChangePassword']),
        async changePassword() {
          if (this.$refs.form.validate()) {
            const formData = new FormData()
            formData.append('current_password', this.form.current_password)
            formData.append('new_password', this.form.new_password)
            formData.append('confirm_new_password', this.form.confirm_new_password)
            try {
                await this.ChangePassword(formData)
                if (this.$store.getters.isChangePassword === true) {
                    this.$router.push('/profile')
                }
            } catch (error) {
                console.log('test')
            }
          }
        }
        // changePassword () {
        //   const formData = new FormData()
        //   formData.append('current_password', this.form.current_password)
        //   formData.append('new_password', this.form.new_password)
        //   formData.append('confirm_new_password', this.form.confirm_new_password)
        //   axios.post('api/changepassword', formData, {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem('token')}`
        //     }
        //   }).then((res) => {
        //     console.log(res.data)
        //     if (res.data.status === true) {
        //       this.$router.go(-1)
        //     }
        //   })
        //     .catch(function (error) {
        //       console.error(error)
        //     })
        // }
    }
}
</script>

<style lang="">
</style>
