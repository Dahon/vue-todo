import { createStore } from 'vuex'

const store = createStore({
    state: {
        todos: [
            {
                id: 1,
                name: 'Groceries',
                data: [
                    {
                        id: 1,
                        title: 'ToDo App with Vue 3 Composition API ToDo App with Vue 3 Composition API',
                        status: 'todo',
                        updated: '01.01.21 00:00'
                    },
                    {
                        id: 2,
                        title: 'ToDo App with Vue 3 Composition API',
                        status: 'done',
                        updated: '01.01.21 00:00'
                    },
                ],
                count: 2
            },
            {
                id: 2,
                name: 'Work',
                status: 'todo',
                data: [],
                count: 0
            },
        ]
    },
    getters: {
        doneTodos: state => id => type => {
            return state.todos.find(todo => todo.id == id)?.filter(list => list.status == type);
        },
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id == id);
        }

    },
    mutations: {
        addList (state, payload) {
            state.todos = [...state.todos, {payload}];
        },

        addTask(state, payload) {
            const item = state.todos.find(todo => todo.id == payload.id);
            item.count++;
            item.data = [...item.data, payload.data];
        },

        updateList(state, payload) {
            state.todos = [
                ...state.todos.filter(todo => todo.id !== payload.id),
                payload
            ];
        },

        updateTask(state, payload) {
            console.log('aaasd', payload);
            const item = state.todos.find(todo => todo.id == payload.id);
            item.data = [
                ...item.data.filter(todo => todo.id !== payload.item.id),
                payload.item
            ];
        },
    
        updateTitle(state, { id, name }) {
            const index = state.todos.findIndex(item => item.id == id);
            state.todos[index] = {...state.todos[index], name};
        },

        initialiseStore(state) {
			if(localStorage.getItem('todos')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('todos')))
				);
			}
		}

    },
    actions: {
        addList({commit}, payload) {
            commit('addList', payload);
        },
        addTask({commit}, payload) {
            commit('addTask', payload);
        },
        updateTask({commit}, payload) {
            commit('updateTask', payload);
        },
        updateList({commit}, payload) {
            commit('updateList', payload);
        },
        updateTitle({commit}, {id, name}) {
            commit('updateTitle', {id, name});
        },
    }
})

store.subscribe((mutation, state) => {
    if(mutation){
        localStorage.setItem('todos', JSON.stringify(state));
    }
 })

export default store