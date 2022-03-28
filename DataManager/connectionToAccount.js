const dbName = "radar_a_beats";

module.exports = {

  connectionToAccount: async function(client, l, password){

    let ret = -3;

    try{

      await client.connect();
      console.log("*** Connected correctly to server ***");

      const db = client.db(dbName);
      const col = db.collection("accounts");

      const exist = await col.findOne({login: l});

      if(exist != null){

        if(exist.pw == password){
          ret = 1;
        }else{
          ret = -1;
        }

      }else{
        ret = -2
      }
      

    }catch(e){
      console.log(e);
    }finally{
      await client.close();
    }
    
    return ret;

  }

}