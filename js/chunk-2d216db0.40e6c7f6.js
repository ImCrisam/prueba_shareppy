(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216db0"],{c3f0:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[a("v-card",[a("v-card-text",[a("v-container",[a("form",{on:{submit:function(t){return t.preventDefault(),e.onSignup(t)}}},[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{name:"Nombres",label:"Nombres",id:"Nombres"},model:{value:e.nombre,callback:function(t){e.nombre=t},expression:"nombre"}})],1),a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{name:"cedula",label:"cedula",id:"cedula"},model:{value:e.cedula,callback:function(t){e.cedula=t},expression:"cedula"}})],1),a("v-flex",{attrs:{xs12:"",md12:""}},[a("v-text-field",{attrs:{name:"telefono",label:"telefono",id:"telefono"},model:{value:e.telefono,callback:function(t){e.telefono=t},expression:"telefono"}})],1)],1),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{name:"email",label:"E-mail",id:"email",type:"email",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1)],1),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-select",{attrs:{items:e.roles,label:"Rol","item-text":"nombre","persistent-hint":"","return-object":"","single-line":""},model:{value:e.rol,callback:function(t){e.rol=t},expression:"rol"}})],1)],1),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{name:"password",label:"Password",id:"password",type:"password",required:"",rules:[e.minPasswords]},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1)],1),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-text-field",{attrs:{name:"confirmPassword",label:"Validate Password",id:"confirmPassword",type:"password",rules:[e.comparePasswords]},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1)],1),a("v-layout",{staticClass:"mt-5"},[a("v-flex",{attrs:{xs12:""}},[a("v-btn",{on:{click:function(t){return e.$router.go(-1)}}},[e._v("cancelar")])],1),a("v-flex",{attrs:{xs12:""}},[a("v-btn",{attrs:{type:"submit",block:"",color:"primary",loading:e.loading}},[e._v("Register")])],1)],1)],1)])],1)],1)],1)],1)],1)},r=[],o=a("260b"),l={data(){return{roles:["Administrador","Usuario","Operador"],rol:"",email:"",password:"",nombre:"",telefono:"",cedula:"",confirmPassword:"",loading:!1,error:""}},computed:{comparePasswords(){return this.password===this.confirmPassword||"Contraseña debe ser iguales"},minPasswords(){return!(this.password.length<6)||"Min 6 caracteres"},user(){return this.$store.getters.user}},methods:{onSignup(){this.loading=!0,o["a"].auth().createUserWithEmailAndPassword(this.email,this.password).then(e=>{o["a"].firestore().collection("user").doc(e.user.uid).set({email:e.user.email,rol:this.rol,nombre:this.nombre,telefono:this.telefono,cedula:this.cedula,state:!0}).then(e=>{this.loading=!1,this.$router.go(-1)}).catch(e=>{console.log("erro doc "+e),this.loading=!1})}).catch(e=>{console.log("auth erro"+e),this.loading=!1})}}},n=l,i=a("2877"),d=a("6544"),c=a.n(d),u=a("8336"),m=a("b0af"),f=a("99d9"),v=a("a523"),b=a("0e8f"),x=a("a722"),p=a("b974"),w=a("8654"),h=Object(i["a"])(n,s,r,!1,null,null,null);t["default"]=h.exports;c()(h,{VBtn:u["a"],VCard:m["a"],VCardText:f["b"],VContainer:v["a"],VFlex:b["a"],VLayout:x["a"],VSelect:p["a"],VTextField:w["a"]})}}]);
//# sourceMappingURL=chunk-2d216db0.40e6c7f6.js.map