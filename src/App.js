import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Modal  } from 'semantic-ui-react';
import ArrowKeysReact from 'arrow-keys-react';
import './App.css';
var check='';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { snake: ['3,4', '3,5', '3,6'], target:"6,6",modalOpen:false,count:0,isEnabled:false}
    this.callingSnake = this.callingSnake.bind(this);
    this.arrowKeyHandle = this.arrowKeyHandle.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handleCloseModal=this.handleCloseModal.bind(this);
    this.startNewGame=this.startNewGame.bind(this);
  }
  GridCreation() {
    var rows = [];
    for (var i = 0; i < 16; i++) {
      var cols = [];
      for (var j = 0; j < 16; j++) {
        var cell = (i + 1) + ',' + (j + 1);
        var sn = this.state.snake;
        var s = sn.indexOf(cell);
        var snclass = (s >= 0 ? 'snakeClass' : 'Gridcol');
        if(this.state.target===cell)
        {
          snclass='targetClass'
        }
        var col = (<Grid.Column id={cell} className={snclass}></Grid.Column>);
        cols.push(col);
      }
      var row = (<Grid.Row className='Gridrow'>{cols}</Grid.Row>);
      rows.push(row);
    }
    return (<Grid>{rows}</Grid>);
  }
 startNewGame(){
   clearInterval(this.timerId);
   check='';
  this.setState({snake: ['3,4', '3,5', '3,6'], target:"6,6",modalOpen:false,count:0,isEnabled:false});
 this.callingSnake();
 }
handleCloseModal(){
  this.setState({modalOpen:false});
}
  callingSnake() {
    console.log("callingSnake")
    clearInterval(this.timerId);
    this.setState({isEnabled:true})
   //this.timerId = setInterval(this.right, 200);
  }
  createModal(){
    
     return (<Modal standard size='small' open={this.state.modalOpen}>
    <Header icon='exclamation' content='Game Over' />
    <Modal.Content>
      <p>
        Your game is over, would you like to start a new game?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' inverted onClick={this.handleCloseModal}>
        <Icon name='remove' /> No

      </Button>
      <Button color='green' inverted onClick={this.startNewGame}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>);
  }
  //
  handleKeys(offsetRow, offsetCol) {

     var sn=this.state.snake;
    var val = this.state.snake[this.state.snake.length - 1];
    


    
     var hit=sn.indexOf(val);
    
    if(!(hit!==this.state.snake.length-1 && hit >=0)){
      var ind = val.indexOf(',');
    var row = parseInt(val.substring(0, ind), 10);
    var col = parseInt(val.substring(ind + 1, val.length), 10);
    this.checkboundary(row,col);
    var newCell = (row + offsetRow) + ',' + (col + offsetCol);
    this.state.snake.push(newCell);

    if(newCell!==this.state.target)
    {
      this.state.snake.splice(0, 1);
    }
    
    this.setState({ snake: this.state.snake });
    if(val===this.state.target)
     {
       var tcell=this.foodCreation();
        this.setState({target:tcell, count:this.state.count+1});
     }

  }
  else{
    clearInterval(this.timerId);
    this.setState({modalOpen:true});
  }
  }
  checkboundary(row,col)
  {
    if(row<1||row>16||col<1||col>16)
    {
       clearInterval(this.timerId);
    this.setState({modalOpen:true});
    }
  }
  left() {
    if(check!=='right')
    { console.log("left");
      check='left'
    this.handleKeys(0, -1);
    }
    else 
      {
        this.right();
      }
  }
  right() {
    if(check!=='left')
    { console.log("right");
      check='right'
    this.handleKeys(0, 1);
    }
    else 
     { 
      this.left();
     }
  }

  up() {
    if(check!=='down')
    {  console.log("up");
      check='up'
    this.handleKeys(-1, 0);
    }
  else 
     { 
      this.down();
     }
  }

  down() {
    if(check!=='up')
    {  console.log("down");
      check='down'
    this.handleKeys(1, 0);
    }
    else 
     { 
      this.up();
     }
  }

  handleDirection(method) {
    console.log('handleDirection');
    clearInterval(this.timerId);
    this.timerId = setInterval(method, 200);
  }

  arrowKeyHandle() {
    console.log('arrowKeyHandle')
    ArrowKeysReact.config({
      left: () => {
        this.handleDirection(this.left);
      },
      right: () => {
        this.handleDirection(this.right);
      },
      up: () => {
        this.handleDirection(this.up);
      },
      down: () => {
        this.handleDirection(this.down);
      }
    });
  }
  foodCreation(){
    var row=Math.floor((Math.random() * 16) + 1);
      var col=Math.floor((Math.random() * 16) + 1);
      var cell=row+','+col;
      var sn=this.state.snake;
      var s = sn.indexOf(cell);
      if(s>1)
      {
       

        return this.foodCreation();
        
      }
      return cell;
  }
  render() {
    this.arrowKeyHandle();
    return (
      <div {...ArrowKeysReact.events} tabIndex="1">
        <Container textAlign='center'>
          <h1>Snake Game</h1>
          <p>Press any Arrow key to start a game</p>
           <p>{this.state.count}</p>
          {this.GridCreation()}
          {this.createModal()}
          
           <Button color='green' className='StartButton' onClick={this.startNewGame} size='massive'>Restart</Button>
        </Container>
      </div>
    );
  }
}

export default App;