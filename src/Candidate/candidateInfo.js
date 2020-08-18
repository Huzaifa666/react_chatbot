import React, {Component} from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const graphStyle = {
    background: '#F1F1F7',
    display: 'flex',
    width:'100%',
    marginTop:'15px',
    height:'555px'
};

const barGraphStyle = {
    background: '#F1F1F7',
    width:'50%'
};

const pieGraphStyle={
    background: '#F1F1F7',
    width:'50%'
};
const mainContainerGraph={
    height:'100%'
};
const headingSty={
  margin:'auto',
  textAlign:'center',
  background:'#FFCE56'
};
class CandidateInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            error:null,
            isLoaded: false,
            dataPoints:{}
        };
    }

    componentDidMount() {
        const data = { 'cid': this.props.match.params.cid };
        fetch("http://127.0.0.1:5000/graph", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json())
              .then(
                  (result) => {
                      this.setState({
                          isLoaded: true,
                          dataPoints: result.graph
                      });
                  },
                  (error) => {
                      this.setState({
                          isLoaded: true,
                          error
                      });
                  }
              )
      }

    render() {
        const { error, isLoaded, dataPoints } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
        const data = {
            labels: ['P1', 'P2', 'P3', 'P4'],
            datasets: [
               {
                    label: 'Correct Answers',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    barThickness: 50,
                    maxBarThickness: 50,
                    minBarLength: 2,
                    data: [dataPoints.P1_correct, dataPoints.P2_correct, dataPoints.P3_correct, dataPoints.P4_correct]
                },
                {
                    label: 'Wrong Answers',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    barThickness: 50,
                    maxBarThickness: 50,
                    minBarLength: 2,
                    data: [dataPoints.P1_incorrect, dataPoints.P2_incorrect, dataPoints.P3_incorrect, dataPoints.P4_incorrect]
                },

            ],
            options: {
                title: {
                    display: true,
                    text: "Candidate Performance Graph"
                },
                yAxis:{
                    display:true,
                  interval:1
                },
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                                beginAtZero:true,
                                min: 0,
                                max: 10
                            }
                        }]
                },
            }
        };
        const pieData = {
            labels: [
                'Core Java',
                'Java8',
                'Spring'
            ],
            datasets: [{
                data: [2, 3, 2],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }],
            };
        return(
            <div style={mainContainerGraph}>
                <h1 style={headingSty}>Interview Metrics</h1>
                <div style={graphStyle}>
                    <div style={barGraphStyle}>
                        <Bar
                            ref="chart"
                            height={100}
                            width={150}
                            data={data} options={data.options}
                            onElementsClick={elems => {
                                console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
                               /* window.location = "https://www.google.com";*/
                               /* <Route path="/candidates/:cid/" component={candidateInfo} />*/
                            }}/>
                    </div>
                    <div style={pieGraphStyle}>
                        <Pie data={pieData} height={150} width={250}/>
                    </div>
                </div>
            </div>
        );
        }
    }
}

export default CandidateInfo;