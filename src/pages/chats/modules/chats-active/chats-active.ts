import './chats-active.scss';

import { connect } from '../../../../utils/connect';
import store, { Indexed } from '../../../../services/store';

import Block from '../../../../utils/Block';
import { ChatsTop } from '../chats-top/chats-top';
import ChatsMain from '../chats-main/chats-main';

class ChatsActive extends Block {
    private chatsTop: ChatsTop;
    private chatsMain: any;

    constructor() {
        super({});

        this.chatsTop;
        this.chatsMain;
    }

    public renderChat(): void {
        const activeChat = store.getState().activeChat;

        if (activeChat) {
            if (!this.chatsTop) this.chatsTop = new ChatsTop();
            if (!this.chatsMain) this.chatsMain = new ChatsMain({});

            this.renderElement('', this.chatsTop);
            this.renderElement('', this.chatsMain);
        }
    }

    public componentDidMount(): void {
        this.getElement().classList.add('chats__active');

        this.renderChat();
    }

    public componentDidUpdate(): boolean {
        this.renderChat();

        return true;
    }
}

function mapStateToProps(state: Indexed) {
    return {
        activeChat: state.activeChat,
    };
}

export default connect(ChatsActive, mapStateToProps);
