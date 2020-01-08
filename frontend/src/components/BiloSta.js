import React from "react";
import axios from "axios";
import "./componentss.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
export default class BiloSta extends React.Component {
    state = {
        osoba: [],
        id: null,
        osobaPom: [],
        status: "",
        first: "",
        last: "",
        responseAdded: null,
        deleteStatus: ""
    }

    componentDidMount() {
        axios.get(`http://localhost:9090/responsePersons`)
            .then(res => {
                this.setState({ osoba: res.data });
                console.log(this.state.osoba);

            })

    }


    sendOnServer = event => {
        event.preventDefault();
        axios.get("http://localhost:9090/findPersonbyid/",
            {
                params: {
                    id: this.state.id
                }
            }
        )
            .then(res => {
                this.setState({ osobaPom: res.data });
                console.log(this.state.osobaPom);
            })


    }


    deletePerson = event => {
        event.preventDefault();
        axios.delete("http://localhost:9090/deletePersonById/",
            {
                params: {
                    id: this.state.id
                }
            }
        )
            .then(res => {
                this.setState({ status: res.data });
                console.log(this.state.status);

            })
        window.location.reload();
    }


    handleDelete = event => {
        event.preventDefault();
        axios.delete("http://localhost:9090/deleteAll")
            .then(res => {
                this.setState({ deleteStatus: res.data })
                console.log(this.state.deleteStatus);
            })
        window.location.reload();
    }


    deletePersonbyfirstName = event => {
        event.preventDefault();
        axios.delete("http://localhost:9090/deletePersonsByName",
            {
                params: {
                    firstName: this.state.first
                }
            }
        )
            .then(res => {
                this.setState({ status: res.data });
                console.log(this.state.status);

            })
        window.location.reload();


    }

    handleChange = event => {
        this.setState({ id: event.target.value });

    };

    handleInputFirstName = event => {
        this.setState({ first: event.target.value });

    }

    handleInputLastName = event => {
        this.setState({ last: event.target.value })
    }

    addPerson = event => {
        event.preventDefault();
        axios.post("http://localhost:9090/create", null,
            {
                params: {
                    firstName: this.state.first,
                    lastName: this.state.last
                }
            }
        )
            .then(res => {
                this.setState({ responseAdded: res.data });
                console.log(this.state.responseAdded);
                window.location.reload();

            })
        console.log(this.state.first);
        console.log(this.state.last);
    }

    render() {
        return (
            <div>
                <h1>Yo!</h1>
                {
                    this.state.osoba.map((osoba) => (
                        <div className="card-wrapper" data-aos="slide-right" key={osoba.id}>
                            <div className="card">
                                <h1>{osoba.id}</h1>
                                <h1>{osoba.firstName}</h1>
                                <h1>{osoba.lastName}</h1>
                            </div>
                        </div>
                    ))
                }

                <input type="number" value={this.state.tekst} placeholder="Input some number" onChange={this.handleChange}></input>
                <button type="submit" onClick={this.sendOnServer}>Send!</button>
                <button type="submit" onClick={this.deletePerson}>Delete!</button>


                <h3>First Name</h3>
                <input type="text" placeholder="Input your first name here..." onChange={this.handleInputFirstName}></input>
                <h3>Last Name</h3>
                <input type="text" placeholder="Input your last name here..." onChange={this.handleInputLastName}></input>
                <button type="submit" onClick={this.addPerson}>Add!</button>

                <h3>Enter name to delete</h3>
                <input type="text" placeholder="Input your first name here..." onChange={this.handleInputFirstName}></input>
                <button type="submit" onClick={this.deletePersonbyfirstName}>Delete!</button>
                <button type="submit" onClick={this.handleDelete}>Delete All!</button>
                
            </div>
        );
    }
}