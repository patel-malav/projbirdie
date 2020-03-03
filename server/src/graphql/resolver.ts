import {Bird} from './bird';

const rootResolver = {
    hello: () => ({
        world: 'Hello World 👋',
        user: 'Hi User 🤘'
    }),
    getBird: ({id}) => {
        return Bird.getByID(id);
    }
}

export default rootResolver;