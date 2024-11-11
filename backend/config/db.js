import mongoose from 'mongoose';
export const connectDb =  async ()=>{
    await mongoose.connect('mongodb+srv://prince8574:Prince8574@leadskills.eenmxvr.mongodb.net/').then(()=>console.log("!!!    Db Connected Suceessfully    |||"));

}