export default function (state = {}, action) {
   switch (action.type) {
   case 'GOAL_CREATE':
      return {
         ...state,
         loading: action.loading,
      };
   case 'SUCCESS_GOAL_CREATE':
      console.log('woah it fucking worked');
      console.log(action.payload);
      return {
         ...state,
         redirect: true,
      };
   case 'ERROR_GOAL_CREATE':
      console.log('nah it didn\'t fucking work');
      console.log(action.payload);
      return {
         ...state,
         error: action.payload.error,
      };
   case 'GOALS_LOADED':
      // console.log(JSON.parse(action.payload.list.result));
      return {
         ...state,
         goals: action.payload.results,
         list: JSON.parse(action.payload.list.result),
      };
   default:
      return state;
   }
}
