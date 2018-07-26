import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
    }

    // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        })
        // console.log(e.target.value);
    }

    //handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios.post('/tasks', {
            name: this.state.name
        }).then(response => {
            // console.log('from handle submit ', response);
            // set state
            this.setState({
                tasks: [response.data, ...this.state.tasks],
                name: ''
            });
        });
    }

    // render tasks
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>{task.name}</div>
                </div>
            </div>
        ));
    }

    //get all the tasks from the backend
    getTasks() {
        axios.get('/tasks').then(response =>
            this.setState({
                tasks: [...response.data.tasks]
            })
        );
    }

    // react lifecycle method
    componentWillMount() {
        this.getTasks()
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            placeholder="Create a new task"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                                <hr/>
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
