import { assert } from 'chai';
import Block from './Block';

class TestBlock extends Block {
    render(): string {
        return 'mock html';
    }
}

const block = new TestBlock({ tagName: 'span' });

// eslint-disable-next-line no-undef
describe('Проверка компонента Block', () => {
    // eslint-disable-next-line no-undef
    it('При рендере назначается нужный tag', () => {
        assert.equal(block.element.tagName, 'SPAN');
    });

    // eslint-disable-next-line no-undef
    it('При рендере правильное содержимое', () => {
        assert.equal(block.element.innerHTML, 'mock html');
    });
});
