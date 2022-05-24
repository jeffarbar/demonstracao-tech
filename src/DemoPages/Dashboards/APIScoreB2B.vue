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
                                        Número de CPF:
                                        <!--
                                        <input placeholder="627.585.390-55" 
                                            v-model="cpf"
                                            v-mask="'###.###.###-##'"
                                            type="text" class="mb-1 form-control">
                                        -->
                                        <select class="mb-1 form-control" v-model="cpf">
                                            <option>102.663.067-30</option>
                                             <option>406.666.228-50</option>
                                            <option>359.896.158-84</option>
                                        </select>
                                    </div>
                                </div>

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

    //import axios from "axios";

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
            heading: 'Antifraude',
            subheading: 'Reduza os riscos em transações eletrônicas por meio de validações digitais de identidade e inteligência antifraude.',
            icon: 'pe-7s-credit icon-gradient bg-tempting-azure',
            cep:'04313-210',
            telefone:'(11)99883-4485',
            cpf: '102.663.067-30',
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

                if(cpf_formato == '10266306730'){
                    if(telefone_formato == '11998834485' && cep_formato == '04313210'){
                        this.score = 813
                    }else if(telefone_formato == '11998834485'){
                        this.score = 534
                    }else if(cep_formato == '04313210'){
                        this.score = 608
                    }else{
                        this.score = 320
                    }
                     
                }else if(cpf_formato == '35989615884'){
                    if(telefone_formato == '11956002044' && cep_formato == '06414025'){
                        this.score = 798
                    }else if(telefone_formato == '11956002044'){
                        this.score = 512
                    }else if(cep_formato == '06414025'){
                        this.score = 591
                    }else{
                        this.score = 259
                    }
                }else if(cpf_formato == '40666622850'){
                    if(telefone_formato == '11912867662' && cep_formato == '09360500'){
                        this.score = 910
                    }else if(telefone_formato == '11912867662'){
                        this.score = 601
                    }else if(cep_formato == '09360500'){
                        this.score = 588
                    }else{
                        this.score = 105
                    }
                }else{
                     this.score = 12
                }

                let json = "{\"msisdn\": \""+telefone_formato+"\",\"cpf\": \""+cpf_formato+"\",\"cep\": \""+cep_formato+"\", \"score\": "+this.score+" }"
                        
                this.json_response = JSON.parse(json)
                this.mostra_grafico = true

                /*
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
                */
               
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