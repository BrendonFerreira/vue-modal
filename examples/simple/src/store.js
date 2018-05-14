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
					state.list.push( content )
				}
			},
			actions: {
				create( { commit }, content ) {
					commit( 'CREATE_SUCCESS', content )
				}
			}
		}
	}
}