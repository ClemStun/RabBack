const dbName = "radar_a_beats";

module.exports = {

    getFavoris: async function (client, login){

        let retour = [];

        try{

            await client.connect();
            console.log("*** Connected correctly to server ***");

            const db = client.db(dbName);
            const col = db.collection(login);

            retour = await col.find({artiste: /.*/}).toArray();

        }catch(e){
            console.log(e);
        }finally{
            client.close();
        }

        return retour;

    },

    addFavoris: async function (client, login, t, a, l){

        let retour = -1;

        try{

            await client.connect();
            console.log("*** Connected correctly to server ***");

            const db = client.db(dbName);
            const col = db.collection(login);

            await col.insertOne({
                title: t,
                artiste: a,
                link: l
            });

            retour = 1;

        }catch(e){
            console.log(e);
        }finally{
            client.close();
        }

        return retour;

    },

    removeFavoris: async function (client, login, t, a){

	let retour = -1;

	try{

	    await client.connect();
	    console.log("*** Connected correctly to server  ***")
		
	    const db = client.db(dbName);
	    const col = db.collection(login);

	    let nbDel = await col.deleteOne({
		title: t,
		artiste: a
	    })
	
	    if(nbDel.deletedCount > 0){
		retour = 1
	    }

	}catch(e){
	    console.log(e);
	}finally{
	    client.close();
	}

	return retour;

    }

}
