import {createStore} from 'redux';

const initialState={
  loading:false
}

const rootReducer = (state=initialState,action)=>{
  switch(action.type){
     case 'LOADING':
        return {...state,loading:true}
     case 'DONE_LOADING':
        return {...state,loading:false}
     default:
        return {...state}
  }
}

const Store = createStore(rootReducer);

export default Store;

 