const FLIP = 'FLIP';

const FLIP_OVER = 'FLIP OVER';

const CHOICE = 'CHOICE';

const CARD_CLICK = 'CARD CLICK';

const TOP_RIGHT_CLICK = 'TOP RIGHT CLICK';

let koloda = [];
for (var i = 1; i < 5; i++) {
  for (var j = 1; j < 14; j++) {
    koloda.push({mast:i,value:j,back:false,adds:{x:'none',y:'none',z:0}});
  }
}

let random = () => {
  let newKoloda = [];
  let length = koloda.length;
  for (var i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * koloda.length);
    koloda[index].adds.x = i;
    koloda[index].adds.z = 0;
    newKoloda.push(koloda[index]);
    koloda.splice(index, 1);
  }
  koloda = newKoloda;
}

let body = [];
for (var i = 0; i < 7; i++) {
  let bodyNew = [];
  for (var j = 0; j < i+1; j++) {
    let index = Math.floor(Math.random() * koloda.length);
    let card = koloda[index];
    card.adds.x = i;
    card.adds.y = j;
    card.adds.z = 2;
    koloda.splice(index, 1);
    bodyNew.push({...card, back: i != j});
  }
  body.push(bodyNew);
}


// let body = [
//   [{mast:1,value:1,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:0,y:1,z:2}},
// {mast:3,value:3,back:true,adds:{x:0,y:2,z:2}},
// {mast:2,value:2,back:false,adds:{x:0,y:3,z:2}}],
//
// [{mast:1,value:1,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:3,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:3,back:false,adds:{x:1,y:3,z:2}}],
//
// [{mast:1,value:1,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:3,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:1,back:false,adds:{x:2,y:3,z:2}}],
//
// [{mast:2,value:4,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:3,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:5,back:false,adds:{x:3,y:3,z:2}}],
//
// [{mast:6,value:6,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:3,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:6,back:false,adds:{x:4,y:3,z:2}}],
//
// [{mast:1,value:1,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:3,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:4,back:false,adds:{x:5,y:3,z:2}}],
//
// [{mast:1,value:1,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:2,value:2,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:3,value:3,back:true,adds:{x:'none',y:'none',z:2}},
// {mast:4,value:5,back:false,adds:{x:6,y:3,z:2}}]]

random();

let initialState = {
  koloda:koloda,
  kolodaShow:true,
  otboi:[],
  selectedCard:undefined,
  topLeft:[{mast:0,value:0,back:false,adds:{x:0,y:0,z:0}}],
  topRight:[{mast:0,value:0,back:false,adds:{x:0,y:0,z:1}},{mast:0,value:0,back:false,adds:{x:1,y:0,z:1}},
  {mast:0,value:0,back:false,adds:{x:2,y:0,z:1}},{mast:0,value:0,back:false,adds:{x:3,y:0,z:1}}],
  body:body
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case FLIP:{
          let koloda = [...state.koloda];
          let topLeft = [...state.topLeft];
          let otboi = [...state.otboi];
          let kolodaShow = state.kolodaShow;
          if(topLeft.length < 3) {
            if (topLeft[0].mast == 0) {
              topLeft.splice(0, 1);
            }
            koloda[0].adds.x = otboi.length;
            topLeft.push(koloda[0]);
            koloda.splice(0, 1);
          }
          else if(topLeft.length >= 3){
            topLeft[0].adds.x = otboi.length;
            otboi.push(topLeft[0]);
            topLeft[0] = topLeft[1];
            topLeft[1] = topLeft[2];
            topLeft[2] = koloda[0];
            koloda.splice(0, 1);
          }
          for (let i = 0; i < topLeft.length; i++) {
            topLeft[i].adds.y = i;
          }
          if(koloda.length == 0){kolodaShow = false;}
          return {...state, topLeft: topLeft, koloda: koloda,otboi:otboi,kolodaShow:kolodaShow};
        }

//----------------------------------------------------------------------------------------------------------------------------------------
        case FLIP_OVER:{
          let koloda = [...state.koloda];
          let topLeft = [...state.topLeft];
          let otboi = [...state.otboi];
          let kolodaShow = state.kolodaShow;
          for (var i = 0; i < topLeft.length; i++) {
            topLeft[i].adds.x = otboi.length;
            otboi.push(topLeft[i]);
          }
          koloda = otboi;
          otboi = [];
          topLeft = [{mast:0,value:0,back:false,adds:{x:0,y:0,z:0}}];
          kolodaShow = true;
          return {...state, topLeft: topLeft, koloda: koloda,otboi:otboi,kolodaShow:kolodaShow};
        }

//----------------------------------------------------------------------------------------------------------------------------------------

        case CHOICE:{
          let selectedCard = {...state.selectedCard};
          let topLeft = [...state.topLeft];
          selectedCard = action.card;
          return {...state, selectedCard: selectedCard,topLeft:topLeft};
        }
//----------------------------------------------------------------------------------------------------------------------------------------
        case TOP_RIGHT_CLICK:{
          let topLeft = [...state.topLeft];
          let selectedCard = {...state.selectedCard};
          let topRight = JSON.parse(JSON.stringify(state.topRight));
          let body = JSON.parse(JSON.stringify(state.body));
          let oldPossition = {...selectedCard.adds};
          let newPossition = {...action.card.adds};

          if (action.card.value == 0 && selectedCard.value == 1) {
            topRight[newPossition.x] = selectedCard;
            if(selectedCard.adds.z == 0){
              topLeft.splice(oldPossition.y, 1);
            }
            else if (selectedCard.adds.z == 1 && selectedCard.value == 1){
              topRight[oldPossition.x] = {mast:0,value:0,back:false,adds:{x:oldPossition.x,y:0,z:1}};
            }
            else if (selectedCard.adds.z == 1 && selectedCard.value != 1){
              selectedCard.value -= 1;
              topRight[oldPossition.x] = selectedCard;
            }
            else if (selectedCard.adds.z == 2) {
              body[oldPossition.x].splice(oldPossition.y, 1);
              if (body[oldPossition.x].length == 0) {
                body[oldPossition.x].push({mast:0,value:0,back:false,adds:oldPossition});
              }
            }
            topRight[newPossition.x].adds.x = newPossition.x;
            topRight[newPossition.x].adds.y = topRight[newPossition.x].value;
            topRight[newPossition.x].adds.z = 1;
            if(oldPossition.z == 2 && body[oldPossition.x][0].mast != 0){
              body[oldPossition.x][oldPossition.y -1].back = false;
            }
            selectedCard = undefined;
          }

          else if(selectedCard.value  == action.card.value + 1 && selectedCard.mast  == action.card.mast){
            topRight[newPossition.x] = selectedCard;
            if(selectedCard.adds.z == 0){
              topLeft.splice(oldPossition.y, 1);
            }
            else if (selectedCard.adds.z == 2) {
              body[oldPossition.x].splice(oldPossition.y, 1);
              if(body[oldPossition.x].length > 0){
                body[oldPossition.x][oldPossition.y -1].back = false;
              }
              else if (body[oldPossition.x].length == 0) {
                body[oldPossition.x].push({mast:0,value:0,back:false,adds:oldPossition});
              }
            }
            topRight[newPossition.x].adds.x = newPossition.x;
            topRight[newPossition.x].adds.y = topRight[newPossition.x].value;
            topRight[newPossition.x].adds.z = 1;
            selectedCard = undefined;
          }
          else if(selectedCard == undefined || selectedCard.value != action.card.value + 1){
            selectedCard = action.card;
          }
          else {
            alert(JSON.stringify(newPossition));
          }
          if(topLeft.length == 0){
            topLeft.push({mast:0,value:0,back:false,adds:{x:0,y:0,z:0}});
          }
          return {...state, selectedCard: selectedCard, topRight:topRight , body:body , topLeft:topLeft};
        }
//----------------------------------------------------------------------------------------------------------------------------------------
        case CARD_CLICK:{
          let topLeft = [...state.topLeft];
          let topRight = [...state.topRight];
          let selectedCard = {...state.selectedCard};
          let body = JSON.parse(JSON.stringify(state.body));
          let oldPossition = {...selectedCard.adds};
          let newPossition = {...action.card.adds};
          newPossition.y ++;


          if(state.selectedCard == undefined){
            selectedCard = action.card;
          }

//------------------------------------------------------


          else if (state.selectedCard.adds.z == 0 && action.card.adds.y == body[newPossition.x].length-1 && action.card.mast != 0) {
            if(selectedCard.value == action.card.value -1 && action.card.adds.y == body[action.card.adds.x].length-1){
              body[newPossition.x].push(selectedCard);
              topLeft.splice(state.selectedCard.adds.y , 1);
              body[newPossition.x][newPossition.y].adds.x = newPossition.x;
              body[newPossition.x][newPossition.y].adds.y = newPossition.y;
              body[newPossition.x][newPossition.y].adds.z = 2;
              selectedCard = undefined;
              if(topLeft.length == 0){
                topLeft.push({mast:0,value:0,back:false,adds:{x:0,y:0,z:0}});
              }
            }
            else {
              selectedCard = action.card;
            }
          }

//--------------------------------------------------------

          else if (state.selectedCard.adds.x == action.card.adds.x) {
            selectedCard = action.card;
          }

//--------------------------------------------------------
          else if (selectedCard.value == action.card.value -1){
            if (selectedCard.value == action.card.value -1 && action.card.adds.y == body[action.card.adds.x].length-1) {
              if (((selectedCard.mast == 1 || selectedCard.mast == 2) && (action.card.mast == 3 || action.card.mast == 4))||
              ((selectedCard.mast == 3 || selectedCard.mast == 4) && (action.card.mast == 1 || action.card.mast == 2))) {

                if(selectedCard.adds.z == 1){
                  body[newPossition.x].push(selectedCard);
                  topRight[selectedCard.adds.x].value -= 1;
                  selectedCard = undefined;
                  action.card.value -= 1;
                  return {...state, selectedCard: selectedCard, body:body, topLeft:topLeft, topRight:topRight};
                }

                body[newPossition.x].push(body[oldPossition.x][oldPossition.y]);
                body[newPossition.x][newPossition.y].adds.x = newPossition.x;
                body[newPossition.x][newPossition.y].adds.y = newPossition.y;
                body[oldPossition.x].splice(oldPossition.y, 1);

                let y = newPossition.y+1;
                let x = newPossition.x;
                let i = 1;
                while(body[oldPossition.x].length > oldPossition.y){
                  body[newPossition.x].push(body[oldPossition.x][oldPossition.y]);
                  body[newPossition.x][newPossition.y+i].adds.x = x;
                  body[newPossition.x][newPossition.y+i].adds.y = y;
                  body[oldPossition.x].splice(oldPossition.y,1);
                  y++;
                  i++;
                }

                if(body[oldPossition.x].length > 0){
                  body[oldPossition.x][oldPossition.y -1].back = false;
                }
                else if (body[oldPossition.x].length == 0) {
                  body[oldPossition.x].push({mast:0,value:0,back:false,adds:oldPossition});
                }

                selectedCard = undefined;
              }
              else {
                selectedCard = action.card;
              }
            }

            else {
              selectedCard = action.card;
            }
          }
//------------------------------------------------
          else if (action.card.adds.z == 2 && action.card.mast == 0) {
            if(selectedCard.value == 13 && selectedCard.adds.z == 2){
              body[newPossition.x].splice(0,1);

              body[newPossition.x].push(body[oldPossition.x][oldPossition.y]);
              body[newPossition.x][0].adds.x = newPossition.x;
              body[newPossition.x][0].adds.y = newPossition.y;
              body[oldPossition.x].splice(oldPossition.y, 1);

              let i = 1;
              while(body[oldPossition.x].length > oldPossition.y){
                body[newPossition.x].push(body[oldPossition.x][oldPossition.y]);
                body[newPossition.x][0+i].adds.x = newPossition.x;
                body[newPossition.x][0+i].adds.y = i;
                body[oldPossition.x].splice(oldPossition.y,1);
                i++;
              }

              if(body[oldPossition.x].length > 0){
                body[oldPossition.x][oldPossition.y -1].back = false;
              }
              else if (body[oldPossition.x].length == 0) {
                body[oldPossition.x].push({mast:0,value:0,back:false,adds:oldPossition});
              }

              selectedCard = undefined;
            }


            else if (selectedCard.value == 13 && selectedCard.adds.z == 0) {
              body[newPossition.x].splice(0,1);
              body[newPossition.x].push(selectedCard);
              topLeft.splice(state.selectedCard.adds.y , 1);
              body[newPossition.x][0].adds.x = newPossition.x;
              body[newPossition.x][0].adds.y = 0;
              body[newPossition.x][0].adds.z = 2;
              alert(JSON.stringify(body[newPossition.x]));
              selectedCard = undefined;
              if(topLeft.length == 0){
                topLeft.push({mast:0,value:0,back:false,adds:{x:0,y:0,z:0}});
              }
            }
          }

//------------------------------------------------
          else {
            selectedCard = action.card;
          }
          return {...state, selectedCard: selectedCard, body:body, topLeft:topLeft};
        }

        default:
          return state;
      }
}

//-----------------------------------------------------------------------------------

export const flip = () =>  ({ type: FLIP });

export const flipOver = () =>  ({ type: FLIP_OVER });

export const choice = (card) =>  ({ type: CHOICE , card:card});

export const cardClick = (card) =>  ({ type: CARD_CLICK , card:card});

export const topRightClick = (card) =>  ({ type: TOP_RIGHT_CLICK , card:card});

export default Reducer;
