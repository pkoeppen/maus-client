<template>
  <div class="text-center">
    <line-chart
      :chart-data="chartData"
      :options="chartOptions"
      class="w-full h-64 mb-4"
    ></line-chart>
    <button
      class="mx-auto bg-gray-500 hover:bg-gray-600 text-sm rounded text-white px-3 py-2 font-bold"
      @click="fillData()"
    >
      Randomize
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        legend: { display: false },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: new Array(30).fill('').map((_, n) => {
          const date = new Date(Date.UTC(2020, 0, 1));
          date.setDate(date.getDate() + n);
          return date.toLocaleString().split(',')[0];
        }),
        datasets: [
          {
            label: 'Views',
            stepped: false,
            data: new Array(30).fill(0).map((_, n) => this.randomViews(n)),
            borderColor: '#ef4444',
            fill: false,
          },
        ],
      };
    },
    randomViews(n) {
      return Math.floor(Math.random() * 10000 * n) + n * 1000;
    },
  },
};
</script>
