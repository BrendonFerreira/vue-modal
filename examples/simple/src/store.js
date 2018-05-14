import Vuex from 'vuex'

export default {
	modules: {
		todo: {
			namespaced: true,
			state: {
				list: [],
			},
			getters: {
				list( state ) {
					return state.list
				}
			},
			mutations: {
				'CREATE_SUCCESS'( state , content ) {
					content.id = Math.random().toString(36).substring(7)
					state.list.push( content )
				},
				'UPDATE_SUCCESS'( state , id ) {
					const index = state.list.findIndex( item => item.id === id )
					if( index < 0 ) return
					const item = state.list[index]
					item.completed = !item.completed
					state.list.splice( index, 1, item )					
				}
			},
			actions: {
				create( { commit }, content ) {
					commit( 'CREATE_SUCCESS', content )
				},
				toggle( {commit}, id ) {
					commit('UPDATE_SUCCESS', id )
				}
			}
		}
	}
}