import { Router, Request, Response } from "express";
import firebaseApp from "../services/FirebaseConnection";
const route = Router();

route.post('/atividade/nova', (req: Request, res: Response) => {
    var atividade = req.body
    var lastid = 0

    firebaseApp.firestore().collection('atividades').get().then((query) => {
        query.forEach((doc) => {
            if (doc.data().id > lastid) {
                lastid = doc.data().id
            }
        })
        atividade.id = lastid + 1
        
        firebaseApp.firestore().collection('atividades').add(atividade).catch((error) => {
            res.json({ message: error.message });
        }).finally(() => {
            res.json({ message: "Atividade criada com sucesso!" });
        });
    })
})

route.get('/atividade/listar', (req: Request, res: Response) => {
    firebaseApp.firestore().collection('atividades').get().then((querySnapshot) => {
        res.json(querySnapshot.docs.map(doc => doc.data()));
    }).catch((error) => {
        res.json({ message: error.message });
    });
})

route.get('/atividade/lastid', (req: Request, res: Response) => {
    var lastid = 0
    firebaseApp.firestore().collection('atividades').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().id > lastid) {
                lastid = doc.data().id
            }
        })
        res.json({ id: lastid });
    }).catch((error) => {
        res.json({ message: error.message });
    });
})

route.delete('/atividade/deletar/:id', (req: Request, res: Response) => {
    var id = req.params.id
    firebaseApp.firestore().collection('atividades').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().id == id) {
                firebaseApp.firestore().collection('atividades').doc(doc.id).delete().catch((error) => {
                    res.json({ message: error.message });
                }).finally(() => {
                    res.json({ message: "Atividade deletada com sucesso!" });
                });
            }
        })
    }).catch((error) => {
        res.json({ message: error.message });
    })
})

route.put('/atividade/editar/:id', (req: Request, res: Response) => {
    var id = req.params.id
    var atividade = req.body
    firebaseApp.firestore().collection('atividades').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().id == id) {
                firebaseApp.firestore().collection('atividades').doc(doc.id).update(atividade).catch((error) => {
                    res.json({ message: error.message });
                }).finally(() => {
                    res.json({ message: "Atividade editada com sucesso!" });
                });
            }
        })
    }).catch((error) => {
        res.json({ message: error.message });
    })
})

export default route;