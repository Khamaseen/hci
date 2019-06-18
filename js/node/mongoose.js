const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//SCHEMA 1) LOGIN DATA
const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
})

//SCHEMA 2) USER
const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 15
    },
    category: {
        type: String,
        enum: [ 'post', 'comment' ]
    }
    lastName: String,
    dob: Date,
    doctor: { type: String, default: 'Lancelot' },
    babyName: String,
    babyDob: Date,
    email: String,
    password: String
});

const Users = mongoose.model('users', userSchema);

async function createUser() {
    const user = new Users({
        firstName: 'dennis',
        lastName: 'gijzen',
        dob: new Date(2013, 13, 1),
        doctor: 'coach lyesbeth',
        babyName: 'vincent',
        babyDob: new Date(2014, 12, 2),
        email: 'don@gmail.com',
        password: 'somepassword'
    });
    
    try{
        await user.validate();
        // user.validate((err) => {
        //     if (err) {}
        // })
        // const result = await user.save();
        // console.log(result);
    }
    catch (er) {
        console.log(er.message);
    }
}

async function updateUser(id) {
    // const user = await Users.update({ _id: id }, {
    //     $set: {
    //         lastName : 'Henkie '
    //     }
    // });
    const user = await Users.findById(id);
    if (!user) return;
    user.firstName = " new first name ";
    user.set({
        firstName: " new name "
    });

    const result = await user.save();
    console.log(result);
}

updateUser('5d08d2956f2fc11dae87a226');

async function removeUser(id) {
    const result = await Users.deleteOne( { firstName: 'dennis' });
    const result = await Users.deleteOne( { _id: id});
    const result = await Users.findByIdAndRemove(id);
}

async function getUsers() {
    const users = await Users.find( {firstName: 'dennis'})
        .limit(10)
        .sort({dob: 1})
        .select({ firstName: 1, lastName: 1})
    console.log(users);
}
getUsers();

createUser();


//SCHEMA 3) TIME LINE

//SCHEMA 4) FACEBOOK
