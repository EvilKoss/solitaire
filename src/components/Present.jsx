import React from 'react';
import style from './Present.module.css';

let mast = ["","черви","бубна","крести","пика"];
let value = ["","A","2","3","4","5","6","7","8","9","10","J","D","K"];



class Present extends React.Component {

  renderCard = (card) => {
    let adds = card.adds;
    let st = style.cards1;
    if(JSON.stringify(card) == JSON.stringify(this.props.selectedCard)){st = style.cards4}
    if(card.back==true){
      return (<div className={style.cards3}></div>);
    }

    else if(card.mast == 0 && card.value == 1){
      return (<div className={style.cards3}>{mast[card.mast]} {value[0]}</div>);
    }


    else if(adds.z == 1){
      if(card.mast == 0){
        return (<div onClick = {() => this.props.topRightClick(card)}   className={style.cards2}></div>);
      }
      else {
        return (<div onClick = {() => this.props.topRightClick(card)}   className={st}>{mast[card.mast]} {value[card.value]}</div>);
      }
    }
    else if(adds.z == 0 && card.value != 0){
      return (<div onClick = {() => this.props.choice(card)}   className={st}>{mast[card.mast]} {value[card.value]}</div>);
    }
    else if(card.mast == 0 && card.value == 0 && adds.z == 1){
      return (<div onClick = {() => this.props.topRightClick(card)}   className={style.cards2}></div>);
    }
    else if (adds.z == 2) {
      if (card.mast != 0) {
        return (<div onClick={() => this.props.cardClick(card)} className={st}>{mast[card.mast]} {value[card.value]}</div>);
      }
      else {
        return (<div onClick={() => this.props.cardClick(card)} className={style.cards2}></div>);
      }
    }
    //return (<div onClick={() => this.props.cardClick(card)} className={st}>{mast[card.mast]} {value[card.value]}</div>);
  }

  render() {

    let strBody = this.props.body.map((column) => {
      return (<div className={style.body2}>{column.map(this.renderCard)}</div>);
    });
    let strTopRight = this.props.topRight.map((column) => {
      return (this.renderCard(column));
    });
    let strTopLeft = this.props.topLeft.map((column) => {
      return (this.renderCard(column));
    });
    let kol = this.props.kolodaShow == true ? (<div onClick={this.props.flip} className={style.cards3}></div>) :
     (<div onClick={this.props.flipOver} className={style.cards2}></div>);

    return (
      <div>
        <div className={style.top}>
          {kol}
          <div className={style.topchik}>
            {strTopLeft}
          </div>
          <div></div>
          {strTopRight}
        </div>
        <div className={style.body}>
          {strBody}
        </div>
      </div>
    )
  }
}

export default Present;
