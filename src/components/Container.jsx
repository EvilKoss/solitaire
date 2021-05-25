import React from 'react';
import { connect } from "react-redux";
import Present from './Present';
import {flip,flipOver,cardClick,topRightClick,choice} from './Reducer';

let mapStateToProps = (state) => {
    return {
		kolodaShow: state.koloda.kolodaShow,
    topLeft: state.koloda.topLeft,
		topRight: state.koloda.topRight,
    body: state.koloda.body,
    selectedCard: state.koloda.selectedCard
	}
}

let mapDispatchToProps = {
	flip,flipOver,cardClick,topRightClick,choice
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Present);

export default Container;
