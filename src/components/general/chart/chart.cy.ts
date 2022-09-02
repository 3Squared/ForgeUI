import { mount } from 'cypress/vue2'
import ForgeChart from "./Chart.vue";
import {defineComponent} from "vue";
import { Chart, CategoryScale, LinearScale, PointElement, BarElement, BarController, Legend,  Tooltip} from 'chart.js';
import {getColour} from "@/helpers";
Chart.register(BarController, CategoryScale, LinearScale, PointElement, BarElement, Legend, Tooltip);

it('gets rendered to DOM.', () => {
  const wrapper = defineComponent({
    components: { ForgeChart },
    
    computed: {
      chartConfig() {
        return {
          type: 'bar',
          data: {
            labels: ['Monday', 'Tuesday', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: getColour('brand')
              },
              {
                label: 'My Second Dataset',
                data: [50, 12, 46, 63, 56, 55, 40],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: getColour('primary')
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip : {
                enabled : true
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart'
              }
            }
          }
        };
      }
    },
    
    template: `
        <div>
          <forge-chart :chart-config="chartConfig" />
        </div>`
  });
  mount(wrapper as any)
  cy.get('canvas').should('exist');
});