import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import ReCAPTCHA from "react-google-recaptcha";
class App extends Component {
    constructor() {
        super();
        this.state = {
            showPreloader: true,
            verified: false,
            name: "",
            email: "",
            subject: "",
            message: "",
            responseSubmitted: false,
        };
        this._reCaptchaRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCaptchaResponse = this.handleCaptchaResponse.bind(this);
    }
    handleCaptchaResponse = (recaptchaToken) => {
        this.setState({ verified: true });
        console.log(recaptchaToken)
    }

    componentDidMount() {
        this.setState({ showPreloader: false })
    }
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        const recaptchaValue = this._reCaptchaRef.current.getValue();
        if (recaptchaValue) {
            const recaptchaValue = this._reCaptchaRef.current.getValue();
            let data = { name: this.state.name, email: this.state.email, subject: this.state.subject, message: this.state.message, token: recaptchaValue };
            console.log(data);
            this.submitForm(data).then(res => {
                this.setState({ responseSubmitted: true });
                this.setState({ formState: res.success });
                this.setState({ formResponse: res.message });
            });
        }
        event.preventDefault();
    }

    async submitForm(data) {
        const response = await fetch('/api/contact', {
            method: 'POST', // or 'PUT'
            json: true,
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const content = await response.json();
        return content
    }

    render() {
        return (
            <div className="App">
                <div id="main-wrapper">
                    <div id="preloader" className={this.state.showPreloader ? '' : 'hidePreloader'}>
                        <div id="status">
                            <div className="status-mes"></div>
                        </div>
                    </div>
                    <div className="columns-block">
                        <div className="left-col-block blocks">
                            <header className="header">
                                <div className="content text-center">
                                    <h1>Hi, I'm Majid Hussain!</h1>

                                    <p className="lead">Software Engineer (Web Applications)</p>
                                    <ul className="social-icon">
                                        <li><a href="https://www.facebook.com/majidkorai"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href="https://twitter.com/majidkorai"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                        <li><a href="https://www.instagram.com/majidkorai/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/majidkorai"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                        <li><a href="https://medium.com/@majidkorai"><i className="fa fa-medium" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                                <div className="profile-img"></div>
                            </header>
                        </div>
                        <div className="right-col-block blocks">
                            <section className="intro section-wrapper">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="section-title">
                                                <h2>What I am all about.</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <p>
                                                I am a passionate Software Engineer (Web Developer), crazy about the web technologies.
                                                I started my career back in 2008, creating web based applications using ASP.NET / C#.
                                            </p>
                                            <p>
                                                My love with Javascript and availability of NodeJS and Javascript frameworks like Angular and React made me switch to pure Javascript programming.
                                            </p>
                                            <p>
                                                Currently I work as Front-end Developer and develop applications using Angular JS and React JS.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <section className="expertise-wrapper section-wrapper gray-bg">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="section-title">
                                                <h2>Expertise</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="expertise-item">
                                                <h3>Quick Learner</h3>

                                                <p>
                                                    I am research oriented and always learn and adapt the new technologies very quickly.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="expertise-item">
                                                <h3>Team Player </h3>

                                                <p>
                                                    Communicate effeciently within the team, listen carefully, participate actively, flexible and share willingly.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="expertise-item">
                                                <h3>Disciplined</h3>

                                                <p>
                                                    Be part of the process, do not sacrifice quality over speed. Always stay focused.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="expertise-item">
                                                <h3>Problem Solver</h3>

                                                <p>
                                                    Analyze and identify the problem. Do lots of research. Make a clear plan and execute it properly. </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </section>


                            <section className="section-wrapper skills-wrapper">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="section-title">
                                                <h2>Skills</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="progress-wrapper">

                                                <div className="progress-item">
                                                    <span className="progress-title">Javascript (Angular / React)</span>

                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                            aria-valuenow="90"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100" style={{ width: '90%' }}><span
                                                                className="progress-percent"> 90%</span>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="progress-item">
                                                    <span className="progress-title">ASP.NET / C#</span>

                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                            aria-valuenow="85"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100" style={{ width: '85%' }}><span
                                                                className="progress-percent"> 85%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="progress-item">
                                                    <span className="progress-title">Database (SQL / NoSQL)</span>

                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                            aria-valuenow="80"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100" style={{ width: '80%' }}><span
                                                                className="progress-percent"> 80%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="progress-item">
                                                    <span className="progress-title">Version Control and Source-Code management</span>

                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                            aria-valuenow="85"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100" style={{ width: '85%' }}><span
                                                                className="progress-percent"> 85%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="progress-item">
                                                    <span className="progress-title">Project Management</span>

                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                            aria-valuenow="75"
                                                            aria-valuemin="0"
                                                            aria-valuemax="100" style={{ width: '75%' }}><span
                                                                className="progress-percent"> 75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="section-wrapper section-experience gray-bg">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="section-title"><h2>Work Experience</h2></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="content-item">
                                                <small>2017 - Present</small>
                                                <h3>Software Engineer (Front-end)</h3>
                                                <h4>Tajawal</h4>

                                                <p>Dubai, United Arab Emirates</p>
                                            </div>
                                            <div className="content-item">
                                                <small>2015 - 2017</small>
                                                <h3>Software Engineer</h3>
                                                <h4>e-SoftSAT</h4>

                                                <p>Dubai, United Arab Emirates</p>
                                            </div>
                                            <div className="content-item">
                                                <small>2013 - 2015</small>
                                                <h3>Sitefinity Solutions Developer (.NET)</h3>
                                                <h4>Prototype Interactive</h4>

                                                <p>Dubai, United Arab Emirates</p>
                                            </div>
                                            <div className="content-item">
                                                <small>2011 - 2013</small>
                                                <h3>Senior Software Engineer</h3>
                                                <h4>Masterkey Computer Systems</h4>

                                                <p>Karachi, Pakistan</p>
                                            </div>
                                            <div className="content-item">
                                                <small>2008 - 2011</small>
                                                <h3>Applications Developer</h3>
                                                <h4>Gettech Solutions</h4>

                                                <p>Karachi, Pakistan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </section>

                            <section className="section-wrapper section-education">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="section-title"><h2>Education</h2></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="content-item">
                                                <small>2004 - 2008</small>
                                                <h3>BS (Computer Science)</h3>
                                                <h4>Quaid-e-Awam University of Engineering, Science and Technology</h4>

                                                <p>Nawabshah, Pakistan</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </section>

                            <section className="section-contact section-wrapper gray-bg">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="section-title">
                                                <h2>Contact</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <address>
                                                <strong>Address</strong><br />
                                                605, 6th Floor, Building 2582<br />
                                                Muwaileh Commercial, Sharjah<br />
                                                United Arab Emirates
                                            </address>
                                            <address>
                                                <strong>Phone Number</strong><br />
                                                +971 52 9904 508
                                            </address>

                                            <address>
                                                <strong>Email</strong><br />
                                                <a href="mailto:#">majidkorai@yahoo.com</a>
                                            </address>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="feedback-form">
                                                <h2>Get in touch</h2>
                                                {
                                                    this.state.responseSubmitted ?
                                                        (
                                                            this.state.formState ?
                                                                <div className="label label-success">{this.state.formResponse}</div>
                                                                :
                                                                <div className="label label-danger">{this.state.formResponse}</div>
                                                        )
                                                        :
                                                        <form onSubmit={this.handleSubmit} >
                                                            <div className="form-group text-left">
                                                                <label htmlFor="InputName">Name</label>
                                                                <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required="" className="form-control" id="InputName"
                                                                    placeholder="Full Name">
                                                                </input>
                                                            </div>
                                                            <div className="form-group text-left">
                                                                <label htmlFor="InputEmail">Email address</label>
                                                                <input type="email" value={this.state.email} onChange={this.handleChange} name="email" required="" className="form-control" id="InputEmail"
                                                                    placeholder="Email"></input>
                                                            </div>
                                                            <div className="form-group text-left">
                                                                <label htmlFor="InputSubject">Subject</label>
                                                                <input type="text" value={this.state.subject} onChange={this.handleChange} name="subject" className="form-control" id="InputSubject"
                                                                    placeholder="Subject"></input>
                                                            </div>
                                                            <div className="form-group text-left">
                                                                <label htmlFor="message-text" className="control-label">Message</label>
                                                                <textarea value={this.state.message} onChange={this.handleChange} className="form-control" rows="4" required="" name="message" id="message-text"
                                                                    placeholder="Write message"></textarea>
                                                            </div>
                                                            <div className="form-group">
                                                                <ReCAPTCHA ref={this._reCaptchaRef} sitekey="6LcEWHUUAAAAAEUlQfuVagauZcvuM7ZgppDDZjDz" />
                                                            </div>
                                                            <button type="submit" className="btn btn-primary">Submit</button>
                                                        </form>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <footer className="footer">
                                <div className="copyright-section">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-12">
                                                &copy; Copyright 2018
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
