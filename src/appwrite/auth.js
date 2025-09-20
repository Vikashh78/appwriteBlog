import config from "../config/config";
import {Client, Account, ID} from "appwrite"; 

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client);
    }


    //Sign Up
    async createAccount({email, password, name}) {
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                //called another method()
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    /*
    async = If you put async before a function, that function will always return a Promise, no matter what.
    await = "Pause here until the Promise finishes, then give me the result."

    Also, alternative of async await are .then(), .catch()
    */

    //Log In
    async login({email, password}) {
        try {
            // Incorrect: Passing one object {email, password}
            return await this.account.createEmailPasswordSession({email, password}) 
        } catch (e) {
            throw e;
        }
    }

    //current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // If it fails (e.g., user not logged in), log the error for debugging
            // but return null so the app knows there's no user.
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    //Log Out
    async deleteSession() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            
        }
    }

}


const authservice = new AuthService();

export default authservice;