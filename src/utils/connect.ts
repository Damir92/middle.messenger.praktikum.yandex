import store, { Indexed, StoreEvents } from '../services/store';
import Block from './Block';

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed): typeof Block {
    return class extends Component {
        constructor(props: any) {
            super({ ...mapStateToProps(store.getState()), ...props });

            store.on(StoreEvents.Updated, () => {
                this.setProps({ ...mapStateToProps(store.getState()) });
            });
        }
    }
}
