<template>
    <div>
        <page-title :heading=heading :subheading=subheading :icon=icon></page-title>

        <div class="row">

            <div class="col-sm-12 col-lg-12">
                <div class="main-card mb-4 card">
                    <div class="card-body">
                        <h5 class="card-title">Dados de entrada</h5>
                        <div class="form-row">
                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    Quantidade de Proposta por Mês:
                                    <input placeholder="55000"  v-model="qtd_proposta_mes" type="number" class="mb-1 form-control">
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    Taxa Aprovação:
                                    <money placeholder="30%" v-model="taxa_aprovacao" v-bind="porc" class="mb-1 form-control"></money>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    Ticket Médio:
                                    <money placeholder="R$ 1.500,00" v-model="ticket_medio" v-bind="money" class="mb-1 form-control"></money>
                                </div>
                            </div>

                        </div>
                        <div class="form-row">

                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    Inadimplencia Carteira - Taxa:
                                    <money placeholder="12%" v-model="inadimplencia_carteira_taxa" v-bind="porc" class="mb-1 form-control"></money>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="position-relative form-group">
                                    Custo por Consulta:
                                    <money placeholder="R$ 0,75" v-model="custo_por_consulta" v-bind="money" class="mb-1 form-control"></money>
                                </div>
                            </div>
                        </div>

                        <br>
                        <button @click="calc" class="btn btn-info-new">Calcula</button>&nbsp;&nbsp;
                        <button @click="exportAsExcel" class="btn btn-info-new">Export Excel</button>
                        <div class="form-row">
                            <div class="col-md-6">
                                <div v-if="this.descricao_indicacao_percentual != null" class="position-relative form-group" style="color:#0066FF;">
                                    <br>
                                    <strong>{{this.descricao_indicacao_percentual}}</strong>
                                    <br>
                                    <strong>{{this.descricao_indicacao_saving}}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
                      
        <div class="row">
            <div class="col-sm-12 col-lg-6">
               
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            Parâmetros de Entrada
                        </div>
                    </div>
                    <div class="p-0 card-body">
                       
                        <div class="widget-chart widget-chart2 text-left p-0">
                            <div class="widget-chat-wrapper-outer">

                                <div class="text-center">
                                   
                                    <vue-excel-editor ref="grid_parametros"
                                        v-model="jsondata_parametros" 
                                        :readonly="true"
                                        :no-paging="true"
                                        :filter-row="true"
                                        :no-header-edit="true"
                                    >    
                                        <vue-excel-column field="parametro" width="200px" label="Parametro"  type="string" />
                                        <vue-excel-column field="valor"  label="Valor"  type="string" />
                                        <vue-excel-column field="_"  width="20px" label=" "  type="string" />
                                        <vue-excel-column field="faturamento_total"  label="Faturamento Total"  type="string" />
                                    </vue-excel-editor>
                                    </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            Indicadores
                        </div>
                    </div>
                    <div class="p-0 card-body">
               
                        <div class="widget-chart widget-chart2 text-left p-0">
                            <div class="widget-chat-wrapper-outer">

                                <div class="text-center">
                                    <vue-excel-editor ref="grid_indicadores"
                                        v-model="jsondata_indicadores" 
                                        :readonly="true"
                                        :no-paging="true"
                                        :filter-row="true"
                                        :no-header-edit="true"
                                    >    
                                        <vue-excel-column field="indicador" width="200px"  label="Indicador" />
                                        <vue-excel-column field="valor"   label="Valor"/>
                                        <vue-excel-column field="saving"  label="Saving" />
                                        <vue-excel-column field="inad_considerada" label="Inad. Considerada" />
                                    </vue-excel-editor>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
            </div>
        </div>


        <div class="mb-3 card">
            
            <div class="text-center d-block p-3 card-footer">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Modelo Típico
                    </div>
                </div>
                <div class="text-center">
                    <vue-excel-editor ref="grid_modelo_tipico"
                        v-model="jsondata_modelo_tipico" 
                        :readonly="true"
                        :no-paging="true"
                        :filter-row="true"
                        :no-header-edit="true"
                    >    
                        <vue-excel-column field="faixa"  label="FAIXA"  type="string" />
                        <vue-excel-column field="nao_resposta"  label="NÃO RESPOSTA"  type="string" />
                        <vue-excel-column field="resposta"  label="RESPOSTA"  type="string" />
                        <vue-excel-column field="total" label="TOTAL"  type="string" />
                        <vue-excel-column field="dist_faixa" label="Dist. Faixa"  type="string" />
                        <vue-excel-column field="inad_faixa" label="Inad. Faixa"  type="string" />
                        <vue-excel-column field="acum_inad" label="Acum. Inad." type="string"  />
                        <vue-excel-column field="tx_detec" label="Tx. Detec"  type="string" />
                        <vue-excel-column field="lift" label="LIFT"  type="string" />
                    </vue-excel-editor>
                </div>
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Modelo Com Perfil Digital
                    </div>
                </div>
                <div class="text-center">
                    <vue-excel-editor ref="grid_modelo_perfil_digital"
                        v-model="jsondata_modelo_pefil_digital" 
                        :readonly="true"
                        :no-paging="true"
                        :filter-row="true"
                        :no-header-edit="true"
                    >    
                        <vue-excel-column field="faixa" label="FAIXA"  type="string"  />
                        <vue-excel-column field="nao_resposta" label="NÃO RESPOSTA"  type="string"  />
                        <vue-excel-column field="resposta" label="RESPOSTA"  type="string"  />
                        <vue-excel-column field="total" label="TOTAL"  type="string"  />
                        <vue-excel-column field="dist_faixa" label="Dist. Faixa"  type="string" />
                        <vue-excel-column field="inad_faixa" label="Inad. Faixa"  type="string" />
                        <vue-excel-column field="acum_inad" label="Acum. Inad."  type="string"  />
                        <vue-excel-column field="tx_detec" label="Tx. Detec"  type="string" />
                        <vue-excel-column field="lift" label="LIFT" />
                    </vue-excel-editor>
                </div>
                <div class="divider m-0 d-md-none d-sm-block"></div>
            </div>
        </div>
        <div class="row">

            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            K.S. por Faixa de Score - Típico
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">

                                    <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                                        <chart_ks_tipico  :height="275"/>
                                    </div>
                                

                                    <div class="widget-chart-wrapper he-auto opacity-10 m-0 text-center">
                                        <vue-excel-editor ref="grid_ks_tipico"
                                            v-model="jsondata_ks_tipico" 
                                            :readonly="true"
                                            :no-paging="true"
                                            :filter-row="true"
                                            :no-header-edit="true"
                                        >    
                                            <vue-excel-column field="faixa"   label="Faixas" />
                                            <vue-excel-column field="mau_prob_acum"   label="Mau - Prod Acum" />
                                            <vue-excel-column field="bom_prob_acum"  label="Bom - Prod Acum" />
                                            <vue-excel-column field="diferenca" label="Diferença" />
                                        </vue-excel-editor>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            K.S. por Faixa de Score - com Perfil Digital
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">

                                    <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                                        <chart_ks_perfil_digital  :height="275"/>
                                    </div>


                                    <div class="widget-chart-wrapper he-auto opacity-10 m-0 text-center">
                                        <vue-excel-editor ref="grid_ks_perfil_digital"
                                            v-model="jsondata_ks_pefil_digital" 
                                            :readonly="true"
                                            :no-paging="true"
                                            :filter-row="true"
                                            :no-header-edit="true"
                                        >    
                                            <vue-excel-column field="faixa"   label="Faixas" />
                                            <vue-excel-column field="mau_prob_acum"   label="Mau - Prod Acum" />
                                            <vue-excel-column field="bom_prob_acum"  label="Bom - Prod Acum" />
                                            <vue-excel-column field="diferenca" label="Diferença" />
                                           
                                        </vue-excel-editor>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import PageTitle from "../../Layout/Components/PageTitle.vue";
    //import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {Money} from 'v-money'

    import chart_ks_tipico from '../Charts/Chartjs/KS_tipico'
    import chart_ks_perfil_digital from '../Charts/Chartjs/KS_perfil_digital'
    //import chart1 from './Analytics/chart2';

    // import chart2 from './Analytics/chart2';
    // import chart3 from './Analytics/chart3';

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faTrashAlt,
        faCheck,
        faCalendarAlt,
        faAngleDown,
        faAngleUp,
        faTh,
    } from '@fortawesome/free-solid-svg-icons'
    //import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faTrashAlt,
        faCheck,
        faAngleDown,
        faAngleUp,
        faTh,
        faCalendarAlt,
    );

    export default {
        name:'AnalyticsDemonstracao',
        components: {
            PageTitle,
           // VuePerfectScrollbar,
           // 'font-awesome-icon': FontAwesomeIcon,
            chart_ks_tipico,
            chart_ks_perfil_digital,
            Money
        },
        data: () => ({
            heading: 'Modelo de Fraudes',
            subheading: '',
            icon: 'pe-7s-light icon-gradient bg-tempting-azure',
            descricao_indicacao_percentual: null,
            descricao_indicacao_saving: null,
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                suffix: '',
                precision: 2,
                masked: false
            },
            porc: {
                decimal: '',
                thousands: '',
                prefix: '',
                suffix: '%',
                precision: 0,
                masked: false
            },

            qtd_proposta_mes: '55000',
            taxa_aprovacao: '30%',
            ticket_medio: 'R$ 1.500,00',
            inadimplencia_carteira_taxa: '12%',
            custo_por_consulta:'R$ 0,75',

            jsondata_indicadores: [
                { indicador: 'Perda Natural', valor: 'R$ 2.970.000,00', saving: '', inad_considerada: '12%'},
                { indicador: 'Perda Aplicando Modelo Típico', valor: 'R$ 663.000,00', saving: '- R$ 2.307.000,00', inad_considerada: '3%'}, 
                { indicador: 'Perda Financeira - PERFIL DIGITAL', valor: 'R$ 556.500,00', saving: '- R$ 106.500,00', inad_considerada: '2%'}, 
                { indicador: 'Consultas Realizadas', valor: '55.000', saving: '', inad_considerada: ''},
                { indicador: 'Custo por Consulta', valor: 'R$ 0,75', saving: '<-', inad_considerada: ''}, 
                { indicador: 'Gasto Total Consultas VIVO', valor: 'R$ 41.250,00', saving: '', inad_considerada: ''}, 
                { indicador: 'Saving Total / Mês', valor: '', saving: 'R$ 65.250,00', inad_considerada: ''},  
                { indicador: 'Percentual de Redução Perda', valor: '', saving: '-12%', inad_considerada: ''},  
                { indicador: 'Saving Total / 12 meses', valor: '', saving: '-R$ 783.000,00', inad_considerada: ''}
            ],

            jsondata_parametros: [
                { parametro: 'Qtd Proposta Mês', valor: '55000', _: '<-', faturamento_total: 'R$ 24.750.000,00'}, 
                { parametro: 'Taxa Aprovação', valor: '30%', _: '', faturamento_total: ''}, 
                { parametro: 'Ticket Médio', valor: 'R$ 1.500,00', _: '<-', faturamento_total: ''}, 
                { parametro: 'Ganho KS', valor: '4,6', _: '', faturamento_total: ''}, 
                { parametro: 'Inadimplencia Carteira - Taxa', valor: '12%', _: '<-', faturamento_total: ''}
            ],
            jsondata_modelo_tipico_tx_detec:[
                {valor: 0.118205349},
                {valor: 0.075648572},
                {valor: 0.064776445},
                {valor: 0.052310375},
                {valor: 0.048492792},
                {valor: 0.041149575},
                {valor: 0.035971223},
                {valor: 0.035846995},
                {valor: 0.034926872},
                {valor: 0.009661836},
                {valor: 0.051805338}
            ],

            jsondata_modelo_pefil_digital_tx_detec:[
                {valor: 0.120103315},
                {valor: 0.095370173},
                {valor: 0.064776445},
                {valor: 0.052310375},
                {valor: 0.046409807},
                {valor: 0.036956046},
                {valor: 0.031749507},
                {valor: 0.029482948},
                {valor: 0.024277202},
                {valor: 0.013992129},
                {valor: 0.051805338}
            ],

            jsondata_modelo_tipico: [
                { faixa: '1', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0}, 
                { faixa: '2', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '3', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '4', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '5', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '6', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0 }, 
                { faixa: '7', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '8', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '9', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '10', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0 },
                { faixa: 'Total', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '', tx_detec: '0%', lift: 1 }
            ],

            jsondata_modelo_pefil_digital: [
                { faixa: '1', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0}, 
                { faixa: '2', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '3', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '4', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '5', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0 },
                { faixa: '6', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0}, 
                { faixa: '7', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0 },
                { faixa: '8', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '9', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: '10', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '0%', tx_detec: '0%', lift: 0},
                { faixa: 'Total', nao_resposta: 0, resposta: 0, total: 0, dist_faixa: '0%', inad_faixa: '0%', acum_inad: '', tx_detec: '0%', lift: 1}
            ],

            jsondata_ks_tipico: [
                { faixa: '1', mau_prob_acum: '0,000' , bom_prob_acum: '0,000', diferenca: '0,00'},
                { faixa: '2', mau_prob_acum: '0,094' , bom_prob_acum: '0,231', diferenca: '0,14'},
                { faixa: '3', mau_prob_acum: '0,192' , bom_prob_acum: '0,377', diferenca: '0,19'},
                { faixa: '4', mau_prob_acum: '0,290' , bom_prob_acum: '0,502', diferenca: '0,21'},
                { faixa: '5', mau_prob_acum: '0,390' , bom_prob_acum: '0,603', diferenca: '0,21'},
                { faixa: '6', mau_prob_acum: '0,490' , bom_prob_acum: '0,696', diferenca: '0,21'},
                { faixa: '7', mau_prob_acum: '0,592' , bom_prob_acum: '0,776', diferenca: '0,18'},
                { faixa: '8', mau_prob_acum: '0,693' , bom_prob_acum: '0,845', diferenca: '0,15'},
                { faixa: '9', mau_prob_acum: '0,795' , bom_prob_acum: '0,914', diferenca: '0,12'},
                { faixa: '10', mau_prob_acum: '0,896' , bom_prob_acum: '0,981', diferenca: '0,09'},
                { faixa: 'Faixa 0', mau_prob_acum: '1,000' , bom_prob_acum: '1,000', diferenca: '0,00'},
                { faixa: 'Total K.S.', mau_prob_acum: '' , bom_prob_acum: '', diferenca: '21,3'}
            ],

            jsondata_ks_pefil_digital: [
                { faixa: '1', mau_prob_acum: '0,000' , bom_prob_acum: '0,000', diferenca: '0,00'},
                { faixa: '2', mau_prob_acum: '0,094' , bom_prob_acum: '0,235', diferenca: '0,14'},
                { faixa: '3', mau_prob_acum: '0,192' , bom_prob_acum: '0,423', diferenca: '0,23'},
                { faixa: '4', mau_prob_acum: '0,290' , bom_prob_acum: '0,548', diferenca: '0,26'},
                { faixa: '5', mau_prob_acum: '0,390' , bom_prob_acum: '0,649', diferenca: '0,26'},
                { faixa: '6', mau_prob_acum: '0,490' , bom_prob_acum: '0,738', diferenca: '0,25'},
                { faixa: '7', mau_prob_acum: '0,592' , bom_prob_acum: '0,809', diferenca: '0,22'},
                { faixa: '8', mau_prob_acum: '0,693' , bom_prob_acum: '0,870', diferenca: '0,18'},
                { faixa: '9', mau_prob_acum: '0,795' , bom_prob_acum: '0,927', diferenca: '0,13'},
                { faixa: '10', mau_prob_acum: '0,896' , bom_prob_acum: '0,973', diferenca: '0,08'},
                { faixa: 'Faixa 0', mau_prob_acum: '1,000' , bom_prob_acum: '1,000', diferenca: '0,00'},
                { faixa: 'Total K.S.', mau_prob_acum: '' , bom_prob_acum: '', diferenca: '25,9'}
            ],

            parametro:{
                qdt_proposta_mes: 55000,
                taxa_aprovacao:0.3,
                ticket_medio: 1500.00,
                inadimplencia_carteira_taxa:0.12

            },
            indicador:{
                soma_resposta_tipica: 0,
                soma_resposta_perfil_digital: 0,
                custo_por_consulta: 0.75
            },
            ks:{
                soma_diferenca_tipico:21.3,
                soma_diferenca_perfil_digital:25.9
            }
        }),

        methods: {

            exportAsExcel () {
                const format = 'xlsx'
                const exportSelectedOnly = false
                this.$refs.grid_parametros.exportTable(format, exportSelectedOnly, "Parametros")

                this.$refs.grid_indicadores.exportTable(format, exportSelectedOnly, "Indicadores")

                this.$refs.grid_modelo_tipico.exportTable(format, exportSelectedOnly, "Modelo_Típico")

                this.$refs.grid_modelo_perfil_digital.exportTable(format, exportSelectedOnly, "Modelo_Perfil_Digital")

                this.$refs.grid_ks_tipico.exportTable(format, exportSelectedOnly, "KS_Típico")

                this.$refs.grid_ks_perfil_digital.exportTable(format, exportSelectedOnly, "KS_Perfil_Digital")
            },

            get_qtd_proposta_mes(){
                return this.qtd_proposta_mes;
            },

            convert_num(valor){
            
                if( valor == undefined ){
                    return 0
                }
                if(typeof valor === 'string'){
                    return new Number( valor.replace(/\s+/g,"").replace("%","").replace("R$","").replaceAll(".","").replace(",",".") )
                }

                return valor
            },

            calc_responta(tx_detec){
                return Math.round(this.get_qtd_proposta_mes() * 0.1 * tx_detec)
            },

            calc_nao_responta(tx_detec){
                return Math.round(this.get_qtd_proposta_mes() * 0.1 * (1 - tx_detec ))
            },

            calc_total(nao_resposta, resposta){
                return Math.round(resposta + nao_resposta)
            },

            calc_dist_faixa(total){
                return (total * 100) / this.get_qtd_proposta_mes()
            },

            calc_inad_faixa(resposta, total){
                return ((resposta / total) * 100).toFixed(1)
            },
            gera_taxa_detec(valor){
                return Math.round(valor * 100) + "%"
            },
            calc_acum_inad( inad_faixa,  acum_inad ){
                return new Number(inad_faixa.replace("%","")) + new Number(acum_inad )
            },

            calc_lift( tx_detec ){
                return (tx_detec / JSON.stringify(this.jsondata_modelo_tipico_tx_detec[ 10 ] ["valor"] )).toFixed(2)
            },

            soma_modelo_tipico(nome_campo){

                let total_modelo_tipico = 0    
                this.jsondata_modelo_tipico.forEach(i => {
                    total_modelo_tipico = total_modelo_tipico + Math.round(this.convert_num(i[nome_campo]))
                })
                return Math.round(total_modelo_tipico)
            },

            soma_modelo_pefil_digital(nome_campo){
    
                let total_modelo_perfil_digital = 0    
                this.jsondata_modelo_pefil_digital.forEach(i => {

                    total_modelo_perfil_digital = total_modelo_perfil_digital + Math.round(this.convert_num(i[nome_campo]))
                })
                return Math.round(total_modelo_perfil_digital)    

            },

            format_moeda( valor ){
                return valor.toLocaleString('pt-BR',{style:'currency', currency: 'BRL'});
            },
            format_porcen(valor){
                return Math.round(valor * 100) + "%"
            },

            carregar_valor(){

                this.parametro.qdt_proposta_mes = this.convert_num( this.qtd_proposta_mes )
                this.parametro.taxa_aprovacao = this.convert_num( this.taxa_aprovacao ) / 100
                this.parametro.ticket_medio =  this.convert_num( this.ticket_medio)
                this.parametro.inadimplencia_carteira_taxa = this.convert_num(this.inadimplencia_carteira_taxa) / 100
                this.indicador.custo_por_consulta = this.convert_num(this.custo_por_consulta)
            },
            calc(){

                this.descricao_indicacao_percentual = null
                this.descricao_indicacao_saving = null

                this.carregar_valor()

                this.indicador.soma_resposta_tipica = 0 
                this.indicador.soma_resposta_perfil_digital = 0 
                var acum_inad_tipico = 0
                var acum_inad_perfil_digital = 0

                let tx_detect_valor = 0

                this.jsondata_modelo_tipico.forEach(e => {

                   
                    if( e["faixa"] == 'Total'){

                        tx_detect_valor = JSON.stringify(this.jsondata_modelo_tipico_tx_detec[ 10 ] ["valor"] )     

                        e["resposta"] = this.soma_modelo_tipico("resposta")
                        e["nao_resposta"] = this.soma_modelo_tipico("nao_resposta")
                        e["total"] = this.soma_modelo_tipico("total")
                        e["inad_faixa"] = this.calc_inad_faixa(e["resposta"], e["total"])  + "%" 
                        e["dist_faixa"] = "100%"
                        e["acum_inad"] = ""
                    }else{

                        tx_detect_valor = JSON.stringify(this.jsondata_modelo_tipico_tx_detec[ e["faixa"] - 1 ] ["valor"] )  

                        e["resposta"] = this.calc_responta( tx_detect_valor )

                        if(e["faixa"] == '8' || e["faixa"] == '9' || e["faixa"] == '10' ){
                            console.log(e["resposta"] + '<<')
                            this.indicador.soma_resposta_tipica = this.convert_num(this.indicador.soma_resposta_tipica) + e["resposta"]
                        }
                        e["nao_resposta"] = this.calc_nao_responta( tx_detect_valor )
                        e["total"] = this.calc_total(e["nao_resposta"], e["resposta"])
                        e["inad_faixa"] = this.calc_inad_faixa(e["resposta"], e["total"])  + "%" 
                        e["dist_faixa"] = this.calc_dist_faixa( e["total"] ) + "%"  
                        let count_tipico = this.calc_acum_inad( e["inad_faixa"], acum_inad_tipico ) 
                        e["acum_inad"] = count_tipico.toFixed(1) + "%" 
                        acum_inad_tipico = count_tipico

                    }

                    e["tx_detec"] = this.gera_taxa_detec(tx_detect_valor)

                    e["lift"] = this.calc_lift( tx_detect_valor )
                }); 

                this.jsondata_modelo_pefil_digital.forEach(e => {

                    let tx_detect_valor = 0

                    if( e["faixa"] == 'Total'){

                        tx_detect_valor = JSON.stringify(this.jsondata_modelo_pefil_digital_tx_detec[ 10 ] ["valor"] )     

                        e["resposta"] = this.soma_modelo_pefil_digital("resposta")
                        e["nao_resposta"] = this.soma_modelo_pefil_digital("nao_resposta")
                        e["total"] = this.soma_modelo_pefil_digital("total")
                        e["inad_faixa"] = this.calc_inad_faixa(e["resposta"], e["total"])  + "%" 
                        e["dist_faixa"] = "100%"
                        e["acum_inad"] = ""
                    }else{

                        tx_detect_valor = JSON.stringify(this.jsondata_modelo_pefil_digital_tx_detec[ e["faixa"] - 1 ] ["valor"] )  

                        e["resposta"] = this.calc_responta( tx_detect_valor )
                        if(e["faixa"] == '8' || e["faixa"] == '9' || e["faixa"] == '10' ){
                            this.indicador.soma_resposta_perfil_digital = this.convert_num(this.indicador.soma_resposta_perfil_digital) + e["resposta"]
                        }
                        e["nao_resposta"] = this.calc_nao_responta( tx_detect_valor )
                        e["total"] = this.calc_total(e["nao_resposta"], e["resposta"])
                        e["inad_faixa"] = this.calc_inad_faixa(e["resposta"], e["total"])  + "%" 
                        e["dist_faixa"] = this.calc_dist_faixa( e["total"] ) + "%"  
                        let count_perfil_digital = this.calc_acum_inad( e["inad_faixa"], acum_inad_perfil_digital ) 
                        e["acum_inad"] = count_perfil_digital.toFixed(1) + "%" 
                        acum_inad_perfil_digital = count_perfil_digital
                    }

                    e["tx_detec"] = this.gera_taxa_detec(tx_detect_valor)

                    e["lift"] = this.calc_lift( tx_detect_valor )
                }); 


                this.jsondata_parametros[0]['valor'] = this.parametro.qdt_proposta_mes
                this.jsondata_parametros[0]['faturamento_total'] = this.format_moeda(this.convert_num( this.parametro.qdt_proposta_mes ) * this.parametro.taxa_aprovacao * this.convert_num( this.parametro.ticket_medio  ))

                this.jsondata_parametros[1]['valor'] = this.format_porcen(this.parametro.taxa_aprovacao)

                this.jsondata_parametros[2]['valor'] = this.format_moeda(this.parametro.ticket_medio)

                this.jsondata_parametros[3]['valor'] = (this.ks.soma_diferenca_perfil_digital - this.ks.soma_diferenca_tipico).toFixed(1)

                this.jsondata_parametros[4]['valor'] = this.format_porcen(this.parametro.inadimplencia_carteira_taxa)


                this.jsondata_indicadores[0]['valor'] = this.format_moeda(this.convert_num(this.jsondata_parametros[0]['valor']) * this.parametro.taxa_aprovacao * this.convert_num(this.jsondata_parametros[2]['valor']) * this.parametro.inadimplencia_carteira_taxa)  
                

                this.jsondata_indicadores[0]['inad_considerada'] =  this.format_porcen( this.convert_num(this.jsondata_indicadores[0]['valor']) / this.convert_num( this.jsondata_parametros[0]['faturamento_total'] ) ) 


                console.log(this.jsondata_parametros[2]['valor'])
                console.log(this.indicador.soma_resposta_tipica)

                this.jsondata_indicadores[1]['valor'] = this.format_moeda(this.convert_num(this.jsondata_parametros[2]['valor']) * this.indicador.soma_resposta_tipica)
                this.jsondata_indicadores[1]['saving'] = this.format_moeda(this.convert_num( this.jsondata_indicadores[1]['valor'] ) - this.convert_num( this.jsondata_indicadores[0]['valor'] ) )
                this.jsondata_indicadores[1]['inad_considerada'] =  this.format_porcen( (this.convert_num( this.jsondata_indicadores[1]['valor'] ) / this.convert_num( this.jsondata_parametros[0]['faturamento_total']  ) ))


                this.jsondata_indicadores[2]['valor'] = this.format_moeda(this.convert_num(this.jsondata_parametros[2]['valor']) * this.indicador.soma_resposta_perfil_digital)
                this.jsondata_indicadores[2]['saving'] = this.format_moeda(this.convert_num( this.jsondata_indicadores[2]['valor'] ) - this.convert_num( this.jsondata_indicadores[1]['valor'] ) )
                this.jsondata_indicadores[2]['inad_considerada'] = this.format_porcen((this.convert_num( this.jsondata_indicadores[2]['valor'] ) / this.convert_num( this.jsondata_parametros[0]['faturamento_total']  ) ) )


                this.jsondata_indicadores[3]['valor'] = this.convert_num(this.jsondata_parametros[0]['valor'])

                this.jsondata_indicadores[4]['valor'] = this.format_moeda( this.convert_num(this.indicador.custo_por_consulta) )

                this.jsondata_indicadores[5]['valor'] = this.format_moeda(this.indicador.custo_por_consulta * this.parametro.qdt_proposta_mes )


                this.jsondata_indicadores[6]['saving'] = this.format_moeda(this.convert_num(this.jsondata_indicadores[2]['saving']) + this.convert_num( this.jsondata_indicadores[5]['valor'] ) )


                this.jsondata_indicadores[7]['saving'] =  this.format_porcen((this.convert_num(this.jsondata_indicadores[6]['saving']) / this.convert_num( this.jsondata_indicadores[2]['valor']  ) ) )


                this.jsondata_indicadores[8]['saving'] = this.format_moeda(this.convert_num(this.jsondata_indicadores[6]['saving']) * 12 )


                this.descricao_indicacao_percentual = 'Percentual de Redução Perda: ' + this.jsondata_indicadores[7]['saving']

                this.descricao_indicacao_saving = 'Saving Total / 12 meses: ' + this.jsondata_indicadores[8]['saving']
            }

        },

    }



</script>

<style>

.btn-info-new {
    color: #0066FF;
    background-color: #F2F4FF;
    border-color: #0066FF;
}

</style>