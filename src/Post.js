import React from 'react';
import axios from "axios";

class Get extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoad: false,
            title: '',
            description: '',
            posts: [],
            editMode: false
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSave = event => {
      this.handleSubmit(event)
        this.handleEdit()
    }
    handleEdit = event => {
        this.setState((prevState) => ({
            editMode: !prevState.editMode
        }))
    }
    handleDelete = (event, id) => {
        event.preventDefault();
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);

                const posts = this.state.posts.filter(item => item.id !== id);
                this.setState({ posts });
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`https://60bb880442e1d00017620c95.mockapi.io/Posts/`, {
            title: this.state.title,
            description: this.state.description,
        })
            .then(res => {
                if (Array.isArray(res.data)) {
                    this.setState({
                        posts: res.data,
                        isLoad: false
                    })
                } else {
                    this.setState({
                        posts: [res.data],
                        isLoad: false
                    })
                }

            })
        this.setState({
            isLoad: true
        })
    }


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="title" onChange={this.handleChange}/>
                        <textarea name="description" onChange={this.handleChange}/>
                    </label>
                    <button type="submit">Add</button>
                    <div>
                        {this.state.posts && this.state.posts.map(post =>
                            this.state.editMode ? (
                                <>
                                    <input value={this.state.title} type="text" name="title"
                                           onChange={this.handleChange}/>
                                    <textarea value={this.state.description} name="description"
                                              onChange={this.handleChange}/>
                                    <button onClick={this.handleSave}>Save</button>
                                </>
                            ) : (
                                <>
                                    <div>{post.title}</div>
                                    <div>{post.body}</div>
                                    <button onClick={this.handleEdit}>Edit</button>
                                    <button onClick={(event) => this.handleDelete(event, post.id)}>Delete</button>
                                </>

                            )
                           )}
                    </div>
                </form>
            </>
        )
    }
}

export default Get