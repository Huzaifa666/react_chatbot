import React, {Component} from 'react';
import './dashboard.css';
import { Route, Link } from 'react-router-dom';
import candidateInfo from "../Candidate/candidateInfo";
import { Table, Tr } from 'styled-table-component';
import {Pie} from "react-chartjs-2";

class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            error:null,
            isLoaded: false,
            candidates:{}
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/dashboard")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        candidates: result.candidates
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
       /* const candidates = {V712139:'Selected', V712111:'Rejected'};
        this.setState({
            isLoaded: true,
            candidates: candidates
        });*/
    }

    render() {
        const { error, isLoaded, candidates } = this.state;
        const candidateList = Object.keys(candidates).map((key)=> {
            return { [key]: candidates[key] };
         });
        const pieData1 = {
            labels: [
                'Cannot Decide',
                'Candidates Selected',
                'Candidates Rejected',
            ],
            datasets: [{
                data: [62, 35, 162],
                backgroundColor: [
                    '#BB8FCE',
                    '#FFCE56',
                    '#1ABC9C'
                ],
                hoverBackgroundColor: [
                    '#BB8FCE',
                    '#FFCE56',
                    '#1ABC9C'
                ]
            }],
        };
        const pieData2 = {
            labels: [
                'Conducted',
                'Remaining',
            ],
            datasets: [{
                data: [10, 7],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }],
        };

        const options={
            legend:{
                labels:{
                    fontColor:'white'
                }
            }
        };

        if (error) {
            return <div class="main-dashboard-container">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="main-dashboard-container">
                    <div className="dashboard-header"><h1>tIA Dashboard</h1></div>
                    <div className="dashboard-pie">
                        <div className="pie-1"><Pie data={pieData1} height={100} width={300} options={options}/></div>
                        <div className="pie-2"><Pie data={pieData2} height={100} width={300} options={options}/></div>
                    </div>
                    <br/>
                    <div className="dashboard-pie">
                        <div className="pie-1 stats-label">Overall Statistics</div>
                        <div className="pie-2 stats-label">Today's Statistics</div>
                    </div>
                    <br/>
                    <Table>
                        <thead>
                        <tr>
                            <th className="col-header" scope="col">Candidate Id</th>
                            <th className="col-header" scope="col">Status</th>
                            <th className="col-header" scope="col">Conducted On</th>
                            <th className="col-header" scope="col">Interview Duration(Min)</th>
                        </tr>
                        </thead>
                        <tbody>
                            {candidateList.map(candidate => (
                                <Tr active key={Object.keys(candidate)[0]}>
                                <td className = "padding-left"><Link to={`/candidates/${Object.keys(candidate)[0]}`}>{Object.keys(candidate)[0]}</Link></td>
                                <td className = "padding-left">{candidate[Object.keys(candidate)[0]]}</td>
                                    <td className = "padding-left"> 21/02/2020</td>
                                    <td className = "padding-left text-align-class">{ Math.floor(Math.random() * (20)) + 10}</td>
                            </Tr>
                            ))}
                        </tbody>
                        <Route path="/candidates/:cid" component={candidateInfo} />
                    </Table>
                </div>
            );
        }
    }
}

export default Dashboard;