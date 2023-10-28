import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  // articles = [
  //   {
  //     source: {
  //       id: "bbc-sport",
  //       name: "BBC Sport",
  //     },
  //     author: null,
  //     title:
  //       "'It's hitting leg stump - Bairstow should have been out first ball!'",
  //     description:
  //       "England's Jonny Bairstow survives a first-ball scare as Sri Lanka choose not to review a potential lbw that was going on to hit the stumps during their Cricket World Cup game in Bangalore.",
  //     url: "http://www.bbc.co.uk/sport/av/cricket/67227001",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/news/1024/cpsprodpb/12C85/production/_131533967_p0gnw81g.jpg",
  //     publishedAt: "2023-10-26T09:22:15.3101471Z",
  //     content:
  //       "England's Jonny Bairstow survives a first-ball scare as Sri Lanka choose not to review a potential lbw that was going on to hit the stumps during their Cricket World Cup game in Bangalore.\r\nFOLLOW: S… [+46 chars]",
  //   },
  //   {
  //     source: {
  //       id: "bbc-sport",
  //       name: "BBC Sport",
  //     },
  //     author: null,
  //     title:
  //       "England face Sri Lanka in crucial World Cup match - clips, radio & text",
  //     description:
  //       "Follow live text, in-play video clips and radio commentary as England play Sri Lanka in the Men's Cricket World Cup 2023.",
  //     url: "http://www.bbc.co.uk/sport/live/cricket/66858549",
  //     urlToImage:
  //       "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png",
  //     publishedAt: "2023-10-26T08:22:22.2012419Z",
  //     content:
  //       'England captain Jos Buttler: "We\'ve done enough talking, it is about performing today and if we play to our potential we know we are a good team.\r\n"We stay very level as a group. There is some frustr… [+386 chars]',
  //   },
  //   {
  //     source: {
  //       id: "espn-cric-info",
  //       name: "ESPN Cric Info",
  //     },
  //     author: null,
  //     title:
  //       "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     description:
  //       "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     publishedAt: "2020-04-27T11:41:47Z",
  //     content:
  //       "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
  //   },
  //   {
  //     source: {
  //       id: "espn-cric-info",
  //       name: "ESPN Cric Info",
  //     },
  //     author: null,
  //     title:
  //       "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     description:
  //       "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     publishedAt: "2020-03-30T15:26:05Z",
  //     content:
  //       "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //   },
  // ];
  constructor() {
    super();
    //console.log("Hello I am a constructor from News component");

    this.state = {
     // articles: this.articles,
     articles:[],
      loading: false,
      page:1,
    };
  }

  async componentDidMount() {
    //console.log("cdm")
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=95ab57f4a45d4ec89152103b4b89b35f&pageSize=21";

    let data = await fetch(url);
    let parsedData = await data.json();

    //console.log(parsedData);
    this.setState({ articles: parsedData.articles , totalResults: parsedData.totalResults });
  }

   handleNextClick = async ()=>{
    //console.log("next")
    if(this.state.page+1 > Math.ceil(this.state.totalResults/21)){

    }
    else{ let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=95ab57f4a45d4ec89152103b4b89b35f&page=${this.state.page+1}&pageSize=21`;

    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      page:this.state.page+1,
    })
  }

  }

   handlePrevClick = async()=>{
    //console.log("prev")
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=95ab57f4a45d4ec89152103b4b89b35f&page=${this.state.page-1}&pageSize=21`;

    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      page:this.state.page-1,
    })
  }

  render() {
    //console.log("render");
    return (
      <div className="container my-3 ">
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row my-2">
          {this.state.articles.map((element) => {
            // console.log(element)
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title: ""}
                  description={
                    element.description ? element.description: ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      :"https://www.astronomy.com/wp-content/uploads/sites/2/2023/10/2_GianniTumino_seq200mm_JPG_3500pix.jpg?fit=3500%2C2333"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick = {this.handlePrevClick}>&larr; Previous</button>
        <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/21)} type="button" className="btn btn-dark" onClick = {this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    );
  }
}