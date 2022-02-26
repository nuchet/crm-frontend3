<template>
<v-layout row wrap>
    <navbar ref="navbar"></navbar>
    <app-header @toggle-drawer="$refs.navbar.drawer = !$refs.navbar.drawer"></app-header>
    <div class="title">
        <div class="text-wrapper">3 กรุณาถ่ายสำเนาทะเบียนรถ</div>
    </div>
    <div class="content">
        <v-form>
            <v-row>
                <v-col md="12" sm="12" cols="12">
                    <v-card class="mx-auto" max-width="60vw" style="padding-top: 40px">
                        <v-img src="@/assets/vehicleRegis.png" width="55%" height="40%" alt="" class="center-image" />
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon to="/camera">
                                <v-icon>mdi-camera</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-image</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-form>
                    <v-row>
                        <v-col md="12" sm="12" cols="12">เต็นท์รถ</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">รหัสบนการ์ดสมาชิก</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">ยื่ห้อรถยนต์</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">รุ่นรถยนต์</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">รหัสตัวถัง</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">รหัสเครื่องยนต์</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">จังหวัดที่ลงทะเบียน</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">ทะเบียนรถ</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">เลขไมล์ตั้งต้น</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">ความจุเครื่องยนต์</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">ปีที่ผลิตรถยนต์</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">วันที่ออกรถยนต์</v-col>
                        <v-col md="12" sm="12" cols="12">
                            <v-text-field type="text" name="membership" id="membership"></v-text-field>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">สีรถ</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">สีรถ2</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="12" sm="12" cols="12">สีรถ3</v-col>
                        <v-col md="12" sm="12" cols="12">
                       <v-select :items="this.carBrand" name="name" item-text="name" label="-- Please Select --" dense solo> </v-select>
                        </v-col>
                        <v-col md="6" sm="6" cols="6" class="text-center">
                            <v-btn @click="onBack()">ย้อนกลับ</v-btn>
                        </v-col>
                        <v-col md="6" sm="6" cols="6" class="text-center">
                            <v-btn class="next-button" to="/dealerWarranty">ถัดไป</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
                <!-- <v-col md="6" sm="6" cols="6" class="text-center">
            <v-btn @click="onBack()">ย้อนกลับ</v-btn>
          </v-col>
          <v-col md="6" sm="6" cols="6" class="text-center">
            <v-btn class="next-button" to="/bookService">ถัดไป</v-btn>
          </v-col> -->
            </v-row>
        </v-form>
    </div>
</v-layout>
</template>
<script>
import NavBar from '@/components/NavBar'
import HeaderNavigation from '@/components/HeaderNavigation'

export default {
  components: {
    navbar: NavBar,
    'app-header': HeaderNavigation
    // 'app-footer': Footer
  },
  data () {
    return {
      carBrand: [{
        id: '',
        name: '',
        status: ''
      }],
      carModel: [{
        id: '',
        car_brand_id: '',
        name: '',
        status: ''
      }],
      carSubModel: [{
        id: '',
        car_brand_id: '',
        name: '',
        status: ''
      }],
      carColor: [{
        id: '',
        name_th: '',
        name_en: ''
      }],
      province: [{
        id: '',
        code: '',
        name_th: '',
        name_en: '',
        geography_id: ''

      }]
    }
  },
  methods: {
    onBack () {
      this.$router.go(-1)
    }
    // onLoadCarBrand () {
    //   axios
    //     .get('api/car/brand')
    //     .then((res) => {
    //       this.carBrand = res.data
    //       console.log(this.carBrand)
    //     })
    //     .catch(function (error) {
    //       console.error(error)
    //     })
    // },
    // onLoadCarModel () {
    //   axios
    //     .get('api/car/model/1')
    //     .then((res) => {
    //       this.carModel = res.data
    //       console.log(this.carModel)
    //     })
    //     .catch(function (error) {
    //       console.error(error)
    //     })
    // },
    // onLoadCarSubModel () {
    //   axios
    //     .get('api/car/submodel/10')
    //     .then((res) => {
    //       this.carSubModel = res.data
    //       console.log(this.carSubModel)
    //     })
    //     .catch(function (error) {
    //       console.error(error)
    //     })
    // },
    // onLoadCarColor () {
    //   axios
    //     .get('api/car/color')
    //     .then((res) => {
    //       this.carColor = res.data
    //       console.log(this.carColor)
    //     })
    //     .catch(function (error) {
    //       console.error(error)
    //     })
    // },
    // onLoadProvince () {
    //   axios
    //     .get('api/province/listprovince')
    //     .then((res) => {
    //       this.province = res.data
    //       console.log(this.province)
    //     })
    //     .catch(function (error) {
    //       console.error(error)
    //     })
    // }
  },
  created () {
    // this.onLoadCarBrand()
    // this.onLoadCarModel()
    // this.onLoadCarSubModel()
    // this.onLoadCarColor()
    // this.onLoadProvince()
  }
}
</script>

<style lang="">
</style>
