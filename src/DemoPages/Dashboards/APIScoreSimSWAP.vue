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

                                        <select class="mb-1 form-control" v-model="telefone">
                                            <option>(11)99883-4485</option>
                                            <option>(11)95600-2044</option>
                                            <option>(11)91286-7662</option>
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
            <div class="row">
                
                    <div class="col-sm-12 col-lg-6">
                        <div v-if="this.mostra_grafico == true" class="card-header text-center">
                        
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td style="background:#0066FF; color:#F2F4FF;"><b>Tag</b></td>
                                        <td colspan="2" style="background:#0066FF; color:#F2F4FF;" ><b>Última troca do SIM em</b></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2" style="font-size:65px; color:#F2F4FF; background:#0066FF; text-align: center; vertical-align: middle;"><b>{{this.tag}}</b></td>
                                        <td rowspan="2" style="text-align: center; vertical-align: middle;"><b>Mais de<p style="font-size:15px; color:#0066FF;">{{this.max}} dias</p></b></td>
                                        <td rowspan="2" style="text-align: center; vertical-align: middle;"><b>Menos de<p style="font-size:15px; color:#0066FF;">{{this.min}} dias</p></b></td>
                                    </tr>

                                </tbody>
                            </table>
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
        name:'APIScoreSimSWAPDemonstracao',
        components: {
            PageTitle,
            //VuePerfectScrollbar,
            //'font-awesome-icon': FontAwesomeIcon,
            VueJsonPretty
        },
        created() {
            setInterval(() => (this.toggle = !this.toggle), 1111);
        },
        data: () => ({
            heading: 'SIM Swap',
            subheading: 'Proteja seus clientes de operações fraudulentas com trocas de SIM recentes',
            icon: 'pe-7s-credit icon-gradient bg-tempting-azure',
            telefone:'(11)99883-4485',
            tag: 'string',
            min: 0,
            max: 0,
            mostra_grafico: false,
            json_response: '',
            toggle: false
        }),

        methods: {

            calc(){

                let telefone_formato = this.telefone.replace("(","").replace(")","").replace("-","") 
              
                if(telefone_formato == '11998834485'){
                    this.tag = 'H'
                    this.min = 45
                    this.max = 90
                }else if(telefone_formato == '11956002044'){
                    this.tag = 'G'
                    this.min = 31
                    this.max = 44
                }else{
                    this.tag = 'C'
                    this.min = 4
                    this.max = 5
                }

                let json = "{\"tag\": \""+this.tag+"\",\"min\":"+this.min+",\"max\":"+this.max+" }"
                        
                this.json_response = JSON.parse(json)
                this.mostra_grafico = true
               
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