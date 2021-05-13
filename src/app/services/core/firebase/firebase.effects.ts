@Effect()
FetchEvents$: Observable<Action> = this.actions$.ofType(actions.FETCH_EVENTS) // filtering actions
.switchMap(() => this.firebaseService.items
.do((payload) => new actions.FetchEventsSuccess(payload))
);