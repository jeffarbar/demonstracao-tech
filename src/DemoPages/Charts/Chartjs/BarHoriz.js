import {HorizontalBar} from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  mounted() {
    this.renderChart({
      labels: ['Menos de x dias' , 'Mais de x dias',''],
      datasets: [
        {
          label: 'Última troca do SIM',
          backgroundColor: '#0066FF',
          borderColor: '#0066FF',
          borderWidth: 1,
          hoverBackgroundColor: '#0066FF',
          hoverBorderColor: '#0066FF',
          borderCapStyle: 'round',
          data: [ 45, 90 , 10 ]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}
