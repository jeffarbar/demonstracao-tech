<template>
    <div>
        <notifications group="app"/>
        <div  style="background-color:#0066FF;">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="3">
                  

                    <div class="modal-body"  style="background-color:#F2F4FF;">
                        <p class="aligncenter">
                            <img width="190" height="190" src="@/assets/images/telefonica_login.png" alt="">
                        </p>
                        
                        <b-form-group id="exampleInputGroup1"
                                        label-for="exampleInput1"
                                        description="Entre com o seu e-mail">

                            <b-form-input id="exampleInput1"
                                            type="email"
                                            class="mb-2 form-control-sm"
                                            required
                                            v-model="login.email"
                                            placeholder="E-mail...">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup2"
                                        label-for="exampleInput2"
                                        description="Entre com a sua senha">
                            <b-form-input id="exampleInput2"
                                            type="password"
                                            class="mb-2 form-control-sm"
                                            required
                                            v-model="login.senha"
                                            placeholder="Senha...">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="exampleInputGroup3"
                                        label-for="exampleInput3"
                                        description=".">
                                        
                            <div class="float-right">
                                <button @click="logar" class="btn btn-info-new">Entrar</button>
                            </div>

                        </b-form-group>
                    </div>

                    <div class="text-center text-white opacity-4 mt-3">
                        <h7>&copy; {{ new Date().getFullYear() }} Tech IoT de Big Data</h7>
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
 
  export default {
    name: 'loginDemonstracao',
    components: {
    },
    data() {
      return {
        showModal: false,
        login:{
            email: null,
            senha: null
        }
      };
    },
    created(){
        this.usuario = this.$localStorage.clear()
    },  
    methods: {

        logar(){

            let self = this
            if( this.login == null || this.login.email == null || this.login.senha == null
            || this.login.email == "" || this.login.senha == "" ){
                console.log( "Campo em branco" )
                self.$localStorage.clear()
                this.$notify({
                    group: 'app',
                    type: 'error',
                    title: 'Mensagem importante',
                    duration: 5000,
                    text: 'Favor preencher todos os campos'
                });
                
            }else{
               
                var md5 = require('md5');

                var hash_email = md5(this.login.email);
                var hash_senha = md5(this.login.senha);

                if (hash_email == 'bd3ab9c6fdd362ddfd01e969cc73f699' && 
                    hash_senha == '5df0b5feaf0282faf66cf1ada111b799'){

                    this.$localStorage.set('usuario', this.login)
                    if (this.$route.path != '/api/perfil-digital') {
                        this.$router.push("/api/perfil-digital");
                    }
            
                }else{
                    self.$localStorage.clear()
                    this.$notify({
                        group: 'app',
                        type: 'error',
                        title: 'Mensagem importante',
                        duration: 5000,
                        text: 'Lamentamos, senha ou login inválida!'
                    });    

                }
            
            }
        }
    }
  }
</script>
<style>
    .btn-info-new {
        color: #0066FF;
        background-color: #F2F4FF;
        border-color: #0066FF;
    }
    .aligncenter {
        text-align: center;
    }
</style>