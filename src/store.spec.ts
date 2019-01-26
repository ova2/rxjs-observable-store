import {Store} from './store';

class TestState {
    value = 'initial value';
}

class TestStore extends Store<TestState> {
    constructor() {
        super(new TestState());
    }

    updateState(nextState: TestState): void {
        this.state = nextState;
    }
}

describe('Store', () => {
    let store: TestStore;

    beforeEach(() => {
        store = new TestStore();
    });

    it('should set correct initial state', () => {
        expect(store.state).toEqual({value: 'initial value'});
    });

    it('should correctly update the state when calling state setter', () => {
        store.updateState({value: 'updated value'});
        expect(store.state).toEqual({value: 'updated value'});
    });

    it('should push updated state to subscribers', done => {
        store.updateState({value: 'updated value'});
        store.select(state => state).subscribe(state => {
            expect(state).toEqual({value: 'updated value'});
            done();
        });
    });

    it('should push updated state slice to subscribers', done => {
        store.updateState({value: 'updated value'});
        store.select(state => state.value).subscribe(value => {
            expect(value).toEqual('updated value');
            done();
        });
    });
});
