export const columnChartOptions: any ={

  chart:{
    type: "column"
  },

  title: {
    text: "Review"
  },

  plotOptions:{
    column:{
      pointPadding: 0.2,
      borderWidth:0
    }
  },
  yAxis:{
    title: {
      text: 'Likes In Percentage'
    }
  },
  xAxis: {
    categories: [
      "poor", "Bad", "Average", "Very Nice", "Great", "Excellent", "Superb", "Awsmmm", "Killer", "No Words"
    ],
    title:{
      text: 'Quality'
    }
  },

  series: [{
    name: 'Customer Review (in %)',
    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  }]
}
