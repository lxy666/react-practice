import React from 'react';
import './App.css';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems: [],
            nowItems: [],
            text: '',
            type: "all",
            id: 0
        }
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let {allItems, text} = this.state;
        if (text === '') {
            return;
        }
        const nextItems = allItems.concat([{text, completed: false, id: this.state.id++}]);
        this.setState({
            allItems: nextItems,
            type: 'all',
            text: ''
        }, this.getData);
    }

    handleTaskDelete(e) {
        const {allItems, nowItems} = this.state
        let items_result = allItems.filter((item, index) => item.id != nowItems[e.target.id].id)
        this.setState({
            allItems: items_result,
        }, this.getData)
    }

    handleSelect(e) {
        const {allItems} = this.state;
        const id = e.target.id;
        allItems[id].completed = !allItems[id].completed;
        this.setState({
            allItems
        })

    }

    resetNowItems(type) {
        this.setState({
            type
        }, this.getData);
    }

    getData() {
        const {allItems, type} = this.state; //从数据池里过滤数据
        let nowItems;
        switch (type) {
            case 'all':
                nowItems = allItems;
                break;
            case 'active':
                nowItems = allItems.filter((item) => item.completed === false)
                break;
            case 'completed':
                nowItems = allItems.filter((item) => item.completed === true)
                break;
        }
        this.setState({
            nowItems
        })
    }

    render() {
        return (
            <div>
                <h3>TODOS</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.onChange.bind(this)} value={this.state.text} type="text"
                           placeholder="what need to be done"/>
                </form>
                <ul>
                    {
                        this.state.nowItems.map((item, index) => (
                            <div key={index} className="header_input">
                                <input id={index} type="checkbox" onClick={this.handleSelect.bind(this)}
                                       checked={this.state.nowItems[index].completed}/>
                                <a className="taskDelete" id={index}
                                   onClick={this.handleTaskDelete.bind(this)}>x</a>
                                <li>{item.text}</li>
                            </div>
                        ))
                    }
                </ul>
                <footer>
                    <ul>
                        <li>{this.state.nowItems.length}</li>
                        <li onClick={this.resetNowItems.bind(this, "all")}>All</li>
                        <li onClick={this.resetNowItems.bind(this, "active")}>Active</li>
                        <li onClick={this.resetNowItems.bind(this, "completed")}>Completed</li>
                    </ul>
                </footer>
            </div>
        );
    }
}

export default TodoApp;