<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

         <div class="content">
            <div class="row">

                <div class="col-sm-12 col-lg-12">
                    <div class="main-card mb-4 card">
                        <div class="card-body">
                            <h5 class="card-title">Dados de entrada</h5>
                            
                            <div class="form-row">


                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        Número de Telefone:
                                        <input placeholder="(11)91234-5678" 
                                            v-mask="'(##)#####-####'"
                                            v-model="telefone" 
                                            type="text" class="mb-1 form-control">
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        Número de CPF:
                                        <input placeholder="627.585.390-55" 
                                            v-model="cpf"
                                            v-mask="'###.###.###-##'"
                                            type="text" class="mb-1 form-control">
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="position-relative form-group">
                                        CEP:
                                        <input placeholder="07600-973" 
                                            v-model="cep" 
                                            v-mask="'#####-###'"
                                            type="text" class="mb-1 form-control">
                                    </div>
                                </div>

                            </div>
                            <br>
                            <button @click="calc" class="btn btn-info-new">Calcula</button>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="row">
                
                    <div class="col-sm-12 col-lg-6">
                        <div v-if="this.mostra_grafico == true" class="card-header text-center">
                        
                            <vue-speedometer 
                            :value="this.score"
                            currentValueText="O valor do Score é ${value}"
                            :height="178"
                            />
                        </div> 
                    </div>
                    <div class="col-sm-12 col-lg-6" >
                        <div v-if="this.json_response != ''" class="card-header font-size-lg text-capitalize font-weight-normal">
                            <b>Resposta da API</b>
                        </div>
                        <div v-if="this.json_response != ''" class="card-header text-center">
                            <vue-json-pretty 
                                :path="'res'" 
                                :data="json_response"
                                :showLength="true" 
                            > 
                            </vue-json-pretty>
                        </div> 
                    </div>
            
            </div>    
        </div>
    </div>
</template>

<script>

    import axios from "axios";

    import PageTitle from "../../Layout/Components/PageTitle.vue";
    //import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import {
        faTrashAlt,
        faCheck,
        faCalendarAlt,
        faAngleDown,
        faAngleUp,
        faTh,
    } from '@fortawesome/free-solid-svg-icons'
    //import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import {library} from '@fortawesome/fontawesome-svg-core'

    import VueSpeedometer from "vue-speedometer";

    import VueJsonPretty from 'vue-json-pretty';
    import 'vue-json-pretty/lib/styles.css';

    library.add(
        faTrashAlt,
        faCheck,
        faAngleDown,
        faAngleUp,
        faTh,
        faCalendarAlt,
    );

    export default {
        name:'APIScoreB2BDemonstracao',
        components: {
            PageTitle,
            //VuePerfectScrollbar,
            //'font-awesome-icon': FontAwesomeIcon,
            VueSpeedometer,
            VueJsonPretty
        },
        created() {
            setInterval(() => (this.toggle = !this.toggle), 1111);
        },
        data: () => ({
            heading: 'API Score B2B',
            subheading: 'A API Score B2B fornece dois endpoints para ajudar a evitar fraudes. Um deles retorna uma pontuação da probabilidade de um CEP correspondente ao local de moradia do cliente. Ao fazer isso, a pontuação funciona como uma diretriz para ajudar a evitar fraudes. O outro endpoint valida se o documento e o número de telefone fazem parte do banco de dados do nosso cliente para ajudar a evitar fraudes com números falsos.',
            icon: 'pe-7s-credit icon-gradient bg-tempting-azure',
            cep:'07600-973',
            telefone:'(11)91234-5678',
            cpf: '627.585.390-55',
            score: 0,
            mostra_grafico: false,
            json_response: '',
            toggle: false
        }),

        methods: {

            calc(){
                let cep_formato = this.cep.replace("-","")
                let telefone_formato = this.telefone.replace("(","").replace(")","").replace("-","")
                let cpf_formato= this.cpf.replaceAll(".","").replace("-","")    

                axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
                    .then((res) => {
                        console.log(res.data)
                        //this.score = res.data.remaining
                        //this.json_response = res.data
                        this.score = Math.round(Math.random() * 1000 )
                        let json = "{\"msisdn\": \""+telefone_formato+"\",\"cpf\": \""+cpf_formato+"\",\"cep\": \""+cep_formato+"\", \"score\": "+this.score+" }"
                        
                        console.log(json)

                        this.json_response = JSON.parse(json)
                        this.mostra_grafico = true
                    })
                    .catch((error) => {
                        console.log(error);
                        this.score = 0
                        this.json_response = error
                        this.mostra_grafico = false
                    });

               
            }
        }
    }
</script>


<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    .btn-info-new {
        color: #0066FF;
        background-color: #F2F4FF;
        border-color: #0066FF;
    }

</style>