export default function(state = {}, action) {
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
         }
      default:
         return state;
   }
}
