<template>
<v-navigation-drawer v-model="drawer" app>
    <v-list dense>
        <v-list-item link exact :to="{ path: '/change' }">
            <v-list-item-action>
                <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link exact>
            <v-list-item-action>
                <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title @click="signOut">Logout</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import {
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            drawer: false
        }
    },
    methods: {
        ...mapActions(['LogOut']),
        async signOut() {
            try {
                await this.LogOut()
                if (this.$store.getters.StateUser == null) {
                    this.$router.push('/')
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style lang=""></style>
