const users = [
    {
        name: "Alex"
    },
    {
        name: "Obaid"
    }
]

const getAllCustomers = (req, res) => {
    res.status(200).json(users);
}


const createCustomer = (req, res) => {
    newUser = { name: "ABC"};
    users.push(newUser);

    res.status(200).json(users);
}

module.exports = {
    getAllCustomers, 
    createCustomer
}