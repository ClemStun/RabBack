const dbName = "radar_a_beats";

module.exports = {

    insertNewAccount: async function(client, l, password){

        try{

            await client.connect();
            console.log("*** Connected correctly to server ***");

            const db = client.db(dbName);
            const col = db.collection("accounts");

            const exist = await col.findOne({login: l});

            if(exist == null){
                await col.insertOne({login: l, pw: password});
		await db.createCollection(l);
                return 1;
            }else{
                return -1;
            }
            

        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    
    }

}
