(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["profile"],{"67fe":function(e,t,c){"use strict";c("df76")},c66d:function(e,t,c){"use strict";c.r(t);var a=c("7a23");const i=e=>(Object(a["pushScopeId"])("data-v-28c21d9d"),e=e(),Object(a["popScopeId"])(),e),n={class:"page-title"},l={class:"input-field"},o={for:"description"},s={key:0,class:"helper-text invalid"},r={class:"switch"},d=i(()=>Object(a["createElementVNode"])("span",{class:"lever"},null,-1)),b={class:"btn waves-effect waves-light",type:"submit"},m=i(()=>Object(a["createElementVNode"])("i",{class:"material-icons right"},"send",-1));function u(e,t,c,i,u,p){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",null,[Object(a["createElementVNode"])("div",n,[Object(a["createElementVNode"])("h3",null,Object(a["toDisplayString"])(e.$t("profile.title")),1)]),Object(a["createElementVNode"])("form",{class:"form",onSubmit:t[2]||(t[2]=Object(a["withModifiers"])((...e)=>p.onSubmit&&p.onSubmit(...e),["prevent"]))},[Object(a["createElementVNode"])("div",l,[Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{id:"description",type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>u.name=e),class:Object(a["normalizeClass"])({invalid:i.v$.name.$error})},null,2),[[a["vModelText"],u.name,void 0,{trim:!0}]]),Object(a["createElementVNode"])("label",o,Object(a["toDisplayString"])(e.$t("profile.label")),1),i.v$.name.$error?(Object(a["openBlock"])(),Object(a["createElementBlock"])("small",s,Object(a["toDisplayString"])(i.v$.name.$errors[0].$message),1)):Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("div",r,[Object(a["createElementVNode"])("label",null,[Object(a["createTextVNode"])(" English "),Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=e=>u.isRuLocale=e)},null,512),[[a["vModelCheckbox"],u.isRuLocale]]),d,Object(a["createTextVNode"])(" Русский ")])]),Object(a["createElementVNode"])("button",b,[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.$t("profile.btnText"))+" ",1),m])],32)])}var p=c("5502"),j=c("c3b3"),O=c("b9fb"),h=c("b444"),v={name:"Profile",data(){return{name:"",isRuLocale:!0}},setup(){return{v$:Object(j["a"])()}},computed:{...Object(p["c"])(["user"])},mounted(){this.name=this.user.name,this.isRuLocale="ru-RU"===this.user.locale,setTimeout(()=>{window.M.updateTextFields()},0)},validations(){return{name:{required:O["b"].withMessage("Введите имя",O["e"]),minLength:O["b"].withMessage(({$params:e})=>`Имя должно быть не менее ${e.min} символов`,Object(O["c"])(2))}}},methods:{...Object(p["b"])(["updateUser"]),async onSubmit(){if(this.v$.$validate(),!this.v$.$error){const e={name:this.name,locale:this.isRuLocale?"ru-RU":"en-US"};this.$i18n.locale=this.isRuLocale?"ru-RU":"en-US";try{await this.updateUser(e),this.$message(h["a"].profileUpdate)}catch{}}}}},f=(c("67fe"),c("6b0d")),$=c.n(f);const V=$()(v,[["render",u],["__scopeId","data-v-28c21d9d"]]);t["default"]=V},df76:function(e,t,c){}}]);
//# sourceMappingURL=profile.439c4767.js.map