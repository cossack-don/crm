import firebase from 'firebase/app'

export default {
    actions: {
        // вход на странице auth
        // АВТОРИЗАЦИЯ ПОЛЬЗОВАТЕЛЯ
        async login({ dispatch, commit }, { email, password }) {
            try {
                // проверяем есть ли данный пользователь в firebase email и пароль, совпадают ли
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
        async register({ dispatch, commit }, { email, password, name }) {
            try {
                // создаем почту, пароль и имя для будущей авторизации
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                // получаем uid
                const uid = await dispatch('getUid')
                // добавляем в бд real time database
                await firebase.database().ref(`/users/${uid}/info`).set({ bill: 10000, name },)
            } catch (e) {
                // выдаем ошибку
                commit('setError', e)
                throw e
            }
        },

        // получаем id user из firebase
        getUid() {
            const user = firebase.auth().currentUser;
            // если в юзере есть возвращаем id иначе нулл
            return user ? user.uid : null
        },
        async logout({commit}) {
            // возвращает промис
            // выходим из аккаунта с которого входили
            await firebase.auth().signOut()

            // 
             commit('clearInfo')
        }
    },
}