import { firestore } from "../../firebase/utils";

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('products')
        .doc()
        .set(product)
        .then( () => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    });
}

export const handleFetchProducts = ( { filterType, startAfterDoc, persistProducts=[] } ) => {
    return new Promise((resolve, reject) => {
        const pageSize = 4;

        console.log("filtertype: " + filterType)

        let ref = firestore
        .collection('products')
        .orderBy('createdDate')
        .limit(pageSize);

        if (filterType) ref = ref.where('productCategory', '==', filterType);
        if(startAfterDoc) ref = ref.startAfter(startAfterDoc);
        console.log("old data: ")
        console.log({persistProducts})

        ref
        .get()
        .then((snapshot) => {

            const totalCount = snapshot.docs.length;
            
            const data = [
                ...persistProducts,
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];

            resolve({
                data,
                queryDoc: snapshot.docs[totalCount - 1],
                isLastPage: totalCount < 1
            });
        })
        .catch( err => {
            reject(err);
        })
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('products')
        .doc(documentID)
        .delete()
        .then(() => {
            console.log("radera product")
            resolve()
        })
        .catch(err => {
            reject(err);
        });
    });
}

export const handleFetchProduct = productID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(productID)
            .get()
            .then( snapshot => {
                if(snapshot.exists) {
                    console.log("Jag hittade snus")
                    resolve(
                        snapshot.data()
                    );
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleOrderProducts = order => {

    console.log("nu lägger vi in ordern")

    return new Promise((resolve, reject) => {
        firestore
        .collection('orders')
        .doc()
        .set(order)
        .then( () => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    });

}