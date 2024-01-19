import { connect} from "mongoose";

export async function mongoConnector(mongo_link: string) {    
    await connect(mongo_link)
    .then(() => console.log("Database connected !"))
    .catch(err => console.log(err));
}           