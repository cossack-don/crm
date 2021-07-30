import firebase from 'firebase/app'

export default {
    actions:{
        // ________________________________________
        async fetchCategories({commit, dispatch}) {
            try {
                // получаем id
            const uid = await dispatch('getUid')
    
            // получаем категории из firebase 
           const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // ВАРИАНТ №1
        //     const cats = []
        //    Object.keys(categories).forEach(key => {
        //     cats.push({
        //         title:categories[key].title,
        //         limit:categories[key].limit,
        //         id:key
            
        //     })
        //    })
        //    return cats

        // ВАРИАНТ №2
        // Замена варианту, то что сверху 
        return Object.keys(categories).map(key => ({...categories[key], id:key}))
            
        
        } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        // ________________________________________
        // 
        // создание категории
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

        },
        // 
        // ________________________________________
        async updateCategory({commit, dispatch}, {title, limit, id}) {

            try {
                // получаем id
            const uid = await dispatch('getUid')
    
            // update в бд в нужный id , title и limit
           
           await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title,limit})
            
        } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        // 

        async fetchCategoryById({commit, dispatch}, id) {
            try {
                // получаем id
            const uid = await dispatch('getUid')
    
            // получаем категории из firebase 
           const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
  
            return {...category,id}
            
        
        } catch(e) {
                commit('setError',e)
                throw e
            }
        },
    },

}