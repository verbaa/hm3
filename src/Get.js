import React from 'react';
import axios from "axios";

class Get extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoad: false,
            error: null,
            posts: []
        }
    }

    componentDidMount() {
        axios.get("https://60bb880442e1d00017620c95.mockapi.io/Posts/")
            .then(res => {
                const posts = res.data;
                const status = res.status
                let error = status === 200 ? null : `Error. Error code ${status}`;
                this.setState({
                    isLoad: false,
                    error,
                    posts
                })
            })
            .catch((error) => {
                this.setState({
                    error: "Error",
                    isLoad: false,
                    posts: null
                })
            })

        this.setState({
            isLoad: true
        })
    }

    render() {
        let {isLoad, error, posts} = this.state

        return (
            <>
                {isLoad ? (<div>Loadiing..</div>) : (
                    <ol>
                        {
                            error !== null ? (
                                <div>Error {error}</div>
                            ) : ( posts && this.state.posts.map(post => <li key={post.id}>{post.title}</li>)
                            )
                        }
                    </ol>
                )}
            </>
        )
    }
}

export default Get