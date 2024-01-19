import { IRole  } from "../interfaces/Role";
import { RoleModel } from "../models/Role";


export async function createRole(data: IRole){
    const role = new RoleModel(data);

    const roleSaved = await role.save();

    if(roleSaved) {

        return { status: 201, message: "Role crée avec succès" }

    }
}

export async function getRoles() {
    return await RoleModel.find({});
}