import firebase from 'firebase/app'

export default {
    actions:{
       async createCategory({commit, dispatch}, {title, limit}) {

        try {
            // получаем id
        const uid = await dispatch('getUid')

        // добавляем в бд в нужный id , title и limit
       const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
        return {title, limit,  id: category.key}
    } catch(e) {
            commit('setError',e)
            throw e
        }

        }
    }
}