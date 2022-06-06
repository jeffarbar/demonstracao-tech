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

                            </div>
                            <br>
                            <button @click="calc" class="btn btn-info-new">Calcula</button>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="row" >
                
                    <div class="col-sm-12 col-lg-6" >
                        <div v-if="this.mostra_grafico == true" class="card-header text-center">
                        
                            <vue-speedometer 
                            :value="this.score"
                            currentValueText="O valor do Score é ${value}"
                            :height="178"
                            :maxValue=20
                            />
                        </div> 
                    </div>
                    <div class="col-sm-12 col-lg-6">
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
        name:'APIPerfilDigitalDemonstracao',
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
            heading: 'Scoring',
            subheading: 'Otimize informações para a tomada de decisões de risco no processo de análise de crédito ao consumidor.',
            icon: 'pe-7s-piggy icon-gradient bg-tempting-azure',
            produto:'PRODUTO',
            cpf: '102.663.067-30',
            score: 0,
            mostra_grafico: false,
            json_response: '',
            toggle: false
        }),

        methods: {

            calc(){
                //let produto_formato = this.produto.replace("(","").replace(")","").replace("-","")
                let cpf_formato= this.cpf.replaceAll(".","").replace("-","")    

                if(cpf_formato == '10266306730'){
                     this.score = 17
                }else if(cpf_formato == '35989615884'){
                     this.score = 15
                }else{
                     this.score = 12
                }

                let json = "{\"cpf\": \""+cpf_formato+"\", \"score\": \""+this.score+"\" }"

                this.json_response = JSON.parse(json)
                this.mostra_grafico = true

                /*
                axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
                    .then((res) => {
                        console.log(res.data)
                        this.score = Math.round(Math.random() * 1000 )
                        let json = "{\"cpf\": \""+cpf_formato+"\", \"score\": \""+this.score+"\" }"

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
