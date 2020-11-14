import React from 'react';
import { hot } from 'react-hot-loader';




class DynamicStars extends React.Component {

  constructor(props) {
        super(props);
        const {serverData} = props
        const preDateId = serverData['dateid'];
        const dateId = JSON.parse(preDateId);

        this.state = {
            starsArr: [0,0,0,0,0],
            oldArr: [0,0,0,0,0],
            dateId: dateId,
            clicked: 0
        };  
        
        this.handleStarsHover = this.handleStarsHover.bind(this);
        this.handleStarsClick = this.handleStarsClick.bind(this);
        this.handleStarsLeave = this.handleStarsLeave.bind(this);
        this.buildFeedbackPath = this.buildFeedbackPath.bind(this);
        }

    buildFeedbackPath(){
        return '/feedbacks/'+String(this.state.dateId)
    }
  
    handleStarsHover(event) {
        event.preventDefault();
        let rating = parseInt(event.target.getAttribute("value"))+1;
        let newArr = [];
        while (newArr.length < 5) {
            if (rating > 0) {
                rating--;
                newArr.push(1);
            } else {
                newArr.push(0);
            }
        }
        this.setState({
             starsArr: newArr
        });
    }
  
    handleStarsClick(event,i) {
        event.preventDefault();
        
        
        if (this.state.starsArr == '1,0,0,0,0'){
            this.setState({ clicked: 1});
        }
        if (this.state.starsArr == '1,1,0,0,0'){
            this.setState({ clicked: 2});
        }
        if (this.state.starsArr == '1,1,1,0,0'){
            this.setState({ clicked: 3});
        }
        if (this.state.starsArr == '1,1,1,1,0'){
            this.setState({ clicked: 4});
        }
        if (this.state.starsArr == '1,1,1,1,1'){
            this.setState({ clicked: 5});
        }
        this.setState({
            oldArr: this.state.starsArr,
        });
    }
  
    handleStarsLeave(event) {
        event.preventDefault();
        this.setState({
            starsArr: this.state.oldArr
        });
    }

    render() {
        return (
        <div className= "card">
            <form method="post" action= {this.buildFeedbackPath()} >
        <h1> {this.buildFeedbackPath()} </h1>
        <h1> {this.dateId} </h1>
            
                <div className="field" >
                    <h3>Descripción de la Atención del Dentista</h3>
                    <textarea rows="4" cols="30" name="description" id="description"> </textarea>
                </div>
        
                

                <h3>Calificación</h3>
                {this.state.starsArr.map((item, i) => {
                    return (
                              
                                <div className="single-star-container" value={i} key={i} onMouseOver={this.handleStarsHover} onClick={this.handleStarsClick} onMouseLeave={this.handleStarsLeave}>
                                    <div className="single-star-fill" style={{"width":`${parseInt(item*31)}px`}}>
                                        <img className="single-star-outline" src="https://raw.githubusercontent.com/psfonseka/five-stars/master/dist/star.png" value={i} ></img>
                                    </div>
                                </div>
                    );
                    })}
                    <div className="field" >
                        <input type="hidden" name="calification" id="calification" value={this.state.clicked}/>
                    </div>

{/*                 <div className="field" >
                    <input type="int" name="calification" id="calification" value={i}/>
                </div>
 */}
                <div className="actions" >
                    <input type="submit" value="Crear"/>
                </div>
            </form>
        </div>
      );
    }
  }
  
  export default  hot(module)(DynamicStars);

