import organizations from '../data/duckData.js';

// Get all ducks
const getAllOrganizations = (req, res) => {
    res.status(200).json({ organizations });
};

// Get a random duck
const getRandomDuck = (req, res) => {
    const randomIndex = Math.floor(Math.random() * organizations.length);
    res.status(200).json(organizations[randomIndex]);
};

// Get a single duck
const getSingleDuck = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const duck = organizations.find(d => d.id === id);

    if (!duck) {
        return res.status(404).json({ mssg: "Duck not found" });
    }
    res.status(200).json({ organizations });
};

// Create a new duck
const createDuck = (req, res) => {
    const { name, color, imageUrl } = req.body;
    const newDuck = {
        id: organizations.length ? organizations[organizations.length - 1].id + 1 : 1,
        name,
        color,
        imageUrl
    };
    organizations.push(newDuck);
    res.status(201).json({ duck: newDuck });
};

// Delete a duck
const deleteDuck = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const duckIndex = organizations.findIndex(d => d.id === id);

    if (duckIndex === -1) {
        return res.status(404).json({ mssg: "Duck not found" });
    }

    const [deletedDuck] = organizations.splice(duckIndex, 1);
    res.status(200).json({ duck: deletedDuck });
};

// Update a duck
const updateDuck = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const duckIndex = organizations.findIndex(d => d.id === id);

    if (duckIndex === -1) {
        return res.status(404).json({ mssg: "Duck not found" });
    }

    const updatedDuck = { ...organizations[duckIndex], ...req.body };
    organizations[duckIndex] = updatedDuck;
    res.status(200).json({ duck: updatedDuck });
};

const getTheOrganizations = (req, res) => {
    console.log('Request received at /recommendation:', req.body);
    const { recommendations } = req.body;

    // Filter organizations based on the recommendations ids sent by the client
    const recommendedOrganizations = organizations.filter((org) =>
        recommendations.includes(org.id)
    );

    // Return the filtered organizations to the client
    res.json({ message: "Organizations fetched successfully", organizations: recommendedOrganizations });
};


export {
    getAllOrganizations,
    getRandomDuck,
    getSingleDuck,
    createDuck,
    deleteDuck,
    updateDuck,
    getTheOrganizations
};
