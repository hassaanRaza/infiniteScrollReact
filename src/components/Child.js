import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

class Child extends Component {
    constructor() {
        super();

        this.state = {
            limit: 20,
            hasMore: true,
            data:[]
            
        }
    }

    getPosts() {
        const { limit } = this.state;
        return new Promise((res, rej) => {
            fetch(`https://randomuser.me/api/?results=${limit}`)
                .then(response => response.json())
                .then(json => res(json))
        })
    }

    componentDidMount(){
        const { limit} = this.state;
        this.getPosts().then(res => {
            console.log(res.results);
            this.setState({ limit: limit + 20, data:res.results });
        });
    }

    fetchMoreData = () => {
        const { limit, data } = this.state;
        if (data.length >= 200) {
            this.setState({ hasMore: false });
            return;
        }
        this.getPosts().then(res => {
            console.log(res.results);
            this.setState({ limit: limit + 20, data:res.results });
        });
    };

    render() {
        const {data, hasMore } = this.state;
        return (
            <div>

                <h1>Demo: react-infinite-scroll-component - Get data from api..</h1>
                <hr />
                <InfiniteScroll
                    dataLength={data.length}
                    next={this.fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {
                        
                        data.map((i, index) => (
                         <div style={style} key={index}>
                            {index}. {i.name.title} {i.name.first} {i.name.last} 
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default Child;