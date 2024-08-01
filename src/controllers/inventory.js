const inventories = [
    {
        name: "Alex"
    },
    {
        name: "Obaid"
    }
]

const getAllInventories = (req, res) => {
    res.status(200).json(inventories);
}


const createInventory = (req, res) => {
    newUser = { name: "ABC"};
    inventories.push(newUser);

    res.status(200).json(inventories);
}

module.exports = {
    getAllInventories, 
    createInventory
}