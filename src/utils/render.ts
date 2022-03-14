import Block from './Block';

export const render = (query: string, block: Block) => {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(block.getElement());
    }

    return root;
};
